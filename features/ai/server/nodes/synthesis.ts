import {
  MAX_GENERATION_ATTEMPTS,
  type GateIssue,
  type GenerateState,
  type GateVerdict,
} from "../state";

function formatIssues(issues: GateIssue[]): string {
  return issues.map((i) => `- [${i.severity}] ${i.agent}: ${i.message}`).join("\n");
}

/**
 * Joins all parallel review reports for the current round into one verdict.
 * Any error-severity issue fails the round; the router decides refine/handoff.
 */
export function makeReviewSynthesisNode() {
  return async function reviewSynthesisNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    const issues: GateIssue[] = state.reviews.flatMap((r) => r.issues);
    const verdict: GateVerdict = issues.some((i) => i.severity === "error")
      ? "retry"
      : "pass";
    return {
      synthesis: { verdict, issues, attempts: state.attempts },
      error: verdict === "pass" ? undefined : formatIssues(issues) || "Reviews failed.",
    };
  };
}

/** Conditional-edge router: refine, hand off, or move to testing. */
export function routeFromSynthesis(
  state: GenerateState
): "refactor" | "handoff" | "testing" {
  if (state.synthesis?.verdict === "pass") return "testing";
  return state.attempts >= MAX_GENERATION_ATTEMPTS ? "handoff" : "refactor";
}
