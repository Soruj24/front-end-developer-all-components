"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon } from "./icons";

type TokenType = "comment" | "string" | "keyword" | "tag" | "attr" | "number" | "plain";

const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|default|function|return|const|let|var|new|type|interface|extends|class|as|async|await|if|else|for|of)\b)|(<\/?[A-Za-z][\w.-]*|\/?>)|([A-Za-z][\w-]*=)|\b(\d[\w.]*)\b/g;

const TOKEN_STYLE: Record<TokenType, string> = {
  comment: "italic text-muted-foreground/50",
  string: "text-success dark:text-success",
  keyword: "text-primary dark:text-primary",
  tag: "text-info dark:text-info",
  attr: "text-amber-600 dark:text-amber-400",
  number: "text-cyan-600 dark:text-cyan-400",
  plain: "text-foreground/75",
};

const TOKEN_STYLE_TERMINAL: Record<TokenType, string> = {
  comment: "italic text-muted-foreground",
  string: "text-success",
  keyword: "text-primary",
  tag: "text-info",
  attr: "text-amber-300",
  number: "text-cyan-300",
  plain: "text-zinc-300",
};

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

function tokenize(code: string): Array<{ type: TokenType; text: string }> {
  if (!code) return [];
  const tokens: Array<{ type: TokenType; text: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", text: code.slice(lastIndex, match.index) });
    }
    const [, comment, string, keyword, tag, attr, number] = match;
    const type: TokenType = comment
      ? "comment"
      : string
        ? "string"
        : keyword
          ? "keyword"
          : tag
            ? "tag"
            : attr
              ? "attr"
              : number
                ? "number"
                : "plain";
    tokens.push({ type, text: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: "plain", text: code.slice(lastIndex) });
  }
  return tokens;
}

interface CodeBlockProps {
  code: string;
  filename?: string;
  label?: string;
  /** Terminal variant uses a fixed dark surface. */
  variant?: "default" | "terminal";
  className?: string;
}

/** Monospace window with filename bar, copy button, and syntax highlighting. */
export function CodeBlock({
  code,
  filename,
  label,
  variant = "default",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const terminal = variant === "terminal";
  const tokens = tokenize(code ?? "");

  const onCopy = async () => {
    const ok = await writeClipboard(code ?? "");
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-card transition-[border-color,box-shadow] duration-200 ease-out",
        terminal
          ? "border-zinc-800 bg-[#0b0b10]"
          : "border-border bg-background hover:border-ring/40",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b px-4 py-2.5",
          terminal ? "border-zinc-800 bg-zinc-900/60" : "border-border"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5"
            aria-hidden="true"
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", terminal ? "bg-zinc-600" : "bg-muted-foreground/25")} />
            <span className={cn("h-2.5 w-2.5 rounded-full", terminal ? "bg-zinc-600" : "bg-muted-foreground/25")} />
            <span className={cn("h-2.5 w-2.5 rounded-full", terminal ? "bg-zinc-600" : "bg-muted-foreground/25")} />
          </div>
          {filename && (
            <span className={cn("font-mono text-xs", terminal ? "text-muted-foreground/70" : "text-muted-foreground")}>
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {label && (
            <span className={cn("font-mono text-[10px] uppercase tracking-wider", terminal ? "text-muted-foreground" : "text-muted-foreground/70")}>
              {label}
            </span>
          )}
          <button
            type="button"
            onClick={onCopy}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-95",
              terminal
                ? "text-muted-foreground/70 hover:bg-zinc-800 hover:text-zinc-100"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <span className="inline-flex animate-pop">
                <CheckIcon className="h-3.5 w-3.5 text-success" />
              </span>
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
            <span className="sr-only" aria-live="polite">
              {copied ? "Copied to clipboard" : ""}
            </span>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>
          {tokens.map((token, index) => (
            <span key={index} className={terminal ? TOKEN_STYLE_TERMINAL[token.type] : TOKEN_STYLE[token.type]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
