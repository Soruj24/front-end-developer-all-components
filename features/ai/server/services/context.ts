import type { BaseMessageLike } from "@langchain/core/messages";
import type {
  AiMessage,
  AiToolDefinition,
  ChatInputMessage,
  ChatRequest,
  Conversation,
} from "../../types";
import { uid } from "../../utils";
import type { MemoryStore } from "../memory";
import { appendMessage, createConversation, toLlmMessages, trimHistory } from "../memory";
import type { PromptRegistry } from "../prompts";
import type { Retriever } from "../rag";
import type { ToolRegistry } from "../tools";

export function normalizeMessages(messages: ChatInputMessage[]): AiMessage[] {
  const now = Date.now();
  return messages.map((message) => ({
    id: message.id ?? uid("msg"),
    role: message.role,
    content: message.content,
    name: message.name,
    createdAt: message.createdAt ?? now,
  }));
}

export function buildLlmMessages(
  systemPrompt: string,
  conversation: Conversation,
  messages: AiMessage[]
): BaseMessageLike[] {
  const history = toLlmMessages(trimHistory(conversation.messages));
  return [
    { role: "system", content: systemPrompt },
    ...history,
    ...toLlmMessages(messages),
  ] as BaseMessageLike[];
}

export async function buildSystemPrompt(
  prompts: PromptRegistry,
  retriever: Retriever | undefined,
  request: ChatRequest,
  messages: AiMessage[]
): Promise<string> {
  if (request.systemPrompt) return request.systemPrompt;
  if (retriever) {
    const lastUser = [...messages].reverse().find((message) => message.role === "user");
    if (lastUser) {
      const hits = await retriever.retrieve(lastUser.content);
      if (hits.length > 0) {
        const context = hits.map((hit) => hit.document.content).join("\n\n---\n\n");
        return prompts.render("system.rag", { context });
      }
    }
  }
  return prompts.render("system.default", {});
}

export async function getConversation(
  memory: MemoryStore,
  conversationId: string | undefined,
  first?: AiMessage
): Promise<Conversation> {
  if (conversationId) {
    const existing = await memory.get(conversationId);
    if (existing) return existing;
  }
  return createConversation(conversationId ?? uid("conv"), first);
}

export function resolveTools(
  tools: ToolRegistry | undefined,
  names: string[] | undefined
): AiToolDefinition[] | undefined {
  if (!names || names.length === 0 || !tools) return undefined;
  return names
    .map((name) => tools.get(name))
    .filter((tool): tool is AiToolDefinition => Boolean(tool));
}

export function persist(
  conversation: Conversation,
  userMessages: AiMessage[],
  assistant: AiMessage
): Conversation {
  let next = conversation;
  for (const message of userMessages) next = appendMessage(next, message);
  return appendMessage(next, assistant);
}
