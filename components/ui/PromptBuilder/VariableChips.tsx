"use client";

import { cn } from "@/lib/cn";
import type { PromptVariable } from "@/components/prompt-builder/templates";
import { Icon, ICON } from "./PromptBuilderToolbar";

export function VariableChips({
  variables,
  onInsert,
}: {
  variables: PromptVariable[];
  onInsert: (id: string) => void;
}) {
  if (variables.length === 0) {
    return <span className="text-xs text-muted-foreground">Add variables to insert them as tokens.</span>;
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {variables.map((variable) => {
        const filled = Boolean(variable.value.trim());
        return (
          <button
            key={variable.id}
            type="button"
            onClick={() => onInsert(variable.id)}
            title={`Insert {{${variable.id}}}${filled ? ` (${variable.value})` : ""}`}
            className={cn(
              "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
              filled
                ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/10"
                : variable.required
                  ? "border-danger/40 bg-danger-soft/60 text-danger hover:bg-danger-soft"
                  : "border-warning/40 bg-warning-soft/60 text-warning hover:bg-warning-soft"
            )}
          >
            <Icon d={ICON.sparkles} className="h-3 w-3" />
            <span className="max-w-[8rem] truncate">{variable.label}</span>
            <code className="font-mono text-[10px] opacity-70">{`{{${variable.id}}}`}</code>
          </button>
        );
      })}
    </div>
  );
}
