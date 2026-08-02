import { createOpenAiCompatibleAdapter } from "./openaiCompatible";

export interface SelfHostedProviderOptions {
  /** Unique provider id, e.g. "selfhosted/vllm". */
  id: string;
  label: string;
  baseURL: string;
  apiKey?: string;
  modelIds: string[];
  /** Env var that holds the API key, if any. */
  apiKeyEnv?: string;
}

/**
 * Creates a self-hosted provider adapter for any OpenAI-compatible server
 * (vLLM, TGI, llama.cpp, LM Studio, LiteLLM proxy, …). No API key required by
 * default; supply one when the server demands it.
 */
export function createSelfHostedAdapter(options: SelfHostedProviderOptions) {
  return createOpenAiCompatibleAdapter({
    id: options.id,
    label: options.label,
    kind: "selfhosted",
    description: `Self-hosted OpenAI-compatible server at ${options.baseURL}.`,
    baseURL: options.baseURL,
    apiKeyEnv: options.apiKeyEnv,
    requiresKey: Boolean(options.apiKeyEnv),
    modelIds: options.modelIds,
  });
}
