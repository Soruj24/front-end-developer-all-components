import type { GenerateState } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseArtifact } from "./generate";
import { runAgent } from "./runAgent";

/**
 * Refines the artifact against the aggregated review feedback. Increments the
 * attempt budget so the review→refactor loop is bounded.
 */
export function makeRefactorNode(deps: GenerateGraphDeps) {
  return async function refactorNode(state: GenerateState): Promise<Partial<GenerateState>> {
    const human = state.error
      ? `Apply the review feedback:\n${state.error}`
      : "Improve the component further.";

    const text = await runAgent(deps, "refactor", human, {
      context: state.request.constraints,
    });

    const artifact = parseArtifact(text);
    if (!artifact) {
      return { error: "Refactor produced invalid output (expected a ```json block).", attempts: 1 };
    }
    return { artifact, error: undefined, attempts: 1 };
  };
}
