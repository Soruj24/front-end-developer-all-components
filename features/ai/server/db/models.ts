import mongoose, { Schema, type Model, type SchemaDefinitionProperty } from "mongoose";
import type { AiMessage, UsageRecord } from "../../types";

export interface ConversationDoc {
  _id: string;
  title: string;
  messages: AiMessage[];
  createdAt: number;
  updatedAt: number;
  metadata?: Record<string, unknown>;
}

export interface UsageDoc extends UsageRecord {
  createdAt: number;
}

export interface CacheEntryDoc {
  _id: string;
  value: string;
  expiresAt: number;
}

const messagesField: SchemaDefinitionProperty<AiMessage[]> = {
  type: Schema.Types.Mixed,
  required: true,
  default: [],
};

const conversationSchema = new Schema<ConversationDoc>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  messages: messagesField,
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
  metadata: { type: Schema.Types.Mixed },
});

const usageSchema = new Schema<UsageDoc>({
  model: { type: String, required: true, index: true },
  provider: { type: String, required: true },
  promptTokens: { type: Number, required: true },
  completionTokens: { type: Number, required: true },
  totalTokens: { type: Number, required: true },
  latencyMs: { type: Number, required: true },
  cacheHit: { type: Boolean, required: true },
  costUsd: { type: Number },
  cachedAt: { type: Number },
  createdAt: { type: Number, required: true, index: true },
});

const cacheSchema = new Schema<CacheEntryDoc>({
  _id: { type: String, required: true },
  value: { type: String, required: true },
  expiresAt: { type: Number, required: true },
});

function typedModel<T>(name: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[name] ?? mongoose.model<T>(name, schema)) as Model<T>;
}

export const ConversationModel = typedModel<ConversationDoc>("AiConversation", conversationSchema);
export const UsageModel = typedModel<UsageDoc>("AiUsage", usageSchema);
export const CacheEntryModel = typedModel<CacheEntryDoc>("AiCacheEntry", cacheSchema);
