import { connectDb } from "@/features/registry/server/connect";
import type { UsageRecord } from "../../types";
import type { UsageTracker, UsageTotals } from "../analytics";
import { UsageModel, type UsageDoc } from "./models";

export class MongoUsageTracker implements UsageTracker {
  async record(usage: UsageRecord): Promise<void> {
    await connectDb();
    await UsageModel.create({ ...usage, createdAt: Date.now() });
  }

  async list(limit = 100): Promise<UsageRecord[]> {
    await connectDb();
    const docs = await UsageModel.find().sort({ createdAt: -1 }).limit(limit).lean();
    return (docs as unknown as UsageDoc[]).map(toUsage);
  }

  async totals(): Promise<UsageTotals> {
    await connectDb();
    const rows = await UsageModel.aggregate([
      {
        $group: {
          _id: null,
          calls: { $sum: 1 },
          promptTokens: { $sum: "$promptTokens" },
          completionTokens: { $sum: "$completionTokens" },
          totalTokens: { $sum: "$totalTokens" },
          costUsd: { $sum: { $ifNull: ["$costUsd", 0] } },
        },
      },
    ]);
    const row = rows[0] as UsageTotals | undefined;
    return (
      row ?? { calls: 0, promptTokens: 0, completionTokens: 0, totalTokens: 0, costUsd: 0 }
    );
  }
}

function toUsage(doc: UsageDoc): UsageRecord {
  return {
    model: doc.model,
    provider: doc.provider,
    promptTokens: doc.promptTokens,
    completionTokens: doc.completionTokens,
    totalTokens: doc.totalTokens,
    latencyMs: doc.latencyMs,
    cacheHit: doc.cacheHit,
    costUsd: doc.costUsd,
    cachedAt: doc.cachedAt,
  };
}
