import type { BuildState } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { resolveRegistryMetadata } from "./registryAgent";

/** Hosts the Registry Agent (build workflow). */
export function makeBuildRegistryNode(deps: GenerateGraphDeps) {
  return async function buildRegistryNode(state: BuildState): Promise<Partial<BuildState>> {
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
