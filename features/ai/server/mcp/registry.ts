import type { AiToolDefinition } from "../../types";
import type { McpToolSpec } from "./types";
import { toAiToolDefinition } from "./types";

export class McpToolRegistry {
  private specs = new Map<string, McpToolSpec>();

  constructor(initial: McpToolSpec[] = []) {
    this.registerMany(initial);
  }

  register(spec: McpToolSpec): this {
    this.specs.set(spec.name, spec);
    return this;
  }

  registerMany(specs: McpToolSpec[]): this {
    for (const spec of specs) this.register(spec);
    return this;
  }

  unregister(name: string): boolean {
    return this.specs.delete(name);
  }

  get(name: string): McpToolSpec | undefined {
    return this.specs.get(name);
  }

  has(name: string): boolean {
    return this.specs.has(name);
  }

  list(): McpToolSpec[] {
    return [...this.specs.values()];
  }

  count(): number {
    return this.specs.size;
  }

  toAgentTools(): AiToolDefinition[] {
    return this.list().map(toAiToolDefinition);
  }
}
