import { END, START, StateGraph } from "@langchain/langgraph";
import { AutonomousWorkflowStateAnnotation } from "../state/autonomous";
import { makeSupervisorNode } from "../nodes/supervisor";
import { makeRollbackNode } from "../nodes/rollback";
import { makeUserReviewNode, routeFromUserReview } from "../nodes/userReview";
import { makePublishNode } from "../nodes/publish";
import type { GenerateGraphDeps } from "./deps";

/**
 * Autonomous component build workflow. A single supervisor DeepAgent with
 * capability tools drives the full lifecycle: understand intent → plan subtasks
 * → generate → fix errors → audit accessibility → optimize Tailwind → docs →
 * request approval → publish. On error the graph routes to a rollback node
 * that soft-deletes any published component.
 *
 * The publish gate is enforced at the tool level: publish_component requires
 * an approved approvalId from request_approval.
 */
export function buildAutonomousWorkflow(deps: GenerateGraphDeps) {
  const graph = new StateGraph(AutonomousWorkflowStateAnnotation)
    .addNode("supervisor", makeSupervisorNode(deps))
    .addNode("rollback", makeRollbackNode())
    .addNode("userReview", makeUserReviewNode())
    .addNode("publish", makePublishNode())
    .addEdge(START, "supervisor")
    .addConditionalEdges(
      "supervisor",
      (state) => (state.error ? "rollback" : "userReview"),
      { rollback: "rollback", userReview: "userReview" }
    )
    .addConditionalEdges("userReview", routeFromUserReview, {
      publish: "publish",
      end: END,
    })
    .addConditionalEdges(
      "publish",
      (state) => (state.error ? "rollback" : END),
      { rollback: "rollback", end: END }
    )
    .addEdge("rollback", END);

  return graph.compile({ checkpointer: deps.checkpointer });
}
