import mongoose from "mongoose";
import { optionalEnv } from "@/lib/env";

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose | null> | null;
}

declare global {
  var __authMongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = globalThis.__authMongooseCache ?? { conn: null, promise: null };
if (!globalThis.__authMongooseCache) globalThis.__authMongooseCache = cache;

/** Connects to MongoDB, reusing the cached connection across HMR reloads. */
export async function connectAuthDb(): Promise<mongoose.Mongoose | null> {
  const uri = optionalEnv("MONGODB_URI");
  if (!uri) return null;
  
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
      .catch(() => null);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}