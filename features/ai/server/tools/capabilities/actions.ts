import { z } from "zod";
import type { AiToolDefinition } from "../../../types";
import { createComponent, deleteComponent } from "@/features/registry/server/service";
import { ApprovalService } from "../../approval";
import type { ApprovalStage } from "../../approval";

function errMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export function makePublishComponentTool(approvalService: ApprovalService): AiToolDefinition {
  return {
    name: "publish_component",
    description:
      "Publish a component to the registry. Requires an approved approvalId from request_approval. Destructive action — approval is enforced before persisting.",
    schema: z.object({
      approvalId: z.string().min(1),
      slug: z.string().min(1),
      name: z.string().min(1),
      description: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      version: z.string().optional(),
      dependencies: z.array(z.string()).optional(),
      source: z.string().min(1),
      usage: z.string().optional(),
    }),
    handler: async (args: unknown) => {
      const { approvalId, slug, name, description, category, tags, version, dependencies, source, usage } =
        args as {
          approvalId: string;
          slug: string;
          name: string;
          description?: string;
          category?: string;
          tags?: string[];
          version?: string;
          dependencies?: string[];
          source: string;
          usage?: string;
        };
      try {
        const approval = await approvalService.get(approvalId);
        if (!approval || approval.status !== "approved") {
          return { ok: false, error: "Approval required: call request_approval first and wait for approval." };
        }
        const created = await createComponent({
          slug,
          name,
          description,
          category,
          tags,
          version: version ?? "1.0.0",
          dependencies: dependencies ?? ["react"],
          source,
          code: source,
          usage,
          publishStatus: "published",
        });
        return { ok: true, published: { componentId: created.id, slug, version: created.version ?? "1.0.0" } };
      } catch (e) {
        return { ok: false, error: errMessage(e) };
      }
    },
  };
}

export function makeRollbackComponentTool(): AiToolDefinition {
  return {
    name: "rollback_component",
    description:
      "Roll back a component by soft-deleting it from the registry. Use when a publish fails or a destructive action needs to be undone.",
    schema: z.object({ componentId: z.string().min(1) }),
    handler: async (args: unknown) => {
      const { componentId } = args as { componentId: string };
      try {
        await deleteComponent(componentId);
        return { ok: true, rolledBack: componentId };
      } catch (e) {
        return { ok: false, error: errMessage(e) };
      }
    },
  };
}

export function makeRequestApprovalTool(approvalService: ApprovalService): AiToolDefinition {
  return {
    name: "request_approval",
    description:
      "Request human approval before a destructive action (publish, refactor_apply). Returns an approvalId that must be approved before publish_component will succeed.",
    schema: z.object({
      threadId: z.string().min(1),
      stage: z.enum(["publish", "refactor_apply"]),
      summary: z.string().min(1),
    }),
    handler: async (args: unknown) => {
      const { threadId, stage, summary } = args as { threadId: string; stage: ApprovalStage; summary: string };
      const request = await approvalService.request(threadId, stage, summary);
      return { ok: true, approval: { id: request.id, status: request.status, stage } };
    },
  };
}
