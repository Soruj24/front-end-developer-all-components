export type ProviderKind = "cloud" | "local" | "selfhosted" | "custom" | "mcp";

export type ProviderName = string;

export type ModelId = string;

export interface ProviderDefinition {
  id: ProviderName;
  label: string;
  kind: ProviderKind;
  /** Human description shown in provider management UI. */
  description: string;
  /** Models advertised by this provider, resolved from the catalog. */
  models: ModelConfig[];
  /** Built-in flag: false for user-added providers (BYOK). */
  builtin: boolean;
  /** Whether an API key is required to use this provider. */
  requiresKey: boolean;
}

export interface ModelConfig {
  id: ModelId;
  provider: ProviderName;
  model: string;
  label: string;
  contextWindow: number;
  supportsToolCalls: boolean;
  supportsStreaming: boolean;
  /** Where the model runs: "cloud" | "local" | "selfhosted". */
  kind: ProviderKind;
  costPer1kIn?: number;
  costPer1kOut?: number;
}

export interface ModelRequestOptions {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  reasoningLevel?: "none" | "low" | "medium" | "high";
  streaming?: boolean;
  /** API key override (BYOK at request time). */
  apiKey?: string;
  /** Custom base URL override (self-hosted / custom providers). */
  baseURL?: string;
}
