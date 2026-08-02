import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { getModelConfig } from "../../constants";
import type { ModelConfig, ModelRequestOptions } from "../../types";
import { AiError } from "../errors";
import { createDefaultProviderRegistry, type ProviderRegistry } from "./registry";

export interface ResolvedModel {
  config: ModelConfig;
  provider: string;
  model: BaseChatModel;
}

/**
 * Model-level facade over the ProviderRegistry. Callers (runner, agents,
 * services) keep using `resolve(modelId, options)`; the provider is chosen by
 * the model config, so provider plumbing never leaks into feature code.
 */
export class ModelRegistry {
  constructor(private providers: ProviderRegistry = createDefaultProviderRegistry()) {}

  resolve(modelId: string, options: ModelRequestOptions = {}): ResolvedModel {
    const config = getModelConfig(modelId);
    if (!config) {
      throw new AiError("invalid_request", `Unknown model id: ${modelId}`);
    }
    const model = this.providers.build(config, options);
    return { config, provider: config.provider, model };
  }
}
