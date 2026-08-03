import type { AgentId } from "../agents/catalog";
import type { BuildState } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseReviewReport } from "./review";
import { runAgent } from "./runAgent";

export type AuditorId = "accessibility" | "responsive" | "performance";

/**
 * Creates a single-responsibility audit node for the given auditor agent.
 * Each audit appends a ReviewReport to the thread; verdicts surface to the
 * human at the review interrupt.
 */
export function makeAuditNode(deps: GenerateGraphDeps, agent: AuditorId) {
  return async function auditNode(state: BuildState): Promise<Partial<BuildState>> {
    if (!state.artifact) return {};

    const text = await runAgent(deps, agent, state.artifact.source, {
      context: `User request: ${state.request.prompt}`,
    });

    const report = parseReviewReport(text, agent as AgentId);
    if (!report) {
      return {
        reviews: [
          {
            agent,
            passed: false,
            summary: `${agent} produced invalid output.`,
            issues: [{ agent, severity: "error", message: "Unparseable audit." }],
          },
        ],
      };
    }
    return { reviews: [report] };
  };
}
