"use client";

import { cn } from "@/lib/cn";
import type { DesignSuggestion } from "../../ai/types";

const TYPE_ICONS: Record<string, string> = {
  spacing: "📐",
  typography: "🔤",
  accessibility: "♿",
  responsive: "📱",
  colors: "🎨",
  "dark-mode": "🌙",
  refactor: "♻️",
  explain: "💡",
};

const TYPE_LABELS: Record<string, string> = {
  spacing: "Spacing",
  typography: "Typography",
  accessibility: "Accessibility",
  responsive: "Responsive",
  colors: "Colors",
  "dark-mode": "Dark Mode",
  refactor: "Refactor",
  explain: "Explain",
};

interface Props {
  suggestion: DesignSuggestion;
  onApply: (suggestion: DesignSuggestion) => void;
  onDismiss: (id: string) => void;
}

export function SuggestionCard({ suggestion, onApply, onDismiss }: Props) {
  const icon = TYPE_ICONS[suggestion.type] ?? "💡";
  const label = TYPE_LABELS[suggestion.type] ?? suggestion.type;

  return (
    <div
      className={cn(
        "rounded-lg border border-border p-3 transition-colors",
        suggestion.applied && "bg-success/5 border-success/20"
      )}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <span className="text-[10px] text-muted-foreground">
              {Math.round(suggestion.confidence * 100)}%
            </span>
          </div>
          <h4 className="text-sm font-medium text-foreground mt-1">{suggestion.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>

          {suggestion.type === "accessibility" && "issue" in suggestion && (
            <div className="mt-2 rounded bg-warning/10 px-2 py-1 text-[10px] text-warning">
              {(suggestion as { issue: string }).issue}
            </div>
          )}

          {suggestion.type === "explain" && "explanation" in suggestion && (
            <div className="mt-2 text-xs text-foreground/80 leading-relaxed">
              {(suggestion as { explanation: string }).explanation.slice(0, 200)}...
            </div>
          )}

          {suggestion.type === "colors" && "palette" in suggestion && (
            <div className="mt-2 flex gap-1">
              {((suggestion as { palette: string[] }).palette ?? []).slice(0, 5).map((color: string) => (
                <div
                  key={color}
                  className="h-6 w-6 rounded border border-border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {suggestion.applyable && !suggestion.applied && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onApply(suggestion)}
            className="rounded bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Apply
          </button>
          <button
            onClick={() => onDismiss(suggestion.id)}
            className="rounded px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
          >
            Dismiss
          </button>
        </div>
      )}

      {suggestion.applied && (
        <div className="mt-2 text-[10px] text-success font-medium">✓ Applied</div>
      )}
    </div>
  );
}
