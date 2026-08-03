import { END, START, StateGraph } from "@langchain/langgraph";
import { BuildWorkflowStateAnnotation } from "../state/build";
import { makeAuditNode } from "../nodes/audit";
import { makeBuildDocumentationNode } from "../nodes/buildDocumentation";
import { makeBuildGenerateNode } from "../nodes/buildGenerate";
import { makeBuildRegistryNode } from "../nodes/buildRegistry";
import { makeBuildRouterNode } from "../nodes/router";
import { makeLivePreviewNode } from "../nodes/livePreview";
import { makePlannerNode } from "../nodes/planner";
import { makePublishNode } from "../nodes/publish";
import { makeResearchNode } from "../nodes/research";
import { makeUserReviewNode, routeFromUserReview } from "../nodes/userReview";
import type { GenerateGraphDeps } from "./deps";

/**
 * Component build workflow. Strictly sequential, one responsibility per agent:
 *   router → planner → research → generate → accessibility → responsive
 *   → performance → documentation → registry → live preview
 *   → user review (interrupt) → publish
 *
 * The review node is a human-in-the-loop `interrupt()`: the graph pauses with
 * the preview payload and resumes via `Command({ resume })` with an
 * approved/rejected/edited decision.
 */
export function buildBuildWorkflow(deps: GenerateGraphDeps) {
  const graph = new StateGraph(BuildWorkflowStateAnnotation)
    .addNode("router", makeBuildRouterNode())
    .addNode("planner", makePlannerNode(deps))
    .addNode("researchAgent", makeResearchNode(deps))
    .addNode("generate", makeBuildGenerateNode(deps))
    .addNode("accessibility", makeAuditNode(deps, "accessibility"))
    .addNode("responsive", makeAuditNode(deps, "responsive"))
    .addNode("performance", makeAuditNode(deps, "performance"))
    .addNode("documentation", makeBuildDocumentationNode(deps))
    .addNode("registryAgent", makeBuildRegistryNode(deps))
    .addNode("livePreview", makeLivePreviewNode(deps))
    .addNode("userReview", makeUserReviewNode())
    .addNode("publish", makePublishNode())
    .addEdge(START, "router")
    .addConditionalEdges("router", (state) => (state.error ? END : "planner"), {
      planner: "planner",
      end: END,
    })
    .addConditionalEdges("planner", (state) => (state.error ? END : "researchAgent"), {
      researchAgent: "researchAgent",
      end: END,
    })
    .addEdge("researchAgent", "generate")
    .addEdge("generate", "accessibility")
    .addEdge("accessibility", "responsive")
    .addEdge("responsive", "performance")
    .addEdge("performance", "documentation")
    .addEdge("documentation", "registryAgent")
    .addEdge("registryAgent", "livePreview")
    .addEdge("livePreview", "userReview")
    .addConditionalEdges("userReview", routeFromUserReview, {
      publish: "publish",
      end: END,
    })
    .addEdge("publish", END);

  return graph.compile({ checkpointer: deps.checkpointer });
}
