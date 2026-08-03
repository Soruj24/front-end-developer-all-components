import type { BuildState } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseDocumentation } from "./documentation";
import { runAgent } from "./runAgent";

/** Hosts the Documentation Agent (build workflow). */
export function makeBuildDocumentationNode(deps: GenerateGraphDeps) {
  return async function buildDocumentationNode(
    state: BuildState
  ): Promise<Partial<BuildState>> {
    if (!state.artifact) return {};

    const text = await runAgent(deps, "documentation", state.artifact.source, {
      context: `User request: ${state.request.prompt}`,
    });

    const docs = parseDocumentation(text);
    return docs ? { docs } : {};
  };
}
