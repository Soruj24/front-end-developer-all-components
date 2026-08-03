import {
  MAX_GENERATION_ATTEMPTS,
  type GateIssue,
  type GenerateState,
  type GateVerdict,
} from "../state";

/** Evaluates the latest artifact and attempts; routes to retry/handoff/pass. */
export function makeSynthesisGateNode() {
  return async function synthesisGateNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    const issues: GateIssue[] = [];
    if (!state.artifact) {
      issues.push({
        agent: "componentGenerator",
        severity: "error",
        message: state.error ?? "No artifact produced.",
      });
    }
    const verdict: GateVerdict =
      issues.length === 0
        ? "pass"
        : state.attempts >= MAX_GENERATION_ATTEMPTS
          ? "handoff"
          : "retry";
    return { gate: { verdict, issues, attempts: state.attempts } };
  };
}

/** Conditional-edge router for the artifact gate. */
export function routeFromGate(state: GenerateState): "retry" | "handoff" | "pass" {
  if (state.artifact) return "pass";
  return state.attempts >= MAX_GENERATION_ATTEMPTS ? "handoff" : "retry";
}
