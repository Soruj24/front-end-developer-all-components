import type { BuildState, ResearchFindings } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface ResearchOutput {
  similarComponents?: Array<{ slug: string; name: string }>;
  conventions?: string[];
  recommendations?: string;
}

/** Validates research output into ResearchFindings. */
export function parseResearchFindings(text: string): ResearchFindings | null {
  const parsed = parseJsonObject<ResearchOutput>(text);
  if (parsed && Array.isArray(parsed.similarComponents)) {
    return {
      similarComponents: parsed.similarComponents,
      conventions: parsed.conventions ?? [],
      recommendations: parsed.recommendations,
    };
  }
  return null;
}

/** Hosts the Research Agent: finds similar components and conventions. */
export function makeResearchNode(deps: GenerateGraphDeps) {
  return async function researchNode(state: BuildState): Promise<Partial<BuildState>> {
    if (!state.plan) return {};

    const human = `Build plan:\n${JSON.stringify(state.plan)}\n\nUser request: ${state.request.prompt}`;
    const text = await runAgent(deps, "research", human, {
      context: state.request.constraints,
    });

    const research = parseResearchFindings(text);
    if (!research) {
      return { error: "Research produced invalid output (expected a ```json block)." };
    }
    return { research, error: undefined };
  };
}
