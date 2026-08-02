import { connectDb } from "@/features/registry/server/connect";
import type { CacheStore } from "../cache";
import { CacheEntryModel, type CacheEntryDoc } from "./models";

export class MongoCacheStore implements CacheStore {
  async get(key: string): Promise<string | undefined> {
    await connectDb();
    const doc = await CacheEntryModel.findById(key).lean<CacheEntryDoc>();
    if (!doc) return undefined;
    if (doc.expiresAt > 0 && Date.now() > doc.expiresAt) {
      await CacheEntryModel.findByIdAndDelete(key);
      return undefined;
    }
    return doc.value;
  }

  async set(key: string, value: string, ttlMs?: number): Promise<void> {
    await connectDb();
    await CacheEntryModel.findByIdAndUpdate(
      key,
      {
        $set: {
          value,
          expiresAt: ttlMs === undefined ? 0 : Date.now() + ttlMs,
        },
      },
      { upsert: true }
    );
  }

  async delete(key: string): Promise<void> {
    await connectDb();
    await CacheEntryModel.findByIdAndDelete(key);
  }

  async clear(): Promise<void> {
    await connectDb();
    await CacheEntryModel.deleteMany({});
  }
}
