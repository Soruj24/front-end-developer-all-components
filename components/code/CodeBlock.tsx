"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import { tokenize, type SupportedLanguage } from "./tokenize";

function fallbackCopy(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(textarea);
  }
  return ok;
}

async function writeClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return fallbackCopy(value);
    }
  }
  return fallbackCopy(value);
}

interface CodeBlockProps {
  code: string;
  language?: SupportedLanguage;
  filename?: string;
  label?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  label,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  const lineCount = lines.length;

  const tokens = useMemo(() => tokenize(code, language), [code, language]);

  const onCopy = async () => {
    const ok = await writeClipboard(code);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const displayLabel = label ?? language.toUpperCase();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-background shadow-card transition-[border-color,box-shadow] duration-200 hover:border-ring/30",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {displayLabel}
          </span>
          {filename && (
            <>
              <span className="text-border">·</span>
              <span className="font-mono text-[11px] text-muted-foreground/70">
                {filename}
              </span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150",
            copied
              ? "bg-success/10 text-success"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          {copied ? (
            <>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <pre className="p-4 font-mono text-[13px] leading-relaxed">
          <code>
            {lines.map((line, lineIndex) => {
              const lineStart = lines.slice(0, lineIndex).join("\n").length;
              const lineEnd = lineStart + line.length;
              const lineTokens = tokens.filter(
                (tok) => tok.from < lineEnd && tok.to > lineStart,
              );

              return (
                <div key={lineIndex} className="flex">
                  {showLineNumbers && (
                    <span
                      className="mr-4 inline-block w-7 shrink-0 select-none text-right text-muted-foreground/40"
                      aria-hidden="true"
                    >
                      {String(lineIndex + 1).padStart(
                        String(lineCount).length,
                        " ",
                      )}
                    </span>
                  )}
                  <span className="flex-1 whitespace-pre">
                    {lineTokens.length > 0 ? (
                      lineTokens.map((tok, i) => {
                        const visFrom = Math.max(tok.from, lineStart);
                        const visTo = Math.min(tok.to, lineEnd);
                        return (
                          <span key={i} className={tok.className}>
                            {code.slice(visFrom, visTo)}
                          </span>
                        );
                      })
                    ) : (
                      <span className="tok-plain"> </span>
                    )}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
