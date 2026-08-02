import { estimateTokens } from "../../utils";
import type { ProviderName, UsageRecord } from "../../types";

export interface UsageInput {
  model: string;
  provider: ProviderName;
  promptText: string;
  completionText: string;
  latencyMs: number;
  cacheHit: boolean;
  promptTokens?: number;
  completionTokens?: number;
  costPer1kIn?: number;
  costPer1kOut?: number;
}

export function buildUsage(input: UsageInput): UsageRecord {
  const promptTokens = input.promptTokens ?? estimateTokens(input.promptText);
  const completionTokens = input.completionTokens ?? estimateTokens(input.completionText);
  const totalTokens = promptTokens + completionTokens;

  const costUsd =
    input.costPer1kIn !== undefined && input.costPer1kOut !== undefined
      ? (promptTokens / 1000) * input.costPer1kIn +
        (completionTokens / 1000) * input.costPer1kOut
      : undefined;

  return {
    model: input.model,
    provider: input.provider,
    promptTokens,
    completionTokens,
    totalTokens,
    latencyMs: input.latencyMs,
    cacheHit: input.cacheHit,
    costUsd,
  };
}
