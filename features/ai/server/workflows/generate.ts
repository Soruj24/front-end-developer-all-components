import { END, START, StateGraph } from "@langchain/langgraph";
import { GenerateStateAnnotation } from "../state";
import { fanOutReviews, makeReviewFanoutNode } from "../nodes/fanout";
import { makeDocumentationNode } from "../nodes/documentation";
import { makeGenerateNode } from "../nodes/generate";
import { makeRegistryAgentNode } from "../nodes/registryAgent";
import { makeRefactorNode } from "../nodes/refactor";
import { makeReviewNode } from "../nodes/review";
import { makeRouterNode } from "../nodes/router";
import { makeSaveDraftNode } from "../nodes/saveDraft";
import { makeSearchIndexNode } from "../nodes/searchIndex";
import { makeSeoNode } from "../nodes/seo";
import { makeSynthesisGateNode, routeFromGate } from "../nodes/gate";
import { makeReviewSynthesisNode, routeFromSynthesis } from "../nodes/synthesis";
import { makeTestingNode, routeFromTesting } from "../nodes/testing";
import { makeVersionManagerNode } from "../nodes/versionManager";
import type { GenerateGraphDeps } from "./deps";

/**
 * Generation pipeline (Phase 3):
 *   router → generate → gate → parallel review fan-out (Send)
 *   → synthesis join → (refactor loop | testing)
 *   → documentation → seo → registry agent → version manager
 *   → save draft → search index
 *
 * Bounded retry loops: the gate re-generates when no artifact exists; the
 * synthesis join sends failing reviews through the Refactor Agent. Docs/SEO
 * are best-effort. Phase 4 adds approval + publish.
 */
export function buildGenerateGraph(deps: GenerateGraphDeps) {
  const graph = new StateGraph(GenerateStateAnnotation)
    .addNode("router", makeRouterNode())
    .addNode("generate", makeGenerateNode(deps))
    .addNode("artifactGate", makeSynthesisGateNode())
    .addNode("reviewFanout", makeReviewFanoutNode())
    .addNode("review", makeReviewNode(deps))
    .addNode("synthesisGate", makeReviewSynthesisNode())
    .addNode("refactor", makeRefactorNode(deps))
    .addNode("testing", makeTestingNode(deps))
    .addNode("documentation", makeDocumentationNode(deps))
    .addNode("seoWriter", makeSeoNode(deps))
    .addNode("registryAgent", makeRegistryAgentNode(deps))
    .addNode("versionManager", makeVersionManagerNode(deps))
    .addNode("saveDraft", makeSaveDraftNode())
    .addNode("searchIndexer", makeSearchIndexNode(deps))
    .addEdge(START, "router")
    .addConditionalEdges("router", (state) => (state.error ? END : "generate"), {
      generate: "generate",
      end: END,
    })
    .addEdge("generate", "artifactGate")
    .addConditionalEdges("artifactGate", routeFromGate, {
      retry: "generate",
      handoff: END,
      pass: "reviewFanout",
    })
    .addConditionalEdges("reviewFanout", fanOutReviews, {
      review: "review",
    })
    .addEdge("review", "synthesisGate")
    .addConditionalEdges("synthesisGate", routeFromSynthesis, {
      refactor: "refactor",
      handoff: END,
      testing: "testing",
    })
    .addEdge("refactor", "reviewFanout")
    .addConditionalEdges("testing", routeFromTesting, {
      refactor: "refactor",
      documentation: "documentation",
    })
    .addEdge("documentation", "seoWriter")
    .addEdge("seoWriter", "registryAgent")
    .addEdge("registryAgent", "versionManager")
    .addEdge("versionManager", "saveDraft")
    .addEdge("saveDraft", "searchIndexer")
    .addEdge("searchIndexer", END);

  return graph.compile({ checkpointer: deps.checkpointer });
}
