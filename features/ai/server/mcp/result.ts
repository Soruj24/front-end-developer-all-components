import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export function toMcpResult(value: unknown): CallToolResult {
  const text =
    typeof value === "string"
      ? value
      : JSON.stringify(value, null, 2);
  return { content: [{ type: "text", text }] };
}

export function toMcpError(message: string): CallToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}
