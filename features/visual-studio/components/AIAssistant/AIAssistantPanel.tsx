"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import { useDesignAI } from "../../ai/useDesignAI";
import type { SuggestionType } from "../../ai/types";
import { SuggestionCard } from "./SuggestionCard";

const ANALYSIS_TYPES: Array<{ id: SuggestionType; label: string; icon: string }> = [
  { id: "spacing", label: "Spacing", icon: "📐" },
  { id: "typography", label: "Typography", icon: "🔤" },
  { id: "accessibility", label: "Accessibility", icon: "♿" },
  { id: "responsive", label: "Responsive", icon: "📱" },
  { id: "colors", label: "Colors", icon: "🎨" },
  { id: "dark-mode", label: "Dark Mode", icon: "🌙" },
  { id: "refactor", label: "Refactor", icon: "♻️" },
  { id: "explain", label: "Explain", icon: "💡" },
];

export function AIAssistantPanel() {
  const { canvas, updateNodeVisual, updateNodeResponsive } = useStudio();
  const { suggestions, score, summary, loading, error, analyze, explain, applySuggestion, dismissSuggestion, clearSuggestions } = useDesignAI(canvas.nodes);
  const [selectedTypes, setSelectedTypes] = useState<SuggestionType[]>(["spacing", "typography", "accessibility"]);
  const [explanation, setExplanation] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const selectedNodeId = canvas.selection.selectedIds[0];

  const toggleType = (type: SuggestionType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAnalyze = () => {
    analyze(selectedTypes, selectedNodeId);
    setShowExplanation(false);
  };

  const handleExplain = async () => {
    const result = await explain(selectedNodeId);
    setExplanation(result);
    setShowExplanation(true);
  };

  const handleApply = (suggestion: Parameters<typeof applySuggestion>[0]) => {
    const visualPatch = applySuggestion(suggestion);
    const targetId = suggestion.nodeId ?? selectedNodeId;
    if (targetId && visualPatch) {
      if (suggestion.type === "responsive" && "breakpoint" in suggestion) {
        const bp = (suggestion as { breakpoint: string }).breakpoint;
        updateNodeResponsive(targetId, bp as "sm" | "md" | "lg" | "xl" | "2xl", visualPatch);
      } else {
        updateNodeVisual(targetId, visualPatch);
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-xs font-medium">AI Design Assistant</span>
        </div>
        {suggestions.length > 0 && (
          <button onClick={clearSuggestions} className="text-[10px] text-muted-foreground hover:text-foreground">
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="mb-4">
          <div className="mb-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Analysis Types
          </div>
          <div className="flex flex-wrap gap-1">
            {ANALYSIS_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium transition-colors",
                  selectedTypes.includes(type.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <span>{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleAnalyze}
            disabled={loading || selectedTypes.length === 0}
            className="flex-1 rounded bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Design"}
          </button>
          <button
            onClick={handleExplain}
            disabled={loading}
            className="rounded bg-muted px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/80 disabled:opacity-50"
          >
            💡 Explain
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded border border-danger/20 bg-danger/5 p-3 text-xs text-danger">
            {error}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Suggestions ({suggestions.length})
              </span>
              <span className="text-[10px] text-muted-foreground">
                Score: {Math.round(score * 100)}%
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {suggestions.map((s) => (
                <SuggestionCard
                  key={s.id}
                  suggestion={s}
                  onApply={handleApply}
                  onDismiss={dismissSuggestion}
                />
              ))}
            </div>
          </div>
        )}

        {showExplanation && explanation && (
          <div className="rounded border border-border p-3">
            <div className="mb-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Design Explanation
            </div>
            <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
              {explanation}
            </div>
          </div>
        )}

        {!loading && suggestions.length === 0 && !showExplanation && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <div className="mb-2 text-3xl">🤖</div>
            <div className="text-sm">Select analysis types and click Analyze</div>
            <div className="mt-1 text-[10px]">or select a component for targeted suggestions</div>
          </div>
        )}
      </div>
    </div>
  );
}
