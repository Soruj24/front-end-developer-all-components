import type { UsageRecord } from "../../types";

export interface UsageTotals {
  calls: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
}

export interface UsageTracker {
  record(usage: UsageRecord): Promise<void>;
  list(limit?: number): Promise<UsageRecord[]>;
  totals(): Promise<UsageTotals>;
}

export class InMemoryUsageTracker implements UsageTracker {
  private records: UsageRecord[] = [];

  async record(usage: UsageRecord): Promise<void> {
    this.records.push(usage);
  }

  async list(limit = 100): Promise<UsageRecord[]> {
    return [...this.records].slice(-limit).reverse();
  }

  async totals(): Promise<UsageTotals> {
    return this.records.reduce<UsageTotals>(
      (acc, usage) => ({
        calls: acc.calls + 1,
        promptTokens: acc.promptTokens + usage.promptTokens,
        completionTokens: acc.completionTokens + usage.completionTokens,
        totalTokens: acc.totalTokens + usage.totalTokens,
        costUsd: acc.costUsd + (usage.costUsd ?? 0),
      }),
      { calls: 0, promptTokens: 0, completionTokens: 0, totalTokens: 0, costUsd: 0 }
    );
  }

  get size(): number {
    return this.records.length;
  }
}
