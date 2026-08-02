import type { z } from "zod";

export type ToolHandler = (args: unknown) => unknown | Promise<unknown>;

export interface AiToolDefinition {
  name: string;
  description: string;
  schema: z.ZodType;
  handler: ToolHandler;
}

export interface ToolCall {
  name: string;
  args: string;
  callId: string;
}

export interface ToolResult {
  name: string;
  callId: string;
  output: string;
  durationMs: number;
}
