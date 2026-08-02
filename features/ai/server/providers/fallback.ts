import type { ModelId } from "../../types";
import { AiError, classifyError } from "../errors";

export interface FallbackCall<T> {
  id: ModelId;
  run: () => Promise<T>;
}

export interface FallbackOptions {
  onRetry?: (attempted: ModelId, next: ModelId, error: unknown) => void;
}

export interface FallbackResult<T> {
  value: T;
  usedModel: ModelId;
  attempts: number;
}

export async function invokeWithFallback<T>(
  calls: Array<FallbackCall<T>>,
  options: FallbackOptions = {}
): Promise<FallbackResult<T>> {
  let lastError: unknown;
  for (let index = 0; index < calls.length; index++) {
    const call = calls[index];
    try {
      const value = await call.run();
      return { value, usedModel: call.id, attempts: index + 1 };
    } catch (error) {
      lastError = error;
      const hasNext = index < calls.length - 1;
      if (hasNext && shouldFallback(error)) {
        options.onRetry?.(call.id, calls[index + 1].id, error);
        continue;
      }
      if (!hasNext) throw error;
    }
  }
  throw lastError;
}

export function shouldFallback(error: unknown): boolean {
  if (error instanceof AiError) {
    return error.code === "provider_unavailable" || error.code === "rate_limited";
  }
  const classified = classifyError(error);
  return classified.code === "provider_unavailable" || classified.code === "rate_limited";
}
