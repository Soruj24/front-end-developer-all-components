import type { GenerateState, VersionPlan } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

/** Runs the Version Manager Agent to recommend a semver bump + changelog. */
export function makeVersionManagerNode(deps: GenerateGraphDeps) {
  return async function versionManagerNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    if (!state.artifact) return {};

    const text = await runAgent(
      deps,
      "versionManager",
      `Recommend a version for this new component:\n${JSON.stringify(state.artifact)}`,
      { context: state.request.prompt }
    );

    const plan = parseJsonObject<Partial<VersionPlan>>(text);
    if (!plan || typeof plan.version !== "string" || !plan.version.trim()) {
      return { error: "Version agent produced invalid output." };
    }
    return {
      versionPlan: {
        bump: plan.bump ?? "minor",
        version: plan.version.trim(),
        changelog: plan.changelog ?? "",
      },
    };
  };
}
