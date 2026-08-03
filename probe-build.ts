import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { createCheckpointer } from "./features/ai/server/checkpoints";
import { runBuildWorkflow, resumeBuildWorkflow } from "./features/ai/server/jobs/pipeline";
import { createGenerateGraphDeps } from "./features/ai/server/workflows/deps";
import { createAgentToolRegistry } from "./features/ai/server/tools";

const json = (obj: unknown) => `\`\`\`json\n${JSON.stringify(obj)}\n\`\`\``;

const planner = json({
  componentName: "RatingStars",
  category: "components",
  requirements: ["Render 1-5 stars", "Accessible labels"],
  targetDependencies: ["react"],
});
const research = json({
  similarComponents: [{ slug: "rating", name: "Rating" }],
  conventions: ["prefer semantic buttons"],
  recommendations: "reuse Rating patterns",
});
const artifact = json({
  name: "RatingStars",
  description: "A star rating component",
  category: "components",
  tags: ["rating", "stars"],
  source: "export function RatingStars() { return <div>stars</div>; }",
  dependencies: ["react"],
});
const auditPass = json({ passed: true, summary: "ok", issues: [] });
const docs = json({ readme: "# RatingStars", props: "| name |", usage: "<RatingStars />" });
const registry = json({ name: "RatingStars", description: "desc", category: "components", tags: ["rating"] });

const responses = [planner, research, artifact, auditPass, auditPass, auditPass, docs, registry];
let call = 0;

const fakeModel = {
  getName: () => "fake-model",
  bindTools: () => fakeModel,
  bind: () => fakeModel,
  invoke: async () => ({ content: responses[call++] ?? json({}) }),
  stream: async function* () {},
} as unknown as BaseChatModel;

async function main() {
  const deps = createGenerateGraphDeps({
    registry: { resolve: () => ({ model: fakeModel }) } as never,
    tools: createAgentToolRegistry(),
    checkpointer: createCheckpointer(),
  });

  const first = await runBuildWorkflow({
    deps,
    request: { prompt: "Build a star rating component" },
    threadId: "t1",
  });
  console.log("INTERRUPTED?", !!first.interrupt);
  console.log("INTERRUPT_SLUG", first.interrupt?.preview?.slug);
  console.log("HAS_PREVIEW", !!first.state.preview);
  console.log("REVIEWS", first.state.reviews.length);

  const resumed = await resumeBuildWorkflow({
    deps,
    threadId: "t1",
    review: { decision: "approved", feedback: "looks good" },
  });
  console.log("REVIEW_DECISION", resumed.state.review?.decision);
  console.log("PUBLISH_ERROR?", resumed.state.error ?? "none");
  console.log("DONE");
}

main().catch((e) => {
  console.error("FAILED", e);
  process.exit(1);
});
