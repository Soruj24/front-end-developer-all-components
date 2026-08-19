export const BRACKETS_CODE_SOURCE = `"use client";

import { useState } from "react";
import { Code, Braces, Type, GitBranch, Terminal, FileCode, Copy } from "lucide-react";

interface BracketsCodeProps {
  code: string;
  language?: string;
}

export function BracketsCode({ code, language = "typescript" }: BracketsCodeProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <FileCode className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-mono text-sm text-foreground truncate">{code.split("\\n")[0]}</p>
        <p className="text-xs text-muted-foreground">{language}</p>
      </div>
      <button
        onClick={copy}
        className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
        <Copy className="h-3.5 w-3.5" />
        Copy
      </button>
    </div>
  );
}"`;