import { Command, isInterrupted } from "@langchain/langgraph";
import type { BuildState, ComponentRequest, UserReview } from "../state";
import type { UserReviewPayload } from "../nodes/userReview";
import { buildAutonomousWorkflow } from "../workflows/autonomous";
import type { GenerateGraphDeps } from "../workflows/deps";
import { PipelineEventBus } from "./events";
import { emitNodeEnds, captureInterrupt } from "./pipeline";

export interface AutonomousRunOptions {
  deps: GenerateGraphDeps;
  request: ComponentRequest;
  threadId: string;
}

export interface AutonomousRunResult {
  state: BuildState;
  interrupt?: UserReviewPayload;
}

const GRAPH_CONFIG = (threadId: string) => ({
  configurable: { thread_id: threadId },
});

/**
 * Runs the autonomous workflow for a thread. The supervisor DeepAgent
 * drives the full lifecycle; the graph pauses at the user-review
 * interrupt for human approval before publish.
 */
export async function runAutonomousWorkflow({
  deps,
  request,
  threadId,
}: AutonomousRunOptions): Promise<AutonomousRunResult> {
  const bus = deps.eventBus ?? new PipelineEventBus();
  bus.emit({ type: "start", threadId });

  const graph = buildAutonomousWorkflow(deps);
  const config = GRAPH_CONFIG(threadId);
  const stream = await graph.stream(
    { request, threadId, reviews: [], steps: [], attempts: 0 },
    { ...config, streamMode: "updates" }
  );

  let interrupt: UserReviewPayload | undefined;
  for await (const update of stream) {
    interrupt = captureInterrupt(bus, threadId, update) ?? interrupt;
    if (!isInterrupted(update)) emitNodeEnds(bus, threadId, update);
  }

  const state = (await graph.getState(config)).values as BuildState;
  if (interrupt) return { state, interrupt };

  bus.emit({ type: "done", threadId });
  return { state };
}

/** Resumes a paused autonomous workflow with the human's review decision. */
export async function resumeAutonomousWorkflow({
  deps,
  threadId,
  review,
}: {
  deps: GenerateGraphDeps;
  threadId: string;
  review: UserReview;
}): Promise<AutonomousRunResult> {
  const bus = deps.eventBus ?? new PipelineEventBus();
  const graph = buildAutonomousWorkflow(deps);
  const config = GRAPH_CONFIG(threadId);
  const stream = await graph.stream(new Command({ resume: review }), {
    ...config,
    streamMode: "updates",
  });

  let interrupt: UserReviewPayload | undefined;
  for await (const update of stream) {
    interrupt = captureInterrupt(bus, threadId, update) ?? interrupt;
    if (!isInterrupted(update)) emitNodeEnds(bus, threadId, update);
  }

  const state = (await graph.getState(config)).values as BuildState;
  if (interrupt) return { state, interrupt };

  bus.emit({ type: "done", threadId });
  return { state };
}
