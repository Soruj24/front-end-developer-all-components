import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ModelConfig, ModelRequestOptions, ProviderKind, ProviderName } from "../../types";

/**
 * Provider adapter contract. Every AI provider — cloud, local, self-hosted,
 * custom, or MCP — implements this interface. The registry and callers only
 * ever depend on `ProviderAdapter`, so adding a new provider requires no
 * changes to existing code.
 */
export interface ProviderAdapter {
  /** Stable identifier, e.g. "openai" or "anthropic". */
  id: ProviderName;
  /** Display name, e.g. "OpenAI". */
  label: string;
  kind: ProviderKind;
  description: string;
  requiresKey: boolean;
  /** Whether the adapter can currently be used (e.g. key present for cloud). */
  isConfigured(): boolean;
  /** Build a chat model for the given model id and request options. */
  createModel(config: ModelConfig, options: ModelRequestOptions): BaseChatModel;
  /** Return the model ids this adapter supports. */
  listModelIds(): string[];
  /** Resolve the API key for this provider (BYOK or configured secret). */
  resolveApiKey(override?: string): string | undefined;
}
