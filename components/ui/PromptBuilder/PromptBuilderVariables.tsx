"use client";

import { cn } from "@/lib/cn";
import type { PromptVariable } from "@/components/prompt-builder/templates";
import { Icon, ICON } from "./PromptBuilderToolbar";

interface PromptBuilderVariablesProps {
  variables: PromptVariable[];
  onUpdateVariable: (id: string, patch: Partial<PromptVariable>) => void;
  onRemoveVariable: (id: string) => void;
}

export function PromptBuilderVariables({
  variables,
  onUpdateVariable,
  onRemoveVariable,
}: PromptBuilderVariablesProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold tracking-tight">Variables</h3>
      </div>

      <div className="flex flex-col gap-2.5">
        {variables.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No variables yet. Add one and reference it with{" "}
            <code className="font-mono text-foreground">{"{{id}}"}</code>.
          </p>
        )}
        {variables.map((variable) => (
          <div
            key={variable.id}
            className="rounded-lg border border-border bg-background p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={variable.label}
                onChange={(e) =>
                  onUpdateVariable(variable.id, { label: e.target.value })
                }
                aria-label={`Label for ${variable.id}`}
                className="h-8 w-36 min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              />
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                {`{{${variable.id}}}`}
              </code>
              <button
                type="button"
                onClick={() =>
                  onUpdateVariable(variable.id, {
                    required: !variable.required,
                  })
                }
                aria-pressed={variable.required}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                  variable.required
                    ? "border-danger/40 bg-danger-soft text-danger"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {variable.required ? "Required" : "Optional"}
              </button>
              <button
                type="button"
                onClick={() => onRemoveVariable(variable.id)}
                aria-label={`Delete variable ${variable.label}`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
              >
                <Icon d={ICON.trash} className="h-3.5 w-3.5" />
              </button>
            </div>
            <input
              value={variable.value}
              onChange={(e) =>
                onUpdateVariable(variable.id, { value: e.target.value })
              }
              placeholder={variable.placeholder || `Value for ${variable.label}`}
              aria-label={`Value for ${variable.label}`}
              className="mt-2 h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
            />
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <input
                value={variable.placeholder ?? ""}
                onChange={(e) =>
                  onUpdateVariable(variable.id, {
                    placeholder: e.target.value,
                  })
                }
                placeholder="Placeholder (optional)"
                aria-label={`Placeholder for ${variable.label}`}
                className="h-7 w-full rounded-md border border-transparent bg-transparent px-2 text-xs text-muted-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-border focus:border-ring"
              />
              {variable.required && !variable.value.trim() && (
                <span className="shrink-0 text-[11px] font-medium text-danger">
                  Needs a value
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
