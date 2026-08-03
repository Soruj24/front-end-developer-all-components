import { z } from "zod";
import type { AiToolDefinition } from "../../../types";
import type { GenerateGraphDeps } from "../../workflows/deps";
import { createAgentToolRegistry } from "../registryTools";
import type { AgentId } from "../../agents/catalog";
import { runAgent } from "../../nodes/runAgent";
import { parseBuildPlan } from "../../nodes/planner";
import { parseArtifact } from "../../nodes/generate";
import { parseReviewReport } from "../../nodes/review";
import { parseDocumentation } from "../../nodes/documentation";

function narrow(deps: GenerateGraphDeps): GenerateGraphDeps {
  return { ...deps, tools: createAgentToolRegistry() };
}

function runNarrow(
  deps: GenerateGraphDeps,
  agentId: AgentId,
  human: string,
  context?: string
): Promise<string> {
  return runAgent(narrow(deps), agentId, human, { context });
}

export function makeUnderstandIntentTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "understand_intent",
    description:
      "Parse a user request into a structured build intent: component name, category, requirements, and target dependencies.",
    schema: z.object({ prompt: z.string().min(1), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { prompt, context } = args as { prompt: string; context?: string };
      const text = await runNarrow(deps, "planner", prompt, context);
      const plan = parseBuildPlan(text);
      if (!plan) return { ok: false, error: "Planner produced invalid output." };
      return { ok: true, plan };
    },
  };
}

export function makePlanSubtasksTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "plan_subtasks",
    description:
      "Break a build goal into ordered subtasks with status tracking. Derives a concrete plan and maps each step to a tool.",
    schema: z.object({ goal: z.string().min(1), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { goal, context } = args as { goal: string; context?: string };
      const text = await runNarrow(deps, "planner", goal, context);
      const plan = parseBuildPlan(text);
      if (!plan) return { ok: false, error: "Planner produced invalid output." };
      const subtasks = [
        { id: "research", title: `Research similar components for ${plan.componentName}`, tool: "search_components", status: "pending" as const },
        { id: "generate", title: `Generate ${plan.componentName}`, tool: "generate_component", status: "pending" as const },
        { id: "fix", title: "Fix errors from review", tool: "fix_errors", status: "pending" as const },
        { id: "accessibility", title: "Audit accessibility (WCAG)", tool: "audit_accessibility", status: "pending" as const },
        { id: "tailwind", title: "Optimize Tailwind classes", tool: "optimize_tailwind", status: "pending" as const },
        { id: "docs", title: "Write documentation", tool: "generate_docs", status: "pending" as const },
        { id: "publish", title: "Request approval and publish", tool: "request_approval", status: "pending" as const },
      ];
      return { ok: true, plan, subtasks };
    },
  };
}

export function makeGenerateComponentTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "generate_component",
    description:
      "Generate a complete React + Tailwind component artifact from a user request. Returns name, description, category, tags, source, and dependencies.",
    schema: z.object({ request: z.string().min(1), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { request, context } = args as { request: string; context?: string };
      const text = await runNarrow(deps, "componentGenerator", request, context);
      const artifact = parseArtifact(text);
      if (!artifact) return { ok: false, error: "Generator produced invalid output (expected a ```json block)." };
      return { ok: true, artifact };
    },
  };
}

export function makeFixErrorsTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "fix_errors",
    description:
      "Apply review feedback to a component source and return a corrected ComponentArtifact. Provide the source and the error/feedback.",
    schema: z.object({ source: z.string().min(1), error: z.string().min(1), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { source, error, context } = args as { source: string; error: string; context?: string };
      const human = `Fix these errors in the component:\n${error}\n\nSource:\n${source}`;
      const text = await runNarrow(deps, "refactor", human, context);
      const artifact = parseArtifact(text);
      if (!artifact) return { ok: false, error: "Refactor produced invalid output (expected a ```json block)." };
      return { ok: true, artifact };
    },
  };
}

export function makeAuditAccessibilityTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "audit_accessibility",
    description:
      "Audit component source against WCAG 2.1: semantic markup, keyboard support, focus management, contrast, ARIA. Returns a ReviewReport.",
    schema: z.object({ source: z.string().min(1), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { source, context } = args as { source: string; context?: string };
      const text = await runNarrow(deps, "accessibility", source, context);
      const report = parseReviewReport(text, "accessibility");
      if (!report) return { ok: false, error: "Accessibility audit produced invalid output." };
      return { ok: true, report };
    },
  };
}

export function makeOptimizeTailwindTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "optimize_tailwind",
    description:
      "Optimize Tailwind classes in the component source: remove unused utilities, consolidate responsive variants, and align with design tokens. Returns an updated ComponentArtifact.",
    schema: z.object({ source: z.string().min(1), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { source, context } = args as { source: string; context?: string };
      const human = `Optimize the Tailwind classes in this component for correctness and consistency:\n\n${source}`;
      const text = await runNarrow(deps, "refactor", human, context);
      const artifact = parseArtifact(text);
      if (!artifact) return { ok: false, error: "Tailwind optimizer produced invalid output (expected a ```json block)." };
      return { ok: true, artifact };
    },
  };
}

export function makeGenerateDocsTool(deps: GenerateGraphDeps): AiToolDefinition {
  return {
    name: "generate_docs",
    description:
      "Generate README, props table, and usage documentation for a component from its source. Returns a DocumentationArtifact.",
    schema: z.object({ source: z.string().min(1), name: z.string().optional(), context: z.string().optional() }),
    handler: async (args: unknown) => {
      const { source, name, context } = args as { source: string; name?: string; context?: string };
      const human = source;
      const docContext = name ? `Component: ${name}` : context ?? "";
      const text = await runNarrow(deps, "documentation", human, docContext);
      const docs = parseDocumentation(text);
      if (!docs) return { ok: false, error: "Documentation agent produced invalid output." };
      return { ok: true, docs };
    },
  };
}
