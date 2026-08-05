import type { CanvasNode, VisualProps } from "../types/canvas";
import type {
  SuggestionType, DesignSuggestion, AIAnalysisResult,
  SpacingSuggestion, TypographySuggestion, AccessibilitySuggestion,
  ResponsiveSuggestion, ColorSuggestion, DarkModeSuggestion,
  RefactorSuggestion, ExplainSuggestion,
} from "./types";
import {
  buildSpacingPrompt, buildTypographyPrompt, buildAccessibilityPrompt,
  buildResponsivePrompt, buildColorPrompt, buildDarkModePrompt,
  buildRefactorPrompt, buildExplainPrompt,
} from "./prompts";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

async function callAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not configured");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function parseJSON<T>(text: string): T {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  const raw = jsonMatch ? jsonMatch[1] : text;
  try {
    return JSON.parse(raw);
  } catch {
    return JSON.parse(raw.replace(/[\n\r]/g, ""));
  }
}

function generateId(): string {
  return `sug_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function buildPrompt(type: SuggestionType, nodes: Record<string, CanvasNode>, nodeId?: string): string {
  switch (type) {
    case "spacing": return buildSpacingPrompt(nodes, nodeId);
    case "typography": return buildTypographyPrompt(nodes, nodeId);
    case "accessibility": return buildAccessibilityPrompt(nodes, nodeId);
    case "responsive": return buildResponsivePrompt(nodes, nodeId);
    case "colors": return buildColorPrompt(nodes, nodeId);
    case "dark-mode": return buildDarkModePrompt(nodes, nodeId);
    case "refactor": return buildRefactorPrompt(nodes, nodeId);
    case "explain": return buildExplainPrompt(nodes, nodeId);
  }
}

function mapResponse(type: SuggestionType, raw: unknown[]): DesignSuggestion[] {
  return raw.map((item) => {
    const record = item as Record<string, unknown>;
    const base: DesignSuggestion = {
      id: generateId(),
      type,
      title: String(record.title ?? "Suggestion"),
      description: String(record.description ?? ""),
      nodeId: record.nodeId as string | undefined,
      after: (record.after as Partial<VisualProps>) ?? {},
      confidence: Number(record.confidence ?? 0.8),
      applyable: true,
    };

    switch (type) {
      case "spacing":
        return { ...base, type: "spacing", padding: record.padding as SpacingSuggestion["padding"], margin: record.margin as SpacingSuggestion["margin"] } as SpacingSuggestion;
      case "typography":
        return { ...base, type: "typography", fontSize: record.fontSize as number, fontWeight: record.fontWeight as string, lineHeight: record.lineHeight as number } as TypographySuggestion;
      case "accessibility":
        return { ...base, type: "accessibility", issue: String(record.issue ?? ""), severity: (record.severity as "error" | "warning" | "info") ?? "warning", fix: record.fix as string } as AccessibilitySuggestion;
      case "responsive":
        return { ...base, type: "responsive", breakpoint: record.breakpoint as ResponsiveSuggestion["breakpoint"], overrides: record.overrides as Partial<VisualProps> } as ResponsiveSuggestion;
      case "colors":
        return { ...base, type: "colors", palette: (record.palette as string[]) ?? [], rationale: String(record.rationale ?? "") } as ColorSuggestion;
      case "dark-mode":
        return { ...base, type: "dark-mode", darkOverrides: record.darkOverrides as Partial<VisualProps> } as DarkModeSuggestion;
      case "refactor":
        return { ...base, type: "refactor", originalCode: String(record.originalCode ?? ""), refactoredCode: String(record.refactoredCode ?? ""), changes: (record.changes as string[]) ?? [] } as RefactorSuggestion;
      case "explain":
        return { ...base, type: "explain", explanation: String(record.explanation ?? ""), principles: (record.principles as string[]) ?? [] } as ExplainSuggestion;
      default:
        return base;
    }
  });
}

export async function analyzeDesign(
  nodes: Record<string, CanvasNode>,
  types: SuggestionType[],
  selectedNodeId?: string
): Promise<AIAnalysisResult> {
  const allSuggestions: DesignSuggestion[] = [];

  for (const type of types) {
    try {
      const prompt = buildPrompt(type, nodes, selectedNodeId);
      const response = await callAI(prompt);
      const parsed = parseJSON<unknown[]>(response);
      const suggestions = mapResponse(type, parsed);
      allSuggestions.push(...suggestions);
    } catch {
      continue;
    }
  }

  const score = allSuggestions.length > 0
    ? allSuggestions.reduce((sum, s) => sum + s.confidence, 0) / allSuggestions.length
    : 1;

  return {
    suggestions: allSuggestions,
    score: Math.round(score * 100) / 100,
    summary: `Found ${allSuggestions.length} suggestion(s) across ${types.length} category(ies).`,
  };
}

export async function explainDesign(
  nodes: Record<string, CanvasNode>,
  nodeId?: string
): Promise<string> {
  const prompt = buildExplainPrompt(nodes, nodeId);
  const response = await callAI(prompt);
  const parsed = parseJSON<{ explanation: string }[]>(response);
  return parsed.map((p) => p.explanation).join("\n\n");
}
