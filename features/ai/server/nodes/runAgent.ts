import { HumanMessage } from "@langchain/core/messages";
import type { BaseMessage } from "@langchain/core/messages";
import { buildDeepAgent } from "../agents/deepAgent";
import { agentModelIds, type AgentId } from "../agents/catalog";
import { buildAgentPrompt } from "../prompts/agents";
import type { GenerateGraphDeps } from "../workflows/deps";

export interface DeepAgentResult {
  messages: BaseMessage[];
}

function lastText(messages: BaseMessage[]): string {
  const last = messages[messages.length - 1];
  return typeof last?.content === "string" ? last.content : "";
}

/**
 * Runs a catalog deep agent once and returns its final text. Model id, prompt,
 * and tools come from the agent spec + injected deps.
 */
export async function runAgent(
  deps: GenerateGraphDeps,
  agentId: AgentId,
  human: string,
  options: { context?: string } = {}
): Promise<string> {
  const { modelId } = agentModelIds(agentId);
  const systemPrompt = buildAgentPrompt(agentId, {
    request: human,
    context: options.context ?? "",
  });

  const agent = buildDeepAgent(deps.registry, {
    modelId,
    systemPrompt,
    tools: deps.tools.list(),
  });

  const result = (await agent.invoke({
    messages: [new HumanMessage(human)],
  })) as DeepAgentResult;

  return lastText(result.messages);
}
