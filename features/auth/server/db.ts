import mongoose from "mongoose";
import { requireEnv } from "@/lib/env";

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  var __authMongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = globalThis.__authMongooseCache ?? { conn: null, promise: null };
if (!globalThis.__authMongooseCache) globalThis.__authMongooseCache = cache;

/** Connects to MongoDB, reusing the cached connection across HMR reloads. */
export async function connectAuthDb(): Promise<mongoose.Mongoose> {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    const uri = requireEnv(
      "MONGODB_URI",
      "mongodb://127.0.0.1:27017/component-library"
    );
    cache.promise = mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}