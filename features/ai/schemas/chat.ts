import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["system", "user", "assistant", "tool"]),
  content: z.string(),
  name: z.string().optional(),
  toolCallId: z.string().optional(),
  createdAt: z.number().optional(),
});

export const chatRequestSchema = z.object({
  conversationId: z.string().min(1).max(128).optional(),
  messages: z.array(chatMessageSchema).min(1).max(200),
  systemPrompt: z.string().max(8000).optional(),
  modelId: z.string().min(1).max(128).optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().min(1).max(32768).optional(),
  tools: z.array(z.string().min(1).max(128)).max(64).optional(),
  stream: z.boolean().optional(),
});
