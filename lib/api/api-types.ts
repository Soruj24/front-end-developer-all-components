/** Shared API integration contracts: mock-first, real-capable. */

export type ApiMode = "mock" | "real";

export interface ApiConfig {
  mode: ApiMode;
  /** Base URL for real mode, e.g. "https://api.example.com/v1". */
  baseUrl?: string;
  headers?: Record<string, string>;
  /** Request timeout in ms. Defaults to 10_000. */
  timeoutMs?: number;
  /** Simulated latency in ms for mock mode. Defaults to 350. */
  mockLatencyMs?: number;
}

export interface PageQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export interface PageResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Data-source contract for one resource. `list` covers filtering, sorting
 * and pagination; CRUD members are optional because not every endpoint
 * supports them (e.g. read-only feeds).
 */
export interface ApiAdapter<T> {
  readonly mode: ApiMode;
  readonly resource: string;
  list: (query?: PageQuery, signal?: AbortSignal) => Promise<PageResult<T>>;
  getById?: (id: string, signal?: AbortSignal) => Promise<T | null>;
  create?: (data: Partial<T>, signal?: AbortSignal) => Promise<T>;
  update?: (id: string, data: Partial<T>, signal?: AbortSignal) => Promise<T>;
  remove?: (id: string, signal?: AbortSignal) => Promise<void>;
}

export type ApiStatus = "idle" | "loading" | "success" | "empty" | "error";
