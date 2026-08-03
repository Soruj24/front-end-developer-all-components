import { Command, isInterrupted } from "@langchain/langgraph";
import type { BuildState, ComponentRequest, GenerateState, UserReview } from "../state";
import type { UserReviewPayload } from "../nodes/userReview";
import { buildBuildWorkflow } from "../workflows/build";
import { buildGenerateGraph } from "../workflows/generate";
import type { GenerateGraphDeps } from "../workflows/deps";
import { PipelineEventBus } from "./events";

export interface PipelineRunOptions {
  deps: GenerateGraphDeps;
  request: ComponentRequest;
  threadId: string;
}

const GRAPH_CONFIG = (threadId: string) => ({ configurable: { thread_id: threadId } });

/**
 * Runs the generation pipeline for a thread, emitting node-level events.
 * Phase 0 is synchronous within the request; Phase 4 moves this to a queue and
 * streams events over SSE.
 */
export async function runGeneratePipeline({
  deps,
  request,
  threadId,
}: PipelineRunOptions): Promise<GenerateState> {
  const bus = deps.eventBus ?? new PipelineEventBus();
  bus.emit({ type: "start", threadId });

  const graph = buildGenerateGraph(deps);
  const config = GRAPH_CONFIG(threadId);

  try {
    const stream = await graph.stream(
      { request, threadId, attempts: 0 },
      { ...config, streamMode: "updates" }
    );
    for await (const update of stream) {
      for (const nodeName of Object.keys(update)) {
        bus.emit({ type: "node_end", threadId, node: nodeName });
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    bus.emit({ type: "error", threadId, node: "pipeline", message });
    throw error;
  }

  const state = (await graph.getState(config)).values as GenerateState;
  if (state.gate) {
    bus.emit({
      type: "gate",
      threadId,
      verdict: state.gate.verdict,
      attempts: state.gate.attempts,
    });
  }
  bus.emit({ type: "done", threadId });
  return state;
}

export interface BuildWorkflowRunOptions {
  deps: GenerateGraphDeps;
  request: ComponentRequest;
  threadId: string;
}

export interface BuildWorkflowResult {
  state: BuildState;
  interrupt?: UserReviewPayload;
}

function emitNodeEnds(
  bus: PipelineEventBus,
  threadId: string,
  update: Record<string, unknown>
): void {
  for (const nodeName of Object.keys(update)) {
    if (nodeName === "__interrupt__") continue;
    bus.emit({ type: "node_end", threadId, node: nodeName });
  }
}

/** Captures a review interrupt from a stream update, emitting approval_needed. */
function captureInterrupt(
  bus: PipelineEventBus,
  threadId: string,
  update: unknown
): UserReviewPayload | undefined {
  if (!isInterrupted(update)) return undefined;
  const first = update.__interrupt__[0];
  if (first?.id) {
    bus.emit({ type: "approval_needed", threadId, approvalId: first.id });
  }
  return first?.value as UserReviewPayload | undefined;
}

/**
 * Runs the build workflow. The graph pauses at the user review interrupt;
 * the resulting state plus the review payload are returned to the caller so
 * the client can render a live preview and ask for a decision.
 */
export async function runBuildWorkflow({
  deps,
  request,
  threadId,
}: BuildWorkflowRunOptions): Promise<BuildWorkflowResult> {
  const bus = deps.eventBus ?? new PipelineEventBus();
  bus.emit({ type: "start", threadId });

  const graph = buildBuildWorkflow(deps);
  const config = GRAPH_CONFIG(threadId);
  const stream = await graph.stream(
    { request, threadId, reviews: [], attempts: 0 },
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

/** Resumes a paused build workflow with the human's review decision. */
export async function resumeBuildWorkflow({
  deps,
  threadId,
  review,
}: {
  deps: GenerateGraphDeps;
  threadId: string;
  review: UserReview;
}): Promise<BuildWorkflowResult> {
  const bus = deps.eventBus ?? new PipelineEventBus();
  const graph = buildBuildWorkflow(deps);
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
