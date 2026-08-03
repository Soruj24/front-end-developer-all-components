export type ApprovalStage = "publish" | "refactor_apply";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "superseded";

export type ApprovalDecision = "approve" | "reject" | "edit";

/** A human-in-the-loop approval captured at a graph interrupt. */
export interface ApprovalRequest {
  id: string;
  threadId: string;
  stage: ApprovalStage;
  status: ApprovalStatus;
  summary: string;
  createdAt: number;
  decidedAt?: number;
  decision?: ApprovalDecision;
  feedback?: string;
}
