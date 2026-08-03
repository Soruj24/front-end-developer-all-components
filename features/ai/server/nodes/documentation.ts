import type { DocumentationArtifact, GenerateState } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface DocumentationOutput {
  overview?: string;
  installation?: string;
  usage?: string;
  props?: string;
  examples?: string;
  variants?: string;
  accessibilityNotes?: string;
  apiReference?: string;
  changelog?: string;
  migrationGuide?: string;
}

/** Validates documentation agent output into a DocumentationArtifact. */
export function parseDocumentation(text: string): DocumentationArtifact | null {
  const parsed = parseJsonObject<DocumentationOutput>(text);
  if (!parsed || typeof parsed.overview !== "string" || !parsed.overview.trim()) {
    return null;
  }
  return {
    overview: parsed.overview,
    installation: parsed.installation,
    usage: parsed.usage,
    props: parsed.props,
    examples: parsed.examples,
    variants: parsed.variants,
    accessibilityNotes: parsed.accessibilityNotes,
    apiReference: parsed.apiReference,
    changelog: parsed.changelog,
    migrationGuide: parsed.migrationGuide,
  };
}

/** Generates comprehensive component documentation (best-effort, non-blocking). */
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
