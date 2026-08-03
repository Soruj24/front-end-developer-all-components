"use client";

import type { ReactNode } from "react";
import type { Breakpoint, FieldDef, Values } from "../types";
import { DEFAULT_BREAKPOINTS } from "../constants";
import { usePropsEditor } from "../hooks/usePropsEditor";
import { usePresets } from "../hooks/usePresets";
import { ControlRow } from "./ControlRow";
import { PresetMenu } from "./PresetMenu";

export interface VisualPropsEditorProps {
  schema: FieldDef[];
  defaultValues?: Values;
  breakpoints?: Breakpoint[];
  preview: (values: Values) => ReactNode;
}

/** No-code visual props editor: controls, live preview, undo/redo, presets. */
export function VisualPropsEditor({
  schema,
  defaultValues,
  breakpoints = DEFAULT_BREAKPOINTS,
  preview,
}: VisualPropsEditorProps) {
  const {
    resolved,
    activeBreakpoint,
    setActiveBreakpoint,
    isOverridden,
    setLive,
    begin,
    end,
    clearOverride,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    replace,
  } = usePropsEditor({ schema, defaultValues, breakpoints });

  const { presets, savePreset, applyPreset, deletePreset } = usePresets();

  const handleApplyPreset = (id: string) => {
    const preset = applyPreset(id);
    if (preset) replace(preset.values);
  };

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
          {breakpoints.map((bp) => (
            <button
              key={bp.id}
              type="button"
              onClick={() => setActiveBreakpoint(bp.id)}
              className={`h-7 rounded-md px-2.5 text-xs font-medium capitalize transition-colors ${
                activeBreakpoint === bp.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {bp.id === "base" ? "Base" : bp.id}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ToolbarButton label="Undo" disabled={!canUndo} onClick={undo}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          </ToolbarButton>
          <ToolbarButton label="Redo" disabled={!canRedo} onClick={redo}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 14 5-5-5-5" />
              <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
            </svg>
          </ToolbarButton>
          <ToolbarButton label="Reset" disabled={false} onClick={reset}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </ToolbarButton>
          <PresetMenu
            presets={presets}
            onSave={(name) => savePreset(name, resolved)}
            onApply={handleApplyPreset}
            onDelete={deletePreset}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[340px_1fr]">
        <div className="max-h-[75vh] space-y-2 overflow-y-auto pr-1">
          {schema.map((field) => (
            <ControlRow
              key={field.id}
              field={field}
              value={resolved[field.id]}
              isOverridden={isOverridden(field.id)}
              activeBreakpoint={activeBreakpoint}
              onChange={(value) => setLive(field.id, value)}
              onClearOverride={() => clearOverride(field.id)}
              onBegin={begin}
              onEnd={end}
            />
          ))}
        </div>
        <div className="relative flex min-h-[420px] items-center justify-center overflow-auto rounded-xl border border-border bg-background p-6">
          <div className="w-full">{preview(resolved)}</div>
        </div>
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function ToolbarButton({ label, disabled = false, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
