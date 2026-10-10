import { ApiError, normalizeError } from "./api-errors";
import type { PageQuery } from "./api-types";

export const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * fetch() with a timeout that respects an outer AbortSignal.
 * Aborts from the caller (e.g. mode switches) win over the timeout.
 */
export async function fetchJson<T>(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    timeoutMs?: number;
    signal?: AbortSignal;
  } = {},
): Promise<{ data: T; status: number }> {
  const { method = "GET", headers, body, timeoutMs = DEFAULT_TIMEOUT_MS, signal } = options;
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);
  const timer = setTimeout(() => controller.abort(new Error("timeout")), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      headers: { Accept: "application/json", ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await res.text();
    const data = text ? (JSON.parse(text) as T) : (null as T);
    if (!res.ok) {
      throw new ApiError("http", `Request failed with status ${res.status}.`, res.status, {
        url: redactUrl(url),
      });
    }
    return { data, status: res.status };
  } catch (error) {
    if (signal?.aborted) {
      throw new ApiError("aborted", "Request was cancelled.");
    }
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("timeout", `Request timed out after ${timeoutMs}ms.`);
    }
    if (error instanceof SyntaxError) {
      throw new ApiError("invalid-response", "The server returned invalid JSON.");
    }
    throw normalizeError(error, redactUrl(url));
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/** Builds `base + path + query`, skipping undefined/empty params. */
export function buildUrl(baseUrl: string, path: string, query?: PageQuery): string {
  const base = baseUrl.replace(/\/+$/, "");
  const url = new URL(`${base}${path.startsWith("/") ? path : `/${path}`}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined || value === "") continue;
    url.searchParams.set(key, String(value));
  }
  return url.toString();
}

/**
 * Authorization header helper. Pass tokens obtained at runtime (login flow,
 * OAuth callback) — never bake secrets into client bundles. For private keys,
 * call your own server route (see `app/api/proxy/route.ts`) instead.
 */
export function authHeaders(token?: string, scheme = "Bearer"): Record<string, string> {
  if (!token) return {};
  return { Authorization: `${scheme} ${token}` };
}

/** Strips query strings (which may carry tokens) for logs and error details. */
export function redactUrl(url: string): string {
  const queryIndex = url.indexOf("?");
  return queryIndex === -1 ? url : `${url.slice(0, queryIndex)}?…`;
}
