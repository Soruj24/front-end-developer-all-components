import type { CanvasNode, VisualProps, ResponsiveBreakpoint } from "../types/canvas";

export type SuggestionType =
  | "spacing"
  | "typography"
  | "accessibility"
  | "responsive"
  | "colors"
  | "dark-mode"
  | "refactor"
  | "explain";

export interface DesignSuggestion {
  id: string;
  type: SuggestionType;
  title: string;
  description: string;
  nodeId?: string;
  before?: Partial<VisualProps>;
  after: Partial<VisualProps>;
  confidence: number;
  applyable: boolean;
  applied?: boolean;
}

export interface SpacingSuggestion extends DesignSuggestion {
  type: "spacing";
  padding?: Partial<{ top: number; right: number; bottom: number; left: number }>;
  margin?: Partial<{ top: number; right: number; bottom: number; left: number }>;
}

export interface TypographySuggestion extends DesignSuggestion {
  type: "typography";
  fontSize?: number;
  fontWeight?: string;
  lineHeight?: number;
  letterSpacing?: number;
}

export interface AccessibilitySuggestion extends DesignSuggestion {
  type: "accessibility";
  issue: string;
  severity: "error" | "warning" | "info";
  fix?: string;
}

export interface ResponsiveSuggestion extends DesignSuggestion {
  type: "responsive";
  breakpoint: ResponsiveBreakpoint;
  overrides: Partial<VisualProps>;
}

export interface ColorSuggestion extends DesignSuggestion {
  type: "colors";
  palette: string[];
  rationale: string;
}

export interface DarkModeSuggestion extends DesignSuggestion {
  type: "dark-mode";
  darkOverrides: Partial<VisualProps>;
  lightOverrides?: Partial<VisualProps>;
}

export interface RefactorSuggestion extends DesignSuggestion {
  type: "refactor";
  originalCode: string;
  refactoredCode: string;
  changes: string[];
}

export interface ExplainSuggestion extends DesignSuggestion {
  type: "explain";
  explanation: string;
  principles: string[];
}

export interface AIAnalysisResult {
  suggestions: DesignSuggestion[];
  score: number;
  summary: string;
}

export interface DesignAIRequest {
  nodes: Record<string, CanvasNode>;
  type: SuggestionType[];
  selectedNodeId?: string;
}

export interface DesignAIResponse {
  ok: boolean;
  data?: AIAnalysisResult;
  error?: string;
}
