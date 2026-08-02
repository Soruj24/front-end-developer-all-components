export interface CacheStore {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string, ttlMs?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

interface CacheEntry {
  value: string;
  expiresAt: number;
}

export class InMemoryCache implements CacheStore {
  private entries = new Map<string, CacheEntry>();

  async get(key: string): Promise<string | undefined> {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt > 0 && Date.now() > entry.expiresAt) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlMs?: number): Promise<void> {
    this.entries.set(key, {
      value,
      expiresAt: ttlMs === undefined ? 0 : Date.now() + ttlMs,
    });
  }

  async delete(key: string): Promise<void> {
    this.entries.delete(key);
  }

  async clear(): Promise<void> {
    this.entries.clear();
  }

  get size(): number {
    return this.entries.size;
  }
}

export function cacheKey(...parts: string[]): string {
  return parts.join("::");
}
