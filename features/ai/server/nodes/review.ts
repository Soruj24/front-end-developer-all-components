import type { AgentId } from "../agents/catalog";
import type { GateIssue, GenerateState, ReviewReport } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface ReviewOutput {
  passed?: boolean;
  summary?: string;
  issues?: Array<{ severity?: "error" | "warn"; message?: string }>;
}

function failedReport(agent: AgentId, message: string): ReviewReport {
  return {
    agent,
    passed: false,
    summary: message,
    issues: [{ agent, severity: "error", message }],
  };
}

/** Normalizes raw review output into a ReviewReport. */
export function parseReviewReport(text: string, agent: AgentId): ReviewReport | null {
  const parsed = parseJsonObject<ReviewOutput>(text);
  if (!parsed) return null;
  const issues: GateIssue[] = (parsed.issues ?? []).map((issue) => ({
    agent,
    severity: issue.severity === "warn" ? "warn" : "error",
    message: issue.message ?? "Unspecified issue.",
  }));
  return {
    agent,
    passed: parsed.passed !== false && issues.filter((i) => i.severity === "error").length === 0,
    summary: parsed.summary ?? "",
    issues,
  };
}

/**
 * Runs one reviewer (selected via the `reviewer` Send payload) against the
 * current artifact. Appends its report; the synthesis gate owns the verdict.
 */
export function makeReviewNode(deps: GenerateGraphDeps) {
  return async function reviewNode(state: GenerateState): Promise<Partial<GenerateState>> {
    const reviewer: AgentId = state.reviewer ?? "componentReviewer";
    if (!state.artifact) {
      return { reviews: [failedReport(reviewer, "No artifact to review.")] };
    }

    const text = await runAgent(deps, reviewer, state.artifact.source, {
      context: `Request: ${state.request.prompt}`,
    });

    const report = parseReviewReport(text, reviewer);
    return {
      reviews: [report ?? failedReport(reviewer, "Reviewer produced invalid output.")],
    };
  };
}
