import { ChatCohere } from "@langchain/cohere";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions } from "../../types";
import { DEFAULT_TEMPERATURE } from "../../constants";
import { builtinModels } from "./catalog";
import type { ProviderAdapter } from "./adapter";

export function createCohereAdapter(): ProviderAdapter {
  const models = builtinModels.filter((m) => m.provider === "cohere");

  return {
    id: "cohere",
    label: "Cohere",
    kind: "cloud",
    description: "Cohere Command models via the official API.",
    requiresKey: true,
    isConfigured: () => Boolean(process.env["COHERE_API_KEY"]),
    listModelIds: () => models.map((m) => m.id),
    resolveApiKey: (override) => override ?? (process.env["COHERE_API_KEY"] || undefined),
    createModel: (config: ModelConfig, options: ModelRequestOptions): BaseChatModel => {
      const apiKey = options.apiKey ?? process.env["COHERE_API_KEY"];
      return new ChatCohere({
        model: config.model,
        apiKey: apiKey ?? "missing-api-key",
        temperature: options.temperature ?? DEFAULT_TEMPERATURE,
        streaming: options.streaming ?? false,
      });
    },
  };
}
