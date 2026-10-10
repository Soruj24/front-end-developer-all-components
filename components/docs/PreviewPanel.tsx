"use client";

import { useState, useCallback } from "react";
import { CopyIcon, CheckIcon, RotateCcwIcon } from "lucide-react";
import { writeClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/cn";

interface PreviewPanelProps {
  children: React.ReactNode;
  filename?: string;
  /** Full source used by the Copy button. Copies a hint when omitted. */
  copySource?: string;
}

export function PreviewPanel({ children, filename, copySource }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [key, setKey] = useState(0);

  const handleCopy = useCallback(async () => {
    const ok = await writeClipboard(copySource ?? "See the source code below.");
    setCopied(ok);
    setFailed(!ok);
    if (ok) window.setTimeout(() => setCopied(false), 1600);
  }, [copySource]);

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
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Preview source copied" : "Copy preview source"}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              copied ? "text-success" : failed ? "text-danger" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {copied ? (
              <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? "Copied" : failed ? "Failed" : "Copy"}
          </button>
        </div>
      </div>
      <p aria-live="polite" role="status" className="sr-only">
        {copied ? "Preview source copied." : ""}
      </p>
      <div
        key={key}
        className="flex min-h-64 items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-8"
      >
        {children}
      </div>
    </div>
  );
}
