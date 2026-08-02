import type { z } from "zod";
import type { AiToolDefinition } from "../../types";

export type McpToolHandler = (args: unknown) => unknown | Promise<unknown>;

export interface McpToolSpec {
  name: string;
  description: string;
  schema: z.ZodObject;
  handler: McpToolHandler;
}

export function toAiToolDefinition(spec: McpToolSpec): AiToolDefinition {
  return {
    name: spec.name,
    description: spec.description,
    schema: spec.schema,
    handler: spec.handler,
  };
}

/** Typed factory so handlers receive schema-validated, inferred args. */
export function tool<Shape extends z.ZodRawShape>(
  name: string,
  description: string,
  schema: z.ZodObject<Shape>,
  handler: (args: z.output<z.ZodObject<Shape>>) => unknown | Promise<unknown>
): McpToolSpec {
  return { name, description, schema, handler: handler as McpToolHandler };
}
