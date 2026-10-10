"use client";

import { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { writeClipboard } from "@/lib/clipboard";
import { tokenize, type SupportedLanguage } from "./tokenize";

interface CodeBlockProps {
  code: string;
  language?: SupportedLanguage;
  filename?: string;
  label?: string;
  showLineNumbers?: boolean;
  maxCollapsedLines?: number;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  label,
  showLineNumbers = true,
  maxCollapsedLines = 30,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const tokens = useMemo(() => tokenize(code, language), [code, language]);

  const lineStarts = useMemo(() => {
    const starts: number[] = [0];
    for (let i = 0; i < code.length; i++) {
      if (code[i] === "\n") starts.push(i + 1);
    }
    return starts;
  }, [code]);

  const lineCount = lineStarts.length;
  const collapsible = lineCount > maxCollapsedLines;
  const visibleCount = collapsible && !expanded ? maxCollapsedLines : lineCount;

  const handleCopy = useCallback(async () => {
    const ok = await writeClipboard(code);
    setCopied(ok);
    setCopyFailed(!ok);
    if (ok) window.setTimeout(() => setCopied(false), 1600);
  }, [code]);

  let tokenIndex = 0;
  const displayName = filename ?? label;
  const badge = label ?? language;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-background shadow-card",
        className,
      )}
    >
      {(displayName || true) && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex shrink-0 gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            </span>
            {displayName && (
              <span className="truncate font-mono text-xs text-muted-foreground">
                {displayName}
              </span>
            )}
            <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {badge}
            </span>
            <span className="hidden shrink-0 text-[11px] text-muted-foreground/60 sm:inline">
              {lineCount} lines
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied to clipboard" : `Copy ${displayName ?? "code"} to clipboard`}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              copied
                ? "text-success"
                : copyFailed
                  ? "text-danger"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {copied ? (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
            )}
            {copied ? "Copied" : copyFailed ? "Copy failed" : "Copy"}
          </button>
        </div>
      )}
      <p aria-live="polite" role="status" className="sr-only">
        {copied ? "Code copied to clipboard." : copyFailed ? "Copy failed. Select the code manually." : ""}
      </p>

      <div className="relative overflow-x-auto">
        <pre className="min-w-max p-4 font-mono text-[13px] leading-relaxed">
          <code>
            {Array.from({ length: visibleCount }, (_, lineIndex) => {
              const lineStart = lineStarts[lineIndex];
              const lineEnd =
                lineIndex + 1 < lineStarts.length
                  ? lineStarts[lineIndex + 1] - 1
                  : code.length;
              while (
                tokenIndex < tokens.length &&
                tokens[tokenIndex].to <= lineStart
              ) {
                tokenIndex++;
              }
              const parts = [];
              let i = tokenIndex;
              while (i < tokens.length && tokens[i].from < lineEnd) {
                const tok = tokens[i];
                if (tok.to > lineStart) {
                  parts.push(
                    <span key={i} className={tok.className}>
                      {code.slice(
                        Math.max(tok.from, lineStart),
                        Math.min(tok.to, lineEnd),
                      )}
                    </span>,
                  );
                }
                i++;
              }
              return (
                <div key={lineIndex} className="flex">
                  {showLineNumbers && (
                    <span
                      className="mr-4 inline-block w-8 shrink-0 select-none text-right text-muted-foreground/40"
                      aria-hidden="true"
                    >
                      {lineIndex + 1}
                    </span>
                  )}
                  <span className="flex-1 whitespace-pre">
                    {parts.length > 0 ? parts : "\u00a0"}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
        {collapsible && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
        )}
      </div>

      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-center gap-1.5 border-t border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          {expanded
            ? "Collapse"
            : `Show ${lineCount - maxCollapsedLines} more lines`}
        </button>
      )}
    </div>
  );
}
