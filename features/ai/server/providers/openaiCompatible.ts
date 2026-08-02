import { ChatOpenAI } from "@langchain/openai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions, ProviderKind } from "../../types";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../../constants";
import type { ProviderAdapter } from "./adapter";

export interface OpenAiCompatibleOptions {
  id: string;
  label: string;
  kind: ProviderKind;
  description: string;
  /** Default base URL, e.g. https://api.openai.com/v1. */
  baseURL: string;
  /** Env var holding the default API key, if any. */
  apiKeyEnv?: string;
  requiresKey?: boolean;
  modelIds: string[];
}

/**
 * Builds a ProviderAdapter for any OpenAI-compatible endpoint (OpenRouter,
 * Groq, DeepSeek, xAI Grok, Ollama, Mistral, Cohere, self-hosted servers…).
 */
export function createOpenAiCompatibleAdapter(options: OpenAiCompatibleOptions): ProviderAdapter {
  const {
    id,
    label,
    kind,
    description,
    baseURL,
    apiKeyEnv,
    requiresKey = Boolean(apiKeyEnv),
    modelIds,
  } = options;

  const resolveKey = (override?: string): string | undefined => {
    if (override) return override;
    if (!apiKeyEnv) return undefined;
    return process.env[apiKeyEnv] || undefined;
  };

  return {
    id,
    label,
    kind,
    description,
    requiresKey,
    isConfigured: () => !requiresKey || Boolean(process.env[apiKeyEnv ?? ""]),
    listModelIds: () => [...modelIds],
    resolveApiKey: (override) => resolveKey(override),
    createModel: (config: ModelConfig, requestOptions: ModelRequestOptions): BaseChatModel => {
      const apiKey = resolveKey(requestOptions.apiKey);
      return new ChatOpenAI({
        model: config.model,
        apiKey: apiKey ?? "missing-api-key",
        temperature: requestOptions.temperature ?? DEFAULT_TEMPERATURE,
        maxTokens: requestOptions.maxTokens ?? DEFAULT_MAX_TOKENS,
        topP: requestOptions.topP,
        streamUsage: true,
        configuration: {
          baseURL: requestOptions.baseURL ?? baseURL,
        },
      });
    },
  };
}
