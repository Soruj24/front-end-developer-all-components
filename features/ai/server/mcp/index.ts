import { createDefaultActionRegistry, ActionRegistry } from "./actions";
import type { AgentAction } from "./actions";
import { createMcpServer } from "./server";
import { McpToolRegistry } from "./registry";
import type { McpToolSpec } from "./types";
import { agentActionTools } from "./tools/actions";
import { databaseTools } from "./tools/database";
import { discoveryTools } from "./tools/discovery";
import { docsTools } from "./tools/docs";
import { filesystemTools } from "./tools/filesystem";
import { gitTools } from "./tools/git";
import { memoryTools } from "./tools/memory";
import { registrationTools } from "./tools/register";
import { registryTools } from "./tools/search";
import { ToolRegistry } from "../tools";

export { ActionRegistry, McpToolRegistry, createMcpServer };
export { createDefaultActionRegistry };
export type { AgentAction, McpToolSpec };

/** Builds the default MCP tool registry with all capability tools. */
export function createDefaultMcpRegistry(
  actions: ActionRegistry = createDefaultActionRegistry()
): McpToolRegistry {
  const registry = new McpToolRegistry();
  registry.registerMany(discoveryTools(registry));
  registry.registerMany(registrationTools(registry));
  registry.registerMany(registryTools());
  registry.registerMany(docsTools());
  registry.registerMany(databaseTools());
  registry.registerMany(memoryTools());
  registry.registerMany(filesystemTools());
  registry.registerMany(gitTools());
  registry.registerMany(agentActionTools(actions));
  return registry;
}

/** Builds a ChatService ToolRegistry from the default MCP tools. */
export function createMcpAgentToolRegistry(
  actions: ActionRegistry = createDefaultActionRegistry()
): ToolRegistry {
  return new ToolRegistry().registerMany(createDefaultMcpRegistry(actions).toAgentTools());
}
