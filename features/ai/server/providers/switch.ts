import { getModelConfig, modelCatalog } from "../../constants";
import type { ModelId, ProviderName } from "../../types";

export type ModelSwitchStrategy = "preferred" | "fastest" | "capacity";

export interface ModelSwitchOptions {
  strategy?: ModelSwitchStrategy;
  provider?: ProviderName;
  preferredId?: ModelId;
}

export function selectModelId(options: ModelSwitchOptions = {}): ModelId {
  const { strategy = "preferred", provider, preferredId } = options;
  if (preferredId && getModelConfig(preferredId)) return preferredId;

  let pool = [...modelCatalog];
  if (provider) pool = pool.filter((entry) => entry.provider === provider);
  if (pool.length === 0) throw new Error(`No models available for provider: ${provider}`);

  switch (strategy) {
    case "capacity":
      return pool.reduce((a, b) => (a.contextWindow >= b.contextWindow ? a : b)).id;
    case "fastest":
      return pool[0].id;
    case "preferred":
      return pool[0].id;
  }
}

export function providerOf(modelId: ModelId): ProviderName | undefined {
  return getModelConfig(modelId)?.provider;
}

export function isModelId(modelId: ModelId): boolean {
  return getModelConfig(modelId) !== undefined;
}
