"use client";

import { useState } from "react";
import type { FieldDef, PropValue } from "../types";
import { ResponsiveWrapper } from "./ResponsiveWrapper";
import { ControlSwitch } from "./controls/ControlSwitch";

export interface ControlRowProps {
  field: FieldDef;
  value: PropValue;
  isOverridden: boolean;
  activeBreakpoint: string;
  onChange: (value: PropValue) => void;
  onClearOverride: () => void;
  onBegin: () => void;
  onEnd: () => void;
}

/** Labeled, grouped control row for a single schema field. */
export function ControlRow({
  field,
  value,
  isOverridden,
  activeBreakpoint,
  onChange,
  onClearOverride,
  onBegin,
  onEnd,
}: ControlRowProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          {field.label}
        </button>
        {field.responsive && (
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            responsive
          </span>
        )}
      </div>
      {field.description && (
        <p className="mb-2 mt-0.5 text-xs text-muted-foreground">{field.description}</p>
      )}
      {open && (
        <div className="mt-2">
          <ResponsiveWrapper
            field={field}
            activeBreakpoint={activeBreakpoint}
            isOverridden={isOverridden}
            onClearOverride={onClearOverride}
          >
            <ControlSwitch
              field={field}
              value={value}
              onChange={onChange}
              onBegin={onBegin}
              onEnd={onEnd}
            />
          </ResponsiveWrapper>
        </div>
      )}
    </div>
  );
}
