import mongoose from "mongoose";
import { requireEnv } from "@/lib/env";

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = globalThis.__mongooseCache ?? { conn: null, promise: null };
if (!globalThis.__mongooseCache) globalThis.__mongooseCache = cache;

/** Connects to MongoDB once and reuses the connection across HMR reloads. */
export async function connectDb(): Promise<mongoose.Mongoose> {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    const uri = requireEnv(
      "MONGODB_URI",
      "mongodb://127.0.0.1:27017/component-library"
    );
    cache.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 5000 })
      .then(async (m) => {
        // Lazy, idempotent bootstrapping of seed content.
        const { seedDatabase } = await import("./seed");
        try {
          await seedDatabase();
        } catch (error) {
          console.error("[db] seed failed:", error);
        }
        return m;
      });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
