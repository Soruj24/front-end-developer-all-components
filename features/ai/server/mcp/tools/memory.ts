import { z } from "zod";
import { MongoMemoryStore, MongoUsageTracker } from "../../db";
import { tool, type McpToolSpec } from "../types";

export function memoryTools(): McpToolSpec[] {
  return [
    tool(
      "memory.conversations",
      "List recent AI conversations with their titles and message counts.",
      z.object({
        limit: z.number().int().min(1).max(100).default(20),
      }),
      async ({ limit }) => {
        const store = new MongoMemoryStore();
        const conversations = await store.list(limit);
        return {
          count: conversations.length,
          conversations: conversations.map((c) => ({
            id: c.id,
            title: c.title,
            messages: c.messages.length,
            updatedAt: c.updatedAt,
          })),
        };
      }
    ),
    tool(
      "memory.get_conversation",
      "Read a conversation by id, returning its messages.",
      z.object({ id: z.string().min(1) }),
      async ({ id }) => {
        const store = new MongoMemoryStore();
        const conversation = await store.get(id);
        if (!conversation) throw new Error(`Conversation not found: ${id}`);
        return {
          id: conversation.id,
          title: conversation.title,
          messages: conversation.messages,
        };
      }
    ),
    tool(
      "usage.totals",
      "Return aggregate token usage and cost across all AI calls.",
      z.object({}),
      async () => {
        const tracker = new MongoUsageTracker();
        return tracker.totals();
      }
    ),
    tool(
      "usage.recent",
      "Return the most recent AI usage records.",
      z.object({
        limit: z.number().int().min(1).max(100).default(20),
      }),
      async ({ limit }) => {
        const tracker = new MongoUsageTracker();
        const records = await tracker.list(limit);
        return { count: records.length, records };
      }
    ),
  ];
}
