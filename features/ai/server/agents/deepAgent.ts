import { createDeepAgent } from "deepagents";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { AiToolDefinition } from "../../types";
import type { ModelRegistry } from "../providers";
import { toLangChainTool } from "../tools/registry";

export interface BuildDeepAgentOptions {
  modelId: string;
  systemPrompt: string;
  tools?: AiToolDefinition[];
}

export function buildDeepAgent(registry: ModelRegistry, options: BuildDeepAgentOptions) {
  const { model } = registry.resolve(options.modelId);
  return createDeepAgent({
    model: model as BaseChatModel,
    systemPrompt: options.systemPrompt,
    tools: (options.tools ?? []).map(toLangChainTool),
  });
}
