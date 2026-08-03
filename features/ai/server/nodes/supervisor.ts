import { HumanMessage } from "@langchain/core/messages";
import { buildDeepAgent } from "../agents/deepAgent";
import { TIER_MODELS } from "../agents/catalog";
import { createCapabilityTools } from "../tools/capabilities";
import { SUPERVISOR_SYSTEM_PROMPT } from "../prompts/supervisor";
import { parseArtifact } from "./generate";
import { lastText } from "./runAgent";
import type { AutonomousState } from "../state/autonomous";
import type { GenerateGraphDeps } from "../workflows/deps";

const DEFAULT_STEP_BUDGET = 12;

export function makeSupervisorNode(deps: GenerateGraphDeps) {
  return async function supervisorNode(
    state: AutonomousState
  ): Promise<Partial<AutonomousState>> {
    const tools = createCapabilityTools(deps);
    const agent = buildDeepAgent(deps.registry, {
      modelId: TIER_MODELS.high,
      systemPrompt: SUPERVISOR_SYSTEM_PROMPT,
      tools,
    });
    try {
      const result = await agent.invoke(
        { messages: [new HumanMessage(state.request.prompt)] },
        { recursionLimit: DEFAULT_STEP_BUDGET }
      );
      const text = lastText(result.messages);
      const artifact = parseArtifact(text);
      return {
        summary: text,
        artifact: artifact ?? undefined,
        error: undefined,
        steps: ["supervisor: complete"],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        summary: undefined,
        error: message,
        steps: ["supervisor: failed"],
      };
    }
  };
}