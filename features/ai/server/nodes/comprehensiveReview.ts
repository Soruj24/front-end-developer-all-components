import type { ComprehensiveReview, GenerateState, ReviewDimension } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface ComprehensiveReviewOutput {
  qualityScore?: number;
  warnings?: Array<{
    dimension?: string;
    severity?: string;
    message?: string;
    line?: number;
  }>;
  suggestions?: Array<{
    dimension?: string;
    description?: string;
    priority?: string;
  }>;
  autoFixes?: Array<{
    dimension?: string;
    description?: string;
    code?: string;
  }>;
  report?: string;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function normalizeSeverity(sev: string): "error" | "warn" {
  return sev === "warn" ? "warn" : "error";
}

function normalizeDimension(dim: string): ReviewDimension {
  const map: Record<string, ReviewDimension> = {
    "code-quality": "code-quality",
    typescript: "typescript",
    tailwind: "tailwind",
    accessibility: "accessibility",
    responsive: "responsive",
    performance: "performance",
    seo: "seo",
    reusability: "reusability",
    maintainability: "maintainability",
  };
  return map[dim.toLowerCase()] ?? "code-quality";
}

/** Validates parsed output into a ComprehensiveReview. */
export function parseComprehensiveReview(
  text: string
): ComprehensiveReview | null {
  const parsed = parseJsonObject<ComprehensiveReviewOutput>(text);
  if (!parsed || typeof parsed.qualityScore !== "number") return null;

  const warnings: ComprehensiveReview["warnings"] = (
    parsed.warnings ?? []
  ).map((w) => ({
    dimension: normalizeDimension(w.dimension ?? "code-quality"),
    severity: normalizeSeverity(w.severity ?? "error"),
    message: w.message ?? "Unspecified issue.",
    line: w.line,
  }));

  const suggestions: ComprehensiveReview["suggestions"] = (
    parsed.suggestions ?? []
  ).map((s) => ({
    dimension: normalizeDimension(s.dimension ?? "code-quality"),
    description: s.description ?? "",
    priority: (s.priority as "high" | "medium" | "low") ?? "medium",
  }));

  const autoFixes: ComprehensiveReview["autoFixes"] = (
    parsed.autoFixes ?? []
  ).map((f) => ({
    dimension: normalizeDimension(f.dimension ?? "code-quality"),
    description: f.description ?? "",
    code: f.code ?? "",
  }));

  return {
    qualityScore: clampScore(parsed.qualityScore),
    warnings,
    suggestions,
    autoFixes,
    report: parsed.report ?? "",
  };
}

/** Runs the Component Reviewer agent and returns a comprehensive review. */
export function makeComprehensiveReviewNode(deps: GenerateGraphDeps) {
  return async function comprehensiveReviewNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    if (!state.artifact) return {};

    const text = await runAgent(deps, "componentReviewer", state.artifact.source, {
      context: `Request: ${state.request.prompt}`,
    });

    const review = parseComprehensiveReview(text);
    if (!review) {
      return {
        error: "Reviewer produced invalid output (expected a ```json block).",
      };
    }
    return { comprehensiveReview: review };
  };
}
