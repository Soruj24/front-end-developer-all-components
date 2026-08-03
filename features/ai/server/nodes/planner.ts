import type { BuildPlan, BuildState } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface PlanOutput {
  componentName?: string;
  category?: string;
  requirements?: string[];
  designNotes?: string;
  targetDependencies?: string[];
}

/** Validates planner output into a BuildPlan. */
export function parseBuildPlan(text: string): BuildPlan | null {
  const parsed = parseJsonObject<PlanOutput>(text);
  if (parsed && typeof parsed.componentName === "string" && parsed.componentName.trim()) {
    return {
      componentName: parsed.componentName.trim(),
      category: parsed.category ?? "components",
      requirements: parsed.requirements ?? [],
      designNotes: parsed.designNotes,
      targetDependencies: parsed.targetDependencies,
    };
  }
  return null;
}

/** Hosts the Planner Agent: turns the user prompt into a build plan. */
export function makePlannerNode(deps: GenerateGraphDeps) {
  return async function plannerNode(state: BuildState): Promise<Partial<BuildState>> {
    const text = await runAgent(deps, "planner", state.request.prompt, {
      context: state.request.constraints,
    });
    const plan = parseBuildPlan(text);
    if (!plan) {
      return { error: "Planner produced invalid output (expected a ```json block)." };
    }
    return { plan, error: undefined };
  };
}
