"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CopyIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "./icons";

export interface Example {
  title: string;
  description?: string;
  code: string;
  language?: string;
  filename?: string;
  preview: ReactNode;
}

export function ExampleCard({ example }: { example: Example }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* ignore */ }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-card transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-foreground">{example.title}</h4>
          {example.description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{example.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
              copied ? "text-success" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
            {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button type="button" onClick={() => setShowCode((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            {showCode ? <ChevronUpIcon className="h-3.5 w-3.5" /> : <ChevronDownIcon className="h-3.5 w-3.5" />}
            {showCode ? "Hide" : "Code"}
          </button>
        </div>
      </div>

      <div className="relative flex min-h-36 items-center justify-center overflow-auto border-y border-border/50 bg-gradient-to-br from-muted/30 via-background to-muted/30 p-8">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative z-10">{example.preview}</div>
      </div>

      {showCode && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <CodeBlock
            code={example.code}
            filename={example.filename ?? `${example.title.toLowerCase().replace(/\s+/g, "-")}.tsx`}
            label={example.language ?? "tsx"}
          />
        </div>
      )}
    </div>
  );
}
