/** Normalized API errors: HTTP, timeout, abort and shape failures. */

export type ApiErrorCode =
  | "http"
  | "timeout"
  | "aborted"
  | "network"
  | "invalid-response"
  | "not-configured";

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly details?: unknown;

  constructor(code: ApiErrorCode, message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }

  get isTimeout(): boolean {
    return this.code === "timeout";
  }

  get isAbort(): boolean {
    return this.code === "aborted";
  }
}

export function isAbortError(error: unknown): boolean {
  return (
    (typeof DOMException !== "undefined" &&
      error instanceof DOMException &&
      error.name === "AbortError") ||
    (error instanceof ApiError && error.isAbort)
  );
}

/** Converts unknown throwables into ApiError without leaking internals. */
export function normalizeError(error: unknown, resource = "resource"): ApiError {
  if (error instanceof ApiError) return error;
  if (isAbortError(error)) {
    return new ApiError("aborted", `Request to ${resource} was cancelled.`);
  }
  if (error instanceof Error) {
    const timeout = /timeout|timed out|abort/i.test(error.message);
    return new ApiError(
      timeout ? "timeout" : "network",
      timeout
        ? `Request to ${resource} timed out. Check your connection and retry.`
        : `Could not reach ${resource}: ${error.message}`,
    );
  }
  return new ApiError("network", `Could not reach ${resource}.`);
}

/** Short, user-safe message for status UI. Never includes tokens or bodies. */
export function toUserMessage(error: unknown): string {
  const normalized = normalizeError(error);
  if (normalized.code === "http" && normalized.status) {
    if (normalized.status === 401 || normalized.status === 403) {
      return "Not authorized. Check your API credentials.";
    }
    if (normalized.status === 404) {
      return "The requested endpoint was not found (404).";
    }
    if (normalized.status === 429) {
      return "Rate limited (429). Wait a moment and retry.";
    }
    if (normalized.status >= 500) {
      return `The server failed (${normalized.status}). Retry later.`;
    }
    return `Request failed (${normalized.status}).`;
  }
  return normalized.message;
}
