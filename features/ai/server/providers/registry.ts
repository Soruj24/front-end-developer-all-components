import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions, ProviderName } from "../../types";
import { AiError } from "../errors";
import type { ProviderAdapter } from "./adapter";
import { createAnthropicAdapter } from "./anthropic";
import { createCohereAdapter } from "./cohere";
import { createDeepSeekAdapter } from "./deepseek";
import { createGeminiAdapter } from "./gemini";
import { createGrokAdapter } from "./grok";
import { createGroqAdapter } from "./groq";
import { createMistralAdapter } from "./mistral";
import { createOllamaAdapter } from "./ollama";
import { createOpenAiAdapter } from "./openai";
import { createOpenRouterAdapter } from "./openrouter";

/** Central registry of provider adapters. Adding a provider = register an adapter. */
export class ProviderRegistry {
  private adapters = new Map<ProviderName, ProviderAdapter>();
  private defaultId: ProviderName | undefined;

  register(adapter: ProviderAdapter): this {
    this.adapters.set(adapter.id, adapter);
    if (!this.defaultId) this.defaultId = adapter.id;
    return this;
  }

  registerMany(adapters: ProviderAdapter[]): this {
    for (const adapter of adapters) this.register(adapter);
    return this;
  }

  unregister(id: ProviderName): boolean {
    return this.adapters.delete(id);
  }

  get(id: ProviderName): ProviderAdapter | undefined {
    return this.adapters.get(id);
  }

  has(id: ProviderName): boolean {
    return this.adapters.has(id);
  }

  list(): ProviderAdapter[] {
    return [...this.adapters.values()];
  }

  listConfigured(): ProviderAdapter[] {
    return this.list().filter((adapter) => adapter.isConfigured());
  }

  setDefault(id: ProviderName): void {
    if (!this.adapters.has(id)) throw new AiError("invalid_request", `Unknown provider: ${id}`);
    this.defaultId = id;
  }

  getDefault(): ProviderName | undefined {
    return this.defaultId;
  }

  /** Build a chat model for a model id, delegating to the owning adapter. */
  build(config: ModelConfig, options: ModelRequestOptions = {}): BaseChatModel {
    const adapter = this.adapters.get(config.provider);
    if (!adapter) {
      throw new AiError("provider_unavailable", `Unsupported provider: ${config.provider}`);
    }
    if (!adapter.isConfigured() && !options.apiKey) {
      throw new AiError(
        "provider_unavailable",
        `Provider "${adapter.label}" is not configured (missing API key).`
      );
    }
    return adapter.createModel(config, options);
  }
}

export function createDefaultProviderRegistry(): ProviderRegistry {
  return new ProviderRegistry().registerMany([
    createOpenAiAdapter(),
    createAnthropicAdapter(),
    createGeminiAdapter(),
    createGrokAdapter(),
    createDeepSeekAdapter(),
    createOpenRouterAdapter(),
    createOllamaAdapter(),
    createMistralAdapter(),
    createCohereAdapter(),
    createGroqAdapter(),
  ]);
}
