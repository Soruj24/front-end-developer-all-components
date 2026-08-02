import type { ModelConfig } from "../types";

const base = {
  supportsToolCalls: true,
  supportsStreaming: true,
} as const;

/** Static, client-safe model definitions shipped with the platform. */
export const modelCatalog: ModelConfig[] = [
  { ...base, id: "openai/gpt-4o", provider: "openai", model: "gpt-4o", label: "GPT-4o", contextWindow: 128000, kind: "cloud" },
  { ...base, id: "openai/gpt-4o-mini", provider: "openai", model: "gpt-4o-mini", label: "GPT-4o mini", contextWindow: 128000, kind: "cloud" },
  { ...base, id: "anthropic/claude-3-5-sonnet", provider: "anthropic", model: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet", contextWindow: 200000, kind: "cloud" },
  { ...base, id: "anthropic/claude-3-5-haiku", provider: "anthropic", model: "claude-3-5-haiku-20241022", label: "Claude 3.5 Haiku", contextWindow: 200000, kind: "cloud" },
  { ...base, id: "gemini/gemini-1.5-pro", provider: "gemini", model: "gemini-1.5-pro", label: "Gemini 1.5 Pro", contextWindow: 1000000, kind: "cloud" },
  { ...base, id: "gemini/gemini-1.5-flash", provider: "gemini", model: "gemini-1.5-flash", label: "Gemini 1.5 Flash", contextWindow: 1000000, kind: "cloud" },
  { ...base, id: "grok/grok-2", provider: "grok", model: "grok-2", label: "Grok 2", contextWindow: 131072, kind: "cloud" },
  { ...base, id: "deepseek/deepseek-chat", provider: "deepseek", model: "deepseek-chat", label: "DeepSeek Chat", contextWindow: 64000, kind: "cloud" },
  { ...base, id: "openrouter/anthropic/claude-3.5-sonnet", provider: "openrouter", model: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet (OpenRouter)", contextWindow: 200000, kind: "cloud" },
  { ...base, id: "openrouter/openai/gpt-4o", provider: "openrouter", model: "openai/gpt-4o", label: "GPT-4o (OpenRouter)", contextWindow: 128000, kind: "cloud" },
  { ...base, id: "mistral/mistral-large-latest", provider: "mistral", model: "mistral-large-latest", label: "Mistral Large", contextWindow: 128000, kind: "cloud" },
  { ...base, id: "mistral/mistral-small-latest", provider: "mistral", model: "mistral-small-latest", label: "Mistral Small", contextWindow: 32000, kind: "cloud" },
  { ...base, id: "cohere/command-r-plus", provider: "cohere", model: "command-r-plus", label: "Command R+", contextWindow: 128000, kind: "cloud" },
  { ...base, id: "groq/llama-3.3-70b-versatile", provider: "groq", model: "llama-3.3-70b-versatile", label: "Llama 3.3 70B (Groq)", contextWindow: 131072, kind: "cloud" },
  { ...base, id: "groq/llama-3.1-8b-instant", provider: "groq", model: "llama-3.1-8b-instant", label: "Llama 3.1 8B Instant (Groq)", contextWindow: 131072, kind: "cloud" },
  { ...base, id: "ollama/llama3.1", provider: "ollama", model: "llama3.1", label: "Llama 3.1 (Ollama)", contextWindow: 128000, kind: "local" },
  { ...base, id: "ollama/mistral", provider: "ollama", model: "mistral", label: "Mistral (Ollama)", contextWindow: 32000, kind: "local" },
  { ...base, id: "ollama/llama3.2", provider: "ollama", model: "llama3.2", label: "Llama 3.2 (Ollama)", contextWindow: 128000, kind: "local" },
];

/** Base URLs per provider, used by the OpenAI-compatible adapters. */
export const PROVIDER_BASE_URLS: Record<string, string> = {
  openai: "https://api.openai.com/v1",
  deepseek: "https://api.deepseek.com/v1",
  grok: "https://api.x.ai/v1",
  openrouter: "https://openrouter.ai/api/v1",
  mistral: "https://api.mistral.ai/v1",
  cohere: "https://api.cohere.ai/v2",
  groq: "https://api.groq.com/openai/v1",
  ollama: "http://localhost:11434/v1",
};

export function getModelConfig(id: string): ModelConfig | undefined {
  return modelCatalog.find((entry) => entry.id === id);
}

export function listModels(): ModelConfig[] {
  return [...modelCatalog];
}

export function listModelsByProvider(provider: string): ModelConfig[] {
  return modelCatalog.filter((entry) => entry.provider === provider);
}
