export const CODE_BLOCK_PRO_SOURCE = `"use client";

import { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";

interface CodeBlockProProps {
  code: string;
  language?: string;
  theme?: "dark" | "light";
  showLineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
}

export function CodeBlockPro({
  code,
  language = "typescript",
  showLineNumbers = true,
  highlightLines = [],
  filename = "index.tsx",
}: CodeBlockProProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\\n");

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/[.08] bg-[#0d1117] shadow-lg dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs text-white/70">
            <FileCode className="h-3.5 w-3.5 text-blue-400" />
            {filename}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400">
            {language}
          </span>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/70"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-[13px] leading-6">
          {lines.map((line, i) => (
            <div
              key={i}
              className={\`flex \${
                highlightLines.includes(i + 1)
                  ? "bg-yellow-500/10 border-l-2 border-yellow-500/50 -ml-[2px] pl-[6px]"
                  : ""
              }\`}
            >
              {showLineNumbers && (
                <span className="w-8 select-none pr-4 text-right text-xs text-white/20">{i + 1}</span>
              )}
              <code className="text-white/80">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}`;