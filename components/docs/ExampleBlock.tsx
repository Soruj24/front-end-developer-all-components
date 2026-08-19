"use client";

import { useState, useCallback } from "react";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CopyIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface ExampleBlockProps {
  title: string;
  description?: string;
  code: string;
  filename?: string;
  children: React.ReactNode;
}

export function ExampleBlock({
  title,
  description,
  code,
  filename,
  children,
}: ExampleBlockProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, [code]);

  const codeFilename =
    filename || `${title.toLowerCase().replace(/\s+/g, "-")}.tsx`;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div>
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              copied
                ? "text-green-500"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {copied ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => setShowCode((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {showCode ? (
              <ChevronUpIcon className="h-3.5 w-3.5" />
            ) : (
              <ChevronDownIcon className="h-3.5 w-3.5" />
            )}
            {showCode ? "Hide" : "View Code"}
          </button>
        </div>
      </div>
      <div className="flex min-h-32 items-center justify-center border-y border-border/50 bg-gradient-to-br from-muted/30 via-background to-muted/30 p-8">
        {children}
      </div>
      {showCode && (
        <CodeBlock code={code} filename={codeFilename} label="tsx" />
      )}
    </div>
  );
}
