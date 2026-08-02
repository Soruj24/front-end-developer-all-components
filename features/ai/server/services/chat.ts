import type { AiMessage, ChatEvent, ChatRequest, ChatResponse } from "../../types";
import { DEFAULT_MODEL_ID, FALLBACK_MODEL_IDS, CACHE_TTL_MS } from "../../constants";
import { uid } from "../../utils";
import type { CacheStore } from "../cache";
import { InMemoryCache, cacheKey } from "../cache";
import type { MemoryStore } from "../memory";
import { InMemoryMemoryStore } from "../memory";
import type { ModelRegistry } from "../providers";
import { ModelRegistry as DefaultModelRegistry } from "../providers";
import type { PromptRegistry } from "../prompts";
import { createDefaultPromptRegistry } from "../prompts";
import type { Retriever } from "../rag";
import type { ToolRegistry } from "../tools";
import type { UsageTracker } from "../analytics";
import { InMemoryUsageTracker, buildUsage } from "../analytics";
import { AiError } from "../errors";
import { createMcpAgentToolRegistry } from "../mcp";
import { MongoCacheStore, MongoMemoryStore, MongoUsageTracker, isMongoAvailable } from "../db";
import { runWithFallback, streamWithFallback, type UsageTokens } from "./runner";
import {
  buildLlmMessages,
  buildSystemPrompt,
  getConversation,
  normalizeMessages,
  persist,
  resolveTools,
} from "./context";

export interface ChatServiceDeps {
  modelRegistry: ModelRegistry;
  prompts: PromptRegistry;
  memory: MemoryStore;
  usage: UsageTracker;
  cache?: CacheStore;
  tools?: ToolRegistry;
  retriever?: Retriever;
  fallbackModelIds?: string[];
}

export class ChatService {
  constructor(private deps: ChatServiceDeps) {}

  async invoke(request: ChatRequest): Promise<ChatResponse> {
    const started = Date.now();
    const messages = normalizeMessages(request.messages);
    const modelId = request.modelId ?? DEFAULT_MODEL_ID;
    const config = this.deps.modelRegistry.resolve(modelId).config;
    const conversation = await getConversation(this.deps.memory, request.conversationId, messages[0]);
    const systemPrompt = await buildSystemPrompt(this.deps.prompts, this.deps.retriever, request, messages);
    const llmMessages = buildLlmMessages(systemPrompt, conversation, messages);
    const toolDefs = resolveTools(this.deps.tools, request.tools);
    const cache = this.deps.cache;

    const cacheable = Boolean(cache && (!toolDefs || toolDefs.length === 0));
    const key = cacheKey("chat", modelId, JSON.stringify(llmMessages), String(request.temperature ?? 0.7));

    if (cacheable) {
      const hit = await cache!.get(key);
      if (hit) {
        const parsed = JSON.parse(hit) as Omit<ChatResponse, "usage"> & { usage: { latencyMs: number } };
        const usage = buildUsage({
          model: config.model,
          provider: config.provider,
          promptText: "",
          completionText: parsed.message.content,
          latencyMs: Date.now() - started,
          cacheHit: true,
        });
        await this.deps.usage.record(usage);
        return { ...parsed, cached: true, usage };
      }
    }

    const options = { temperature: request.temperature, maxTokens: request.maxTokens };
    const { value, usedModel } = await runWithFallback(
      this.deps.modelRegistry,
      modelId,
      this.deps.fallbackModelIds ?? [],
      llmMessages,
      toolDefs,
      options
    );

    const assistantMessage: AiMessage = {
      id: uid("msg"),
      role: "assistant",
      content: value.text,
      createdAt: Date.now(),
    };
    const nextConversation = persist(conversation, messages, assistantMessage);
    await this.deps.memory.save(nextConversation);

    const usedConfig = this.deps.modelRegistry.resolve(usedModel).config;
    const usage = buildUsage({
      model: usedConfig.model,
      provider: usedConfig.provider,
      promptText: JSON.stringify(llmMessages),
      completionText: value.text,
      latencyMs: Date.now() - started,
      cacheHit: false,
      promptTokens: value.promptTokens,
      completionTokens: value.completionTokens,
      costPer1kIn: usedConfig.costPer1kIn,
      costPer1kOut: usedConfig.costPer1kOut,
    });
    await this.deps.usage.record(usage);

    const response: ChatResponse = {
      message: assistantMessage,
      conversationId: nextConversation.id,
      usage,
      cached: false,
    };
    if (cacheable) {
      await cache!.set(key, JSON.stringify(response), CACHE_TTL_MS);
    }
    return response;
  }

  async *stream(request: ChatRequest): AsyncGenerator<ChatEvent> {
    const started = Date.now();
    const messages = normalizeMessages(request.messages);
    const modelId = request.modelId ?? DEFAULT_MODEL_ID;
    const config = this.deps.modelRegistry.resolve(modelId).config;
    const conversation = await getConversation(this.deps.memory, request.conversationId, messages[0]);
    const systemPrompt = await buildSystemPrompt(this.deps.prompts, this.deps.retriever, request, messages);
    const llmMessages = buildLlmMessages(systemPrompt, conversation, messages);
    const toolDefs = resolveTools(this.deps.tools, request.tools);
    const messageId = uid("msg");
    const options = { temperature: request.temperature, maxTokens: request.maxTokens };

    yield { type: "start", conversationId: conversation.id, messageId, model: config.model };

    try {
      let finalUsage: UsageTokens = {};
      let text = "";
      for await (const step of streamWithFallback(
        this.deps.modelRegistry,
        modelId,
        this.deps.fallbackModelIds ?? [],
        llmMessages,
        toolDefs,
        options
      )) {
        if (step.kind === "delta") {
          text = step.text;
          yield { type: "delta", messageId, delta: step.delta };
        } else {
          finalUsage = step.usage;
        }
      }

      const assistantMessage: AiMessage = {
        id: messageId,
        role: "assistant",
        content: text,
        createdAt: Date.now(),
      };
      const nextConversation = persist(conversation, messages, assistantMessage);
      await this.deps.memory.save(nextConversation);

      const usage = buildUsage({
        model: config.model,
        provider: config.provider,
        promptText: JSON.stringify(llmMessages),
        completionText: text,
        latencyMs: Date.now() - started,
        cacheHit: false,
        promptTokens: finalUsage.promptTokens,
        completionTokens: finalUsage.completionTokens,
        costPer1kIn: config.costPer1kIn,
        costPer1kOut: config.costPer1kOut,
      });
      await this.deps.usage.record(usage);
      yield { type: "done", messageId, usage, cached: false };
    } catch (error) {
      const classified = error instanceof AiError ? error : toAiError(error);
      yield { type: "error", messageId, code: classified.code, message: classified.message };
    }
  }
}

function toAiError(error: unknown): AiError {
  return error instanceof Error ? new AiError("unknown", error.message) : new AiError("unknown", String(error));
}

export function createChatService(deps?: Partial<ChatServiceDeps>): ChatService {
  const mongo = isMongoAvailable();
  return new ChatService({
    modelRegistry: deps?.modelRegistry ?? new DefaultModelRegistry(),
    prompts: deps?.prompts ?? createDefaultPromptRegistry(),
    memory: deps?.memory ?? (mongo ? new MongoMemoryStore() : new InMemoryMemoryStore()),
    usage: deps?.usage ?? (mongo ? new MongoUsageTracker() : new InMemoryUsageTracker()),
    cache: deps?.cache ?? (mongo ? new MongoCacheStore() : new InMemoryCache()),
    tools: deps?.tools ?? createMcpAgentToolRegistry(),
    retriever: deps?.retriever,
    fallbackModelIds: deps?.fallbackModelIds ?? FALLBACK_MODEL_IDS,
  });
}

