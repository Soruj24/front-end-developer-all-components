import { ChatOllama } from "@langchain/ollama";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions } from "../../types";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../../constants";
import { builtinModels } from "./catalog";
import type { ProviderAdapter } from "./adapter";

export function createOllamaAdapter(): ProviderAdapter {
  const models = builtinModels.filter((m) => m.provider === "ollama");

  return {
    id: "ollama",
    label: "Ollama (Local)",
    kind: "local",
    description: "Local models served by an Ollama instance.",
    requiresKey: false,
    isConfigured: () => true,
    listModelIds: () => models.map((m) => m.id),
    resolveApiKey: () => undefined,
    createModel: (config: ModelConfig, options: ModelRequestOptions): BaseChatModel => {
      return new ChatOllama({
        model: config.model,
        temperature: options.temperature ?? DEFAULT_TEMPERATURE,
        numPredict: options.maxTokens ?? DEFAULT_MAX_TOKENS,
        baseUrl: options.baseURL,
      });
    },
  };
}
