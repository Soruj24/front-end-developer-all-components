import type { ComponentArtifact, GenerateState, RegistryMetadata } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

/** Runs the Registry Agent and normalizes metadata for an artifact. */
export async function resolveRegistryMetadata(
  deps: GenerateGraphDeps,
  artifact: ComponentArtifact,
  prompt: string
): Promise<RegistryMetadata | null> {
  const text = await runAgent(
    deps,
    "registry",
    `Normalize registry metadata for this component:\n${JSON.stringify(artifact)}`,
    { context: prompt }
  );
  const meta = parseJsonObject<Partial<RegistryMetadata>>(text);
  if (!meta || typeof meta.name !== "string" || !meta.name.trim()) return null;
  return {
    name: meta.name.trim(),
    description: meta.description ?? artifact.description,
    category: meta.category ?? artifact.category,
    tags: meta.tags ?? artifact.tags,
  };
}

/** Hosts the Registry Agent (generate pipeline). */
export function makeRegistryAgentNode(deps: GenerateGraphDeps) {
  return async function registryAgentNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    if (!state.artifact) return {};
    const registryMeta = await resolveRegistryMetadata(
      deps,
      state.artifact,
      state.request.prompt
    );
    if (!registryMeta) {
      return { error: "Registry agent produced invalid metadata." };
    }
    return { registryMeta };
  };
}
