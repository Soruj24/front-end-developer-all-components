import { DynamicStructuredTool } from "@langchain/core/tools";
import type { AiToolDefinition, ToolCall, ToolResult } from "../../types";
import { AiError } from "../errors";

export class ToolRegistry {
  private tools = new Map<string, AiToolDefinition>();

  register(tool: AiToolDefinition): this {
    this.tools.set(tool.name, tool);
    return this;
  }

  registerMany(tools: AiToolDefinition[]): this {
    for (const tool of tools) this.register(tool);
    return this;
  }

  get(name: string): AiToolDefinition | undefined {
    return this.tools.get(name);
  }

  list(): AiToolDefinition[] {
    return [...this.tools.values()];
  }

  has(name: string): boolean {
    return this.tools.has(name);
  }

  async execute(call: ToolCall): Promise<ToolResult> {
    const tool = this.tools.get(call.name);
    if (!tool) {
      throw new AiError("tool_failed", `Unknown tool: ${call.name}`);
    }
    const started = Date.now();
    const parsed = tool.schema.safeParse(JSON.parse(call.args || "{}"));
    if (!parsed.success) {
      throw new AiError("tool_failed", `Invalid args for tool ${call.name}: ${parsed.error.message}`);
    }
    const output = await tool.handler(parsed.data);
    return {
      name: call.name,
      callId: call.callId,
      output: typeof output === "string" ? output : JSON.stringify(output),
      durationMs: Date.now() - started,
    };
  }
}

export function toLangChainTool(tool: AiToolDefinition): DynamicStructuredTool {
  return new DynamicStructuredTool({
    name: tool.name,
    description: tool.description,
    schema: tool.schema,
    func: async (input: unknown) => tool.handler(input),
  });
}
