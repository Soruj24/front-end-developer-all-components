"use client";

import { useState } from "react";
import { RotateCcwIcon } from "lucide-react";

interface PreviewPanelProps {
  children: React.ReactNode;
  filename?: string;
}

export function PreviewPanel({ children, filename }: PreviewPanelProps) {
  const [key, setKey] = useState(0);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </span>
          {filename && (
            <span className="truncate font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          )}
          <span className="shrink-0 text-[11px] text-muted-foreground/60">Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            aria-label="Refresh preview"
            title="Refresh preview"
            className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        key={key}
        className="flex min-h-64 items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-8"
      >
        {children}
      </div>
    </div>
  );
}
