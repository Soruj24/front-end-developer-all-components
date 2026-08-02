import type { UsageRecord } from "./usage";

export type AiRole = "system" | "user" | "assistant" | "tool";

export interface AiMessage {
  id: string;
  role: AiRole;
  content: string;
  name?: string;
  toolCallId?: string;
  createdAt: number;
}

export interface ChatInputMessage {
  id?: string;
  role: AiRole;
  content: string;
  name?: string;
  createdAt?: number;
}

export interface ChatRequest {
  conversationId?: string;
  messages: ChatInputMessage[];
  systemPrompt?: string;
  modelId?: string;
  temperature?: number;
  maxTokens?: number;
  tools?: string[];
  stream?: boolean;
}

export interface ChatResponse {
  message: AiMessage;
  conversationId: string;
  usage: UsageRecord;
  cached: boolean;
}

export type ChatEvent =
  | { type: "start"; conversationId: string; messageId: string; model: string }
  | { type: "delta"; messageId: string; delta: string }
  | { type: "tool"; messageId: string; name: string; args: string; result: string }
  | { type: "done"; messageId: string; usage: UsageRecord; cached: boolean }
  | { type: "error"; messageId: string; code: string; message: string };
