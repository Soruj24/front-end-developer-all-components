import type { AiMessage } from "./chat";

export interface Conversation {
  id: string;
  title: string;
  messages: AiMessage[];
  createdAt: number;
  updatedAt: number;
  metadata?: Record<string, unknown>;
}
