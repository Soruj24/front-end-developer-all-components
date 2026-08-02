export const DEFAULT_MODEL_ID = "groq/llama-3.3-70b-versatile";
export const FALLBACK_MODEL_IDS: string[] = ["openrouter/anthropic/claude-3.5-sonnet"];

export const DEFAULT_TEMPERATURE = 0.7;
export const DEFAULT_MAX_TOKENS = 1024;
export const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful, concise AI assistant. Answer in plain text with markdown when useful.";

export const CACHE_TTL_MS = 5 * 60 * 1000;
export const HISTORY_LIMIT = 12;
export const RAG_TOP_K = 4;
export const MAX_RETRIES = 2;
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
