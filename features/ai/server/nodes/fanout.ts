import { Send } from "@langchain/langgraph";
import type { AgentId } from "../agents/catalog";
import type { GenerateState } from "../state";

/** Review agents run in parallel against each generated artifact. */
export const REVIEWER_AGENTS: AgentId[] = [
  "componentReviewer",
  "uiUxReviewer",
  "accessibility",
  "performance",
  "responsive",
];

/** Clears reports so each round's synthesis joins only its own reviews. */
export function makeReviewFanoutNode() {
  return async function reviewFanoutNode(): Promise<Partial<GenerateState>> {
    return { reviews: [] };
  };
}

/** Fans the artifact out to every reviewer in parallel via LangGraph Send. */
export function fanOutReviews(): Send[] {
  return REVIEWER_AGENTS.map((reviewer) => new Send("review", { reviewer }));
}
