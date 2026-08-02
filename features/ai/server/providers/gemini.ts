import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions } from "../../types";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "../../constants";
import { builtinModels } from "./catalog";
import type { ProviderAdapter } from "./adapter";

export function createGeminiAdapter(): ProviderAdapter {
  const models = builtinModels.filter((m) => m.provider === "gemini");

  return {
    id: "gemini",
    label: "Google Gemini",
    kind: "cloud",
    description: "Google Gemini models via the Generative Language API.",
    requiresKey: true,
    isConfigured: () => Boolean(process.env["GOOGLE_GENERATIVE_AI_API_KEY"]),
    listModelIds: () => models.map((m) => m.id),
    resolveApiKey: (override) =>
      override ?? (process.env["GOOGLE_GENERATIVE_AI_API_KEY"] || undefined),
    createModel: (config: ModelConfig, options: ModelRequestOptions): BaseChatModel => {
      const apiKey = options.apiKey ?? process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
      return new ChatGoogleGenerativeAI({
        model: config.model,
        apiKey: apiKey ?? "missing-api-key",
        temperature: options.temperature ?? DEFAULT_TEMPERATURE,
        maxOutputTokens: options.maxTokens ?? DEFAULT_MAX_TOKENS,
        topP: options.topP,
      });
    },
  };
}
