"use client";

import { useState, useCallback } from "react";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CopyIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface SourceCodeViewerProps {
  source: string;
  filename?: string;
  label?: string;
  defaultExpanded?: boolean;
}

export function SourceCodeViewer({
  source,
  filename = "Component.tsx",
  label = "tsx",
  defaultExpanded = false,
}: SourceCodeViewerProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, [source]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              copied ? "text-green-500" : "text-muted-foreground hover:bg-muted"
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
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {expanded ? (
              <ChevronUpIcon className="h-3.5 w-3.5" />
            ) : (
              <ChevronDownIcon className="h-3.5 w-3.5" />
            )}
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
      {expanded ? (
        <CodeBlock code={source} filename={filename} label={label} />
      ) : (
        <div className="relative max-h-48 overflow-hidden">
          <CodeBlock code={source} filename={filename} label={label} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}
    </div>
  );
}
