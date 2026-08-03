"use client";

import type { ReactNode } from "react";
import type { FieldDef } from "../types";

export interface ResponsiveWrapperProps {
  field: FieldDef;
  activeBreakpoint: string;
  isOverridden: boolean;
  onClearOverride: () => void;
  children: ReactNode;
}

/**
 * For responsive fields on a non-base breakpoint with an explicit override,
 * shows an "inherit" affordance so the value can fall back to a smaller one.
 */
export function ResponsiveWrapper({
  field,
  activeBreakpoint,
  isOverridden,
  onClearOverride,
  children,
}: ResponsiveWrapperProps) {
  if (!field.responsive || activeBreakpoint === "base" || !isOverridden) {
    return <>{children}</>;
  }
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ring" />
        <button
          type="button"
          onClick={onClearOverride}
          className="text-[11px] text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          Inherit from smaller screens
        </button>
      </div>
      {children}
    </div>
  );
}
