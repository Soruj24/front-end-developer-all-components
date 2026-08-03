import type { GateVerdict } from "../state";

/** Node-level lifecycle events emitted by a running pipeline. */
export type PipelineEvent =
  | { type: "start"; threadId: string }
  | { type: "node_end"; threadId: string; node: string }
  | { type: "gate"; threadId: string; verdict: GateVerdict; attempts: number }
  | { type: "approval_needed"; threadId: string; approvalId: string }
  | { type: "preview_ready"; threadId: string; slug: string }
  | { type: "error"; threadId: string; node: string; message: string }
  | { type: "done"; threadId: string };

export type PipelineEventHandler = (event: PipelineEvent) => void;

/** In-process event bus; route handlers bridge these to SSE. */
export class PipelineEventBus {
  private listeners = new Set<PipelineEventHandler>();

  subscribe(listener: PipelineEventHandler): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event: PipelineEvent): void {
    for (const listener of this.listeners) listener(event);
  }
}
