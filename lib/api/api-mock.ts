import { ApiError } from "./api-errors";
import type { ApiAdapter, PageQuery, PageResult } from "./api-types";

export interface MockStoreOptions<T> {
  resource: string;
  seed: T[];
  getId: (item: T) => string;
  /** Case-insensitive search across these fields. Defaults to all string fields. */
  searchFields?: (keyof T)[];
  latencyMs?: number;
  /** Fail the next N calls with `error` (deterministic error demos). */
  failNext?: { count: number; error: ApiError };
  /** Return zero items for the next N list calls (empty-state demos). */
  emptyNext?: number;
}

/** Resolves after `ms`, rejecting early when `signal` aborts. */
export function withLatency(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(new ApiError("aborted", "Request was cancelled."));
  }
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new ApiError("aborted", "Request was cancelled."));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    if (signal?.aborted) onAbort();
  });
}

/**
 * In-memory mock adapter with filtering, search, sorting, pagination and
 * CRUD. Deterministic: same seed + same query = same result. UI components
 * consume it through the same `ApiAdapter` interface as the real client.
 */
export function createMockStore<T>(
  options: MockStoreOptions<T>,
): ApiAdapter<T> & { reset: () => void } {
  const { resource, getId, searchFields, latencyMs = 350 } = options;
  let rows = [...options.seed];
  const failState = { count: options.failNext?.count ?? 0, error: options.failNext?.error };
  let emptyCount = options.emptyNext ?? 0;

  async function guard(signal?: AbortSignal): Promise<boolean> {
    if (failState.count > 0 && failState.error) {
      failState.count -= 1;
      await withLatency(Math.min(latencyMs, 120), signal);
      throw failState.error;
    }
    await withLatency(latencyMs, signal);
    if (emptyCount > 0) {
      emptyCount -= 1;
      return true;
    }
    return false;
  }

  function applyQuery(source: T[], query?: PageQuery): T[] {
    const record = (row: T): Record<string, unknown> => row as Record<string, unknown>;
    let result = [...source];
    const search = query?.search?.toString().trim().toLowerCase();
    if (search) {
      const fields = searchFields ?? (Object.keys(source[0] ?? {}) as (keyof T)[]);
      result = result.filter((row) =>
        fields.some((field) => String(record(row)[field as string] ?? "").toLowerCase().includes(search)),
      );
    }
    const extra = Object.entries(query ?? {}).filter(
      ([key, value]) =>
        !["page", "pageSize", "search", "sortKey", "sortDir"].includes(key) &&
        value !== undefined &&
        value !== "",
    );
    for (const [key, value] of extra) {
      result = result.filter((row) => String(record(row)[key]) === String(value));
    }
    const sortKey = query?.sortKey?.toString();
    if (sortKey) {
      const dir = query?.sortDir === "desc" ? -1 : 1;
      result.sort(
        (a, b) =>
          String(record(a)[sortKey]).localeCompare(String(record(b)[sortKey]), undefined, { numeric: true }) * dir,
      );
    }
    return result;
  }

  return {
    mode: "mock",
    resource,
    async list(query, signal) {
      const empty = await guard(signal);
      const filtered = empty ? [] : applyQuery(rows, query);
      const pageSize = Number(query?.pageSize ?? (filtered.length || 10));
      const page = Math.max(1, Number(query?.page ?? 1));
      const items = query?.pageSize ? filtered.slice((page - 1) * pageSize, page * pageSize) : filtered;
      return { items, total: filtered.length, page, pageSize } satisfies PageResult<T>;
    },
    async getById(id, signal) {
      await guard(signal);
      return rows.find((row) => getId(row) === id) ?? null;
    },
    async create(data, signal) {
      await guard(signal);
      const item = { ...data, id: `mock_${Date.now()}` } as unknown as T;
      rows = [item, ...rows];
      return item;
    },
    async update(id, data, signal) {
      await guard(signal);
      const index = rows.findIndex((row) => getId(row) === id);
      if (index === -1) throw new ApiError("http", `${resource} "${id}" not found.`, 404);
      rows[index] = { ...rows[index], ...data };
      return rows[index];
    },
    async remove(id, signal) {
      await guard(signal);
      rows = rows.filter((row) => getId(row) !== id);
    },
    reset() {
      rows = [...options.seed];
    },
  };
}
