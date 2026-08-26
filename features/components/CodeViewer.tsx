"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import { CopyIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, DownloadIcon } from "./icons";

interface CodeViewerProps {
  source: string;
  filename?: string;
  language?: string;
}

type TokenType = "comment" | "string" | "keyword" | "tag" | "attr" | "number" | "plain";

const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|default|function|return|const|let|var|new|type|interface|extends|class|as|async|await|if|else|for|of|while|do|switch|case|break|continue|try|catch|finally|throw|this|void|null|undefined|true|false|readonly)\b)|(<\/?[A-Za-z][\w.-]*|\/?>)|([A-Za-z][\w-]*=)|\b(\d[\w.]*)\b/g;

const TOKEN_STYLE: Record<TokenType, string> = {
  comment: "italic text-muted-foreground/50",
  string: "text-success dark:text-success",
  keyword: "text-primary dark:text-primary",
  tag: "text-info dark:text-info",
  attr: "text-amber-600 dark:text-amber-400",
  number: "text-cyan-600 dark:text-cyan-400",
  plain: "text-foreground/75",
};

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
    const type: TokenType = comment ? "comment" : string ? "string" : keyword ? "keyword" : tag ? "tag" : attr ? "attr" : number ? "number" : "plain";
    tokens.push({ type, text: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < code.length) {
    tokens.push({ type: "plain", text: code.slice(lastIndex) });
  }
  return tokens;
}

function HighlightedCode({ code }: { code: string }) {
  const tokens = useMemo(() => tokenize(code), [code]);
  return (
    <code>
      {tokens.map((token, i) => (
        <span key={i} className={TOKEN_STYLE[token.type]}>{token.text}</span>
      ))}
    </code>
  );
}

export function CodeViewer({
  source,
  filename = "Component.tsx",
  language = "tsx",
}: CodeViewerProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = source.split("\n");
  const shouldCollapse = lines.length > 30;
  const visibleLines = shouldCollapse && !expanded ? lines.slice(0, 30) : lines;
  const visibleCode = visibleLines.join("\n");
  const hiddenCount = lines.length - 30;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    const blob = new Blob([source], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="flex flex-col gap-3" id="code">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Source Code</h2>
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{language}</span>
          <span className="text-[11px] text-muted-foreground/60">{lines.length} lines</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={handleCopy}
            className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors",
              copied ? "text-success" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
            {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button type="button" onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <DownloadIcon className="h-3.5 w-3.5" />Download
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-[#0b0b10] shadow-card transition-all duration-300">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            </span>
            <span className="font-mono text-xs text-muted-foreground/70">{filename}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{language}</span>
        </div>

        <div className="overflow-x-auto">
          <pre className="p-4 text-[13px] leading-relaxed">
            {visibleLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground/30">{i + 1}</span>
                <span className="flex-1">
                  <HighlightedCode code={line} />
                </span>
              </div>
            ))}
          </pre>
        </div>

        {shouldCollapse && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center justify-center gap-1.5 border-t border-zinc-800 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-zinc-900/60 hover:text-foreground"
          >
            {expanded ? (
              <><ChevronUpIcon className="h-3.5 w-3.5" />Collapse</>
            ) : (
              <><ChevronDownIcon className="h-3.5 w-3.5" />Show {hiddenCount} more lines</>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
