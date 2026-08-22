"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function HighlightMatches() {
  const [pattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const text = "Contact us at support@example.com or sales@company.org for more info.";
  const [copied, setCopied] = useState(false);

  let matches: string[] = [];
  try {
    const regex = new RegExp(pattern, "gi");
    matches = text.match(regex) || [];
  } catch (e) {}

  const parts = text.split(new RegExp(`(${pattern})`, "gi"));

  const copyEmails = () => {
    navigator.clipboard.writeText(matches.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">/{"\\b\\w+@\\w+\\.\\w+\\b"}/gi</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {parts.map((part, i) =>
              matches.some((m) => m.toLowerCase() === part.toLowerCase()) ? (
                <span key={i} className="rounded-md bg-amber-100 px-1 py-0.5 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{part}</span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{matches.length} match{matches.length !== 1 ? "es" : ""}</span>
          <button onClick={copyEmails} className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-[10px] font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
