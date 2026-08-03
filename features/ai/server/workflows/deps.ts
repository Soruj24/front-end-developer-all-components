import type { BaseCheckpointSaver } from "@langchain/langgraph";
import { ModelRegistry } from "../providers";
import { createAgentToolRegistry, ToolRegistry } from "../tools";
import { createCheckpointer } from "../checkpoints";
import type { PipelineEventBus } from "../jobs/events";

/** Constructor-injected dependencies for the generation graph. */
export interface GenerateGraphDeps {
  registry: ModelRegistry;
  tools: ToolRegistry;
  checkpointer: BaseCheckpointSaver;
  eventBus?: PipelineEventBus;
}

/** Builds default deps so callers only override what they need. */
export function createGenerateGraphDeps(
  partial: Partial<GenerateGraphDeps> = {}
): GenerateGraphDeps {
  return {
    registry: partial.registry ?? new ModelRegistry(),
    tools: partial.tools ?? createAgentToolRegistry(),
    checkpointer: partial.checkpointer ?? createCheckpointer(),
    eventBus: partial.eventBus,
  };
}
