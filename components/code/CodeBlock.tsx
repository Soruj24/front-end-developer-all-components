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
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const lines = code.split("\n");
  const lineCount = lines.length;

  const tokens = useMemo(() => tokenize(code, language), [code, language]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-background shadow-card transition-[border-color,box-shadow] duration-200 hover:border-ring/30",
        className,
      )}
    >
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
