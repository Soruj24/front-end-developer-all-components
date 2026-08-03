import type { ComponentArtifact, GenerateState } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

/** Validates parsed output into a ComponentArtifact. */
export function parseArtifact(text: string): ComponentArtifact | null {
  const parsed = parseJsonObject<Partial<ComponentArtifact>>(text);
  if (parsed && typeof parsed.source === "string" && typeof parsed.name === "string") {
    return {
      name: parsed.name,
      description: parsed.description ?? "",
      category: parsed.category ?? "components",
      tags: parsed.tags ?? [],
      source: parsed.source,
      dependencies: parsed.dependencies ?? [],
    };
  }
  return null;
}

/** Hosts the Component Generator deep agent inside the graph. */
export function makeGenerateNode(deps: GenerateGraphDeps) {
  return async function generateNode(state: GenerateState): Promise<Partial<GenerateState>> {
    const human =
      state.request.prompt +
      (state.error ? `\n\nPrevious attempt failed: ${state.error}` : "");

    const text = await runAgent(deps, "componentGenerator", human, {
      context: state.request.constraints,
    });

    const artifact = parseArtifact(text);
    if (!artifact) {
      return {
        error: "Generator produced invalid output (expected a ```json block).",
        attempts: 1,
      };
    }
    return { artifact, error: undefined, attempts: 1 };
  };
}
