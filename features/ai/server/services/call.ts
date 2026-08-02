import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { BaseMessageLike } from "@langchain/core/messages";
import type { AiToolDefinition, ToolResult } from "../../types";
import { uid } from "../../utils";
import { toLangChainTool, ToolRegistry } from "../tools";

export interface ModelCallResult {
  text: string;
  promptTokens?: number;
  completionTokens?: number;
  toolResults: ToolResult[];
}

export interface CallWithToolsOptions {
  tools?: AiToolDefinition[];
  maxRounds?: number;
}

export async function callModelWithTools(
  model: BaseChatModel,
  messages: BaseMessageLike[],
  options: CallWithToolsOptions = {}
): Promise<ModelCallResult> {
  const { tools, maxRounds = 2 } = options;

  if (!tools || tools.length === 0) {
    const response = await model.invoke(messages);
    return {
      text: extractText(response.content),
      promptTokens: response.usage_metadata?.input_tokens,
      completionTokens: response.usage_metadata?.output_tokens,
      toolResults: [],
    };
  }

  if (!model.bindTools) {
    const response = await model.invoke(messages);
    return {
      text: extractText(response.content),
      promptTokens: response.usage_metadata?.input_tokens,
      completionTokens: response.usage_metadata?.output_tokens,
      toolResults: [],
    };
  }

  const registry = new ToolRegistry().registerMany(tools);
  const bound = model.bindTools(tools.map(toLangChainTool));
  let current: BaseMessageLike[] = [...messages];
  let text = "";
  const toolResults: ToolResult[] = [];

  for (let round = 0; round < maxRounds; round++) {
    const response = await bound.invoke(current);
    const calls = response.tool_calls ?? [];
    if (calls.length === 0) {
      text = extractText(response.content);
      break;
    }
    const results: ToolResult[] = [];
    for (const call of calls) {
      const result = await registry.execute({
        name: call.name,
        args: JSON.stringify(call.args ?? {}),
        callId: call.id ?? uid("tool"),
      });
      results.push(result);
    }
    toolResults.push(...results);
    current = [
      ...current,
      response,
      ...results.map((result) => ({
        role: "tool" as const,
        content: result.output,
        tool_call_id: result.callId,
      })),
    ];
  }

  return { text, toolResults };
}

export function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === "string") return block;
        if (block && typeof block === "object" && "text" in block) {
          return String((block as { text: unknown }).text);
        }
        return "";
      })
      .join("");
  }
  if (content && typeof content === "object" && "text" in content) {
    return String((content as { text: unknown }).text);
  }
  return String(content ?? "");
}
