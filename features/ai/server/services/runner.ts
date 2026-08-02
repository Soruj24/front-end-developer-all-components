import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { BaseMessageLike } from "@langchain/core/messages";
import type { AiToolDefinition, ToolResult } from "../../types";
import { MAX_RETRIES } from "../../constants";
import type { ModelRegistry } from "../providers";
import { invokeWithFallback, shouldFallback } from "../providers";
import { withRetry } from "../errors";
import { callModelWithTools, extractText } from "./call";

export interface UsageTokens {
  promptTokens?: number;
  completionTokens?: number;
}

export interface RunnerOptions {
  temperature?: number;
  maxTokens?: number;
}

export interface RunResult {
  value: {
    text: string;
    promptTokens?: number;
    completionTokens?: number;
    toolResults: ToolResult[];
  };
  usedModel: string;
}

export function runWithFallback(
  registry: ModelRegistry,
  modelId: string,
  fallbackIds: string[],
  llmMessages: BaseMessageLike[],
  toolDefs: AiToolDefinition[] | undefined,
  options: RunnerOptions
): Promise<RunResult> {
  const ids = [modelId, ...fallbackIds.filter((id) => id !== modelId)];
  const calls = ids.map((id) => ({
    id,
    run: () =>
      withRetry(() => {
        const { model } = registry.resolve(id, options);
        return callModelWithTools(model as BaseChatModel, llmMessages, { tools: toolDefs });
      }, { retries: MAX_RETRIES }),
  }));
  return invokeWithFallback(calls);
}

export type StreamStep =
  | { kind: "delta"; text: string; delta: string }
  | { kind: "final"; usage: UsageTokens };

export async function* streamWithFallback(
  registry: ModelRegistry,
  modelId: string,
  fallbackIds: string[],
  llmMessages: BaseMessageLike[],
  toolDefs: AiToolDefinition[] | undefined,
  options: RunnerOptions
): AsyncGenerator<StreamStep> {
  const ids = [modelId, ...fallbackIds.filter((id) => id !== modelId)];

  if (toolDefs && toolDefs.length > 0) {
    const { value } = await runWithFallback(
      registry,
      modelId,
      fallbackIds,
      llmMessages,
      toolDefs,
      options
    );
    yield { kind: "delta", text: value.text, delta: value.text };
    yield {
      kind: "final",
      usage: {
        promptTokens: value.promptTokens,
        completionTokens: value.completionTokens,
      },
    };
    return;
  }

  let lastError: unknown;
  for (const id of ids) {
    try {
      const { model } = registry.resolve(id, options);
      const stream = await withRetry(() => model.stream(llmMessages), {
        retries: MAX_RETRIES,
      });
      let text = "";
      let promptTokens: number | undefined;
      let completionTokens: number | undefined;
      for await (const chunk of stream) {
        const piece = extractText(chunk.content);
        text += piece;
        promptTokens ??= chunk.usage_metadata?.input_tokens;
        completionTokens = chunk.usage_metadata?.output_tokens;
        yield { kind: "delta", text, delta: piece };
      }
      yield { kind: "final", usage: { promptTokens, completionTokens } };
      return;
    } catch (error) {
      lastError = error;
      if (shouldFallback(error)) continue;
      throw error;
    }
  }
  throw lastError;
}
