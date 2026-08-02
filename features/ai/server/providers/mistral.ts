import { ChatMistralAI } from "@langchain/mistralai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions } from "../../types";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../../constants";
import { builtinModels } from "./catalog";
import type { ProviderAdapter } from "./adapter";

export function createMistralAdapter(): ProviderAdapter {
  const models = builtinModels.filter((m) => m.provider === "mistral");

  return {
    id: "mistral",
    label: "Mistral",
    kind: "cloud",
    description: "Mistral AI models via the official API.",
    requiresKey: true,
    isConfigured: () => Boolean(process.env["MISTRAL_API_KEY"]),
    listModelIds: () => models.map((m) => m.id),
    resolveApiKey: (override) => override ?? (process.env["MISTRAL_API_KEY"] || undefined),
    createModel: (config: ModelConfig, options: ModelRequestOptions): BaseChatModel => {
      const apiKey = options.apiKey ?? process.env["MISTRAL_API_KEY"];
      return new ChatMistralAI({
        model: config.model,
        apiKey: apiKey ?? "missing-api-key",
        temperature: options.temperature ?? DEFAULT_TEMPERATURE,
        maxTokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
        topP: options.topP,
      });
    },
  };
}
