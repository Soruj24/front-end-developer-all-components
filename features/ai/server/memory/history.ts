import type { AiMessage, AiRole, Conversation } from "../../types";
import { HISTORY_LIMIT } from "../../constants";

export type LlmMessage = {
  role: AiRole;
  content: string;
  name?: string;
};

export function createConversation(id: string, firstMessage?: AiMessage): Conversation {
  const now = Date.now();
  return {
    id,
    title: firstMessage ? titleFromMessage(firstMessage.content) : "New conversation",
    messages: firstMessage ? [firstMessage] : [],
    createdAt: now,
    updatedAt: now,
  };
}

export function titleFromMessage(content: string): string {
  const plain = content.replace(/[#*`_>\-]/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > 48 ? `${plain.slice(0, 48)}…` : plain;
}

export function trimHistory(messages: AiMessage[], limit = HISTORY_LIMIT): AiMessage[] {
  if (messages.length <= limit) return messages;
  return messages.slice(messages.length - limit);
}

export function toLlmMessages(messages: AiMessage[]): LlmMessage[] {
  return messages.map(({ role, content, name }) => ({ role, content, name }));
}

export function appendMessage(conversation: Conversation, message: AiMessage): Conversation {
  return {
    ...conversation,
    messages: trimHistory([...conversation.messages, message]),
    updatedAt: Date.now(),
  };
}
