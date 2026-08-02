export type AiErrorCode =
  | "auth_missing"
  | "rate_limited"
  | "provider_unavailable"
  | "invalid_request"
  | "context_length"
  | "tool_failed"
  | "unknown";

export interface AiErrorOptions {
  retryable?: boolean;
  cause?: unknown;
}

export class AiError extends Error {
  readonly code: AiErrorCode;
  readonly retryable: boolean;
  readonly cause?: unknown;

  constructor(code: AiErrorCode, message: string, options: AiErrorOptions = {}) {
    super(message);
    this.name = "AiError";
    this.code = code;
    this.retryable = options.retryable ?? false;
    this.cause = options.cause;
  }
}

const MESSAGES: Record<AiErrorCode, string> = {
  auth_missing: "Missing provider API key.",
  rate_limited: "Provider rate limit exceeded.",
  provider_unavailable: "Provider is unavailable.",
  invalid_request: "Invalid AI request.",
  context_length: "Request exceeds the model context window.",
  tool_failed: "A tool call failed.",
  unknown: "Unexpected AI service error.",
};

export function classifyError(error: unknown): AiError {
  if (error instanceof AiError) return error;

  const raw = error instanceof Error ? error : new Error(String(error));
  const message = raw.message.toLowerCase();

  if (/api[_-]?key|unauthorized|401|403/.test(message)) {
    return new AiError("auth_missing", MESSAGES.auth_missing, { cause: raw });
  }
  if (/rate|429|too many/.test(message)) {
    return new AiError("rate_limited", MESSAGES.rate_limited, { retryable: true, cause: raw });
  }
  if (/context|token|length/.test(message)) {
    return new AiError("context_length", MESSAGES.context_length, { cause: raw });
  }
  if (/timeout|econnreset|econnrefused|502|503|service unavailable/.test(message)) {
    return new AiError("provider_unavailable", MESSAGES.provider_unavailable, {
      retryable: true,
      cause: raw,
    });
  }
  return new AiError("unknown", MESSAGES.unknown, { cause: raw });
}
