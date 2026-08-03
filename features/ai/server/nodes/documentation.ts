import type { DocumentationArtifact, GenerateState } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface DocumentationOutput {
  readme?: string;
  props?: string;
  usage?: string;
}

/** Validates documentation agent output into a DocumentationArtifact. */
export function parseDocumentation(text: string): DocumentationArtifact | null {
  const parsed = parseJsonObject<DocumentationOutput>(text);
  if (parsed && typeof parsed.readme === "string" && parsed.readme.trim()) {
    return { readme: parsed.readme, props: parsed.props, usage: parsed.usage };
  }
  return null;
}

/** Generates README, props table, and usage docs (best-effort, non-blocking). */
export function makeDocumentationNode(deps: GenerateGraphDeps) {
  return async function documentationNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    if (!state.artifact) return {};

    const text = await runAgent(deps, "documentation", state.artifact.source, {
      context: `Request: ${state.request.prompt}`,
    });

    const docs = parseDocumentation(text);
    return docs ? { docs } : {};
  };
}
