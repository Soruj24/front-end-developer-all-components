import { AiError, type AiErrorCode } from "./errors";

export interface RetryOptions {
  retries: number;
  delayMs?: number;
  isRetryable?: (error: unknown) => boolean;
  onRetry?: (attempt: number, error: unknown) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { retries, delayMs = 500, isRetryable, onRetry } = options;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const retryable =
        (isRetryable ? isRetryable(error) : defaultRetryable(error)) &&
        attempt < retries;
      if (!retryable) throw error;
      onRetry?.(attempt + 1, error);
      await sleep(delayMs * Math.pow(2, attempt));
    }
  }
  throw lastError;
}

function defaultRetryable(error: unknown): boolean {
  if (error instanceof AiError) return error.retryable;
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return /429|500|503|timeout|econnreset|rate/i.test(message);
}

export function isAiError(error: unknown, code?: AiErrorCode): error is AiError {
  if (!(error instanceof AiError)) return false;
  return code === undefined || error.code === code;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
