import type { BuildState } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseArtifact } from "./generate";
import { runAgent } from "./runAgent";

/**
 * Hosts the Component Generator inside the build workflow. Consumes the plan
 * and research findings as context so the agent can follow registry
 * conventions when producing component source.
 */
export function makeBuildGenerateNode(deps: GenerateGraphDeps) {
  return async function buildGenerateNode(state: BuildState): Promise<Partial<BuildState>> {
    const human = [
      `User request: ${state.request.prompt}`,
      state.plan ? `Build plan:\n${JSON.stringify(state.plan)}` : "",
      state.research ? `Research findings:\n${JSON.stringify(state.research)}` : "",
      state.error ? `Previous attempt failed: ${state.error}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const text = await runAgent(deps, "componentGenerator", human, {
      context: state.request.constraints,
    });

    const artifact = parseArtifact(text);
    if (!artifact) {
      return { error: "Generator produced invalid output (expected a ```json block)." };
    }
    return { artifact, error: undefined };
  };
}
