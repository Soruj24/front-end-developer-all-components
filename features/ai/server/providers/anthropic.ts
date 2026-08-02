import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions } from "../../types";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../../constants";
import { builtinModels } from "./catalog";
import type { ProviderAdapter } from "./adapter";

export function createAnthropicAdapter(): ProviderAdapter {
  const models = builtinModels.filter((m) => m.provider === "anthropic");

  return {
    id: "anthropic",
    label: "Anthropic",
    kind: "cloud",
    description: "Anthropic Claude models via the official API.",
    requiresKey: true,
    isConfigured: () => Boolean(process.env["ANTHROPIC_API_KEY"]),
    listModelIds: () => models.map((m) => m.id),
    resolveApiKey: (override) => override ?? (process.env["ANTHROPIC_API_KEY"] || undefined),
    createModel: (config: ModelConfig, options: ModelRequestOptions): BaseChatModel => {
      const apiKey = options.apiKey ?? process.env["ANTHROPIC_API_KEY"];
      return new ChatAnthropic({
        model: config.model,
        apiKey: apiKey ?? "missing-api-key",
        temperature: options.temperature ?? DEFAULT_TEMPERATURE,
        maxTokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
      });
    },
  };
}
