"use client";

import { useState, useCallback } from "react";
import { CopyIcon, CheckIcon, Maximize2Icon, RotateCcwIcon } from "lucide-react";

interface PreviewPanelProps {
  children: React.ReactNode;
  filename?: string;
}

export function PreviewPanel({ children, filename }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("Component copied!");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </span>
          {filename && (
            <span className="font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            title="Refresh preview"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              copied
                ? "text-green-500"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {copied ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            title="Open in new tab"
          >
            <Maximize2Icon className="h-3.5 w-3.5" />
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
