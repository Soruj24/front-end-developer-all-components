import type { ProviderName } from "./provider";

export interface UsageRecord {
  model: string;
  provider: ProviderName;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latencyMs: number;
  cacheHit: boolean;
  costUsd?: number;
  cachedAt?: number;
}
