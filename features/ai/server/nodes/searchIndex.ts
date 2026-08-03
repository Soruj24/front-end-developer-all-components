import type { GenerateState, SearchIndexArtifact } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface SearchIndexOutput {
  keywords?: string[];
  summary?: string;
}

/** Validates search agent output into a SearchIndexArtifact. */
export function parseSearchIndex(text: string): SearchIndexArtifact | null {
  const parsed = parseJsonObject<SearchIndexOutput>(text);
  if (parsed && Array.isArray(parsed.keywords)) {
    return { keywords: parsed.keywords, summary: parsed.summary ?? "" };
  }
  return null;
}

/**
 * Indexes the saved component for keyword/vector retrieval. Runs after the
 * draft is persisted so the index can reference the component id.
 */
export function makeSearchIndexNode(deps: GenerateGraphDeps) {
  return async function searchIndexNode(state: GenerateState): Promise<Partial<GenerateState>> {
    if (!state.saved || !state.artifact) return {};

    const text = await runAgent(deps, "search", state.artifact.source, {
      context: `Saved component id: ${state.saved.componentId}; slug: ${state.saved.slug}.`,
    });

    const searchIndex = parseSearchIndex(text);
    return searchIndex ? { searchIndex } : {};
  };
}
