import type { Conversation } from "../../types";

export interface MemoryStore {
  get(conversationId: string): Promise<Conversation | undefined>;
  save(conversation: Conversation): Promise<void>;
  list(limit?: number): Promise<Conversation[]>;
  delete(conversationId: string): Promise<void>;
  clear(): Promise<void>;
}

export class InMemoryMemoryStore implements MemoryStore {
  private conversations = new Map<string, Conversation>();

  async get(conversationId: string): Promise<Conversation | undefined> {
    return this.conversations.get(conversationId);
  }

  async save(conversation: Conversation): Promise<void> {
    this.conversations.set(conversation.id, conversation);
  }

  async list(limit = 50): Promise<Conversation[]> {
    return [...this.conversations.values()]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }

  async delete(conversationId: string): Promise<void> {
    this.conversations.delete(conversationId);
  }

  async clear(): Promise<void> {
    this.conversations.clear();
  }

  get size(): number {
    return this.conversations.size;
  }
}
