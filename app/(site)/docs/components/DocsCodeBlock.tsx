"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";

export function DocsCopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ? `Copy ${label}` : "Copy"}
      aria-live="polite"
      className={cn(
        "inline-flex min-h-[32px] shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        FOCUS.ring,
        copied
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground hover:text-foreground",
      )}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export function DocsCodeBlock({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-sm">
      {filename && (
        <div className="flex min-w-0 items-center justify-between gap-2 border-b border-border/60 bg-muted/30 px-4 py-2">
          <span className="min-w-0 truncate font-mono text-[11px] text-muted-foreground">
            {filename}
          </span>
          <DocsCopyButton value={code} label={filename} />
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code className="text-foreground/80">{code}</code>
      </pre>
    </div>
  );
}
