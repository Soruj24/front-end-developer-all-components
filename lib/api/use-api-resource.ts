"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isAbortError, toUserMessage } from "./api-errors";
import type { ApiAdapter, ApiStatus, PageQuery, PageResult } from "./api-types";

export interface ApiResourceState<T> extends PageResult<T> {
  status: ApiStatus;
  /** User-safe message; null unless status is "error". */
  error: string | null;
  reload: () => void;
}

/**
 * Loads a resource through any `ApiAdapter` (mock or real) with:
 * - loading / success / empty / error states,
 * - stale-request protection (sequence ids + AbortController),
 * - automatic reload when the adapter instance or query key changes.
 *
 * Real mode never falls back to mock data: a failed real request surfaces
 * `status: "error"` with the previous items preserved.
 */
export function useApiResource<T>(
  adapter: ApiAdapter<T> | null,
  query: PageQuery = {},
): ApiResourceState<T> {
  const [state, setState] = useState<PageResult<T>>({ items: [], total: 0, page: 1, pageSize: 10 });
  const [status, setStatus] = useState<ApiStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const seq = useRef(0);
  const queryKey = JSON.stringify({ q: query, m: adapter?.mode, r: adapter?.resource });

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  const requestKey = `${queryKey}|${nonce}`;

  // Render-phase reset when the request changes (React-endorsed adjustment
  // pattern): avoids setState-in-effect while showing loading immediately.
  const [lastKey, setLastKey] = useState(requestKey);
  if (lastKey !== requestKey) {
    setLastKey(requestKey);
    setStatus("loading");
    setError(null);
  }

  useEffect(() => {
    if (!adapter) {
      return;
    }
    const id = (seq.current += 1);
    const controller = new AbortController();

    void (async () => {
      try {
        const parsed = JSON.parse(queryKey) as { q: PageQuery };
        const result = await adapter.list(parsed.q, controller.signal);
        if (seq.current !== id) return;
        setState(result);
        setStatus(result.items.length === 0 ? "empty" : "success");
      } catch (err) {
        if (seq.current !== id || isAbortError(err)) return;
        setStatus("error");
        setError(toUserMessage(err));
      }
    })();

    return () => controller.abort();
  }, [adapter, queryKey, nonce, requestKey]);

  return { ...state, status, error, reload };
}
