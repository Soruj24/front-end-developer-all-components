import type { GenerateGraphDeps } from "../../workflows/deps";
import type { AiToolDefinition } from "../../../types";
import { ApprovalService } from "../../approval";
import { makeUnderstandIntentTool, makePlanSubtasksTool, makeGenerateComponentTool, makeFixErrorsTool, makeAuditAccessibilityTool, makeOptimizeTailwindTool, makeGenerateDocsTool } from "./model";
import { makePublishComponentTool, makeRollbackComponentTool, makeRequestApprovalTool } from "./actions";

export interface CapabilityToolOptions {
  approvalService?: ApprovalService;
}

export function createCapabilityTools(
  deps: GenerateGraphDeps,
  options: CapabilityToolOptions = {}
): AiToolDefinition[] {
  const approvalService = options.approvalService ?? new ApprovalService();
  return [
    makeUnderstandIntentTool(deps),
    makePlanSubtasksTool(deps),
    makeGenerateComponentTool(deps),
    makeFixErrorsTool(deps),
    makeAuditAccessibilityTool(deps),
    makeOptimizeTailwindTool(deps),
    makeGenerateDocsTool(deps),
    makePublishComponentTool(approvalService),
    makeRollbackComponentTool(),
    makeRequestApprovalTool(approvalService),
  ];
}
