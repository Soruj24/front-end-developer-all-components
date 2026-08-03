import { uid } from "@/features/ai";
import type {
  ApprovalDecision,
  ApprovalRequest,
  ApprovalStage,
} from "./types";

export interface ApprovalStore {
  save(request: ApprovalRequest): Promise<void>;
  get(id: string): Promise<ApprovalRequest | undefined>;
  update(id: string, patch: Partial<ApprovalRequest>): Promise<ApprovalRequest | undefined>;
  listByThread(threadId: string): Promise<ApprovalRequest[]>;
}

export class InMemoryApprovalStore implements ApprovalStore {
  private requests = new Map<string, ApprovalRequest>();

  async save(request: ApprovalRequest): Promise<void> {
    this.requests.set(request.id, request);
  }

  async get(id: string): Promise<ApprovalRequest | undefined> {
    return this.requests.get(id);
  }

  async update(
    id: string,
    patch: Partial<ApprovalRequest>
  ): Promise<ApprovalRequest | undefined> {
    const current = this.requests.get(id);
    if (!current) return undefined;
    const next = { ...current, ...patch };
    this.requests.set(id, next);
    return next;
  }

  async listByThread(threadId: string): Promise<ApprovalRequest[]> {
    return [...this.requests.values()]
      .filter((request) => request.threadId === threadId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
}

/**
 * Tracks approval requests for graph interrupts. Phase 4 wires `decide` to the
 * graph's resume command for the matching thread.
 */
export class ApprovalService {
  constructor(private store: ApprovalStore = new InMemoryApprovalStore()) {}

  async request(
    threadId: string,
    stage: ApprovalStage,
    summary: string
  ): Promise<ApprovalRequest> {
    const request: ApprovalRequest = {
      id: uid("approval"),
      threadId,
      stage,
      status: "pending",
      summary,
      createdAt: Date.now(),
    };
    await this.store.save(request);
    return request;
  }

  async decide(
    id: string,
    decision: ApprovalDecision,
    feedback?: string
  ): Promise<ApprovalRequest> {
    const current = await this.store.get(id);
    if (!current) throw new Error(`Unknown approval request: ${id}`);
    const decided: ApprovalRequest = {
      ...current,
      status: decision === "approve" ? "approved" : "rejected",
      decision,
      feedback,
      decidedAt: Date.now(),
    };
    await this.store.save(decided);
    return decided;
  }

  async pendingFor(threadId: string): Promise<ApprovalRequest[]> {
    const all = await this.store.listByThread(threadId);
    return all.filter((request) => request.status === "pending");
  }

  /** Reads a single request; undefined when the id is unknown. */
  async get(id: string): Promise<ApprovalRequest | undefined> {
    return this.store.get(id);
  }
}
