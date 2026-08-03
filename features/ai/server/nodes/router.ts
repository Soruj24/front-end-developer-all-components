import type { BuildState } from "../state/build";
import type { GenerateState } from "../state";

/** Validates the incoming request; routes to generate or END with an error. */
export function makeRouterNode() {
  return async function routerNode(state: GenerateState): Promise<Partial<GenerateState>> {
    const prompt = state.request?.prompt?.trim();
    if (!prompt) {
      return {
        error: "Empty request prompt.",
        gate: { verdict: "handoff", issues: [], attempts: state.attempts },
      };
    }
    return { error: undefined };
  };
}

/** Validates the incoming request for the build workflow. */
export function makeBuildRouterNode() {
  return async function buildRouterNode(
    state: BuildState
  ): Promise<Partial<BuildState>> {
    const prompt = state.request?.prompt?.trim();
    return { error: prompt ? undefined : "Empty request prompt." };
  };
}
