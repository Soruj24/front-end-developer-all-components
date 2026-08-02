export { MongoCacheStore } from "./cache";
export { MongoMemoryStore } from "./memory";
export { MongoUsageTracker } from "./usage";

export function isMongoAvailable(): boolean {
  return Boolean(process.env.MONGODB_URI);
}
