"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";

export function CodePreview() {
  const { generatedCode, copyCodeToClipboard } = useStudio();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyCodeToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs font-medium text-foreground">Generated Component</span>
        <button onClick={handleCopy} className={cn("rounded px-3 py-1 text-xs font-medium transition-colors", copied ? "bg-success/10 text-success" : "bg-primary/10 text-primary hover:bg-primary/20")}>
          {copied ? "✓ Copied" : "Copy Code"}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-[#1e1e1e] p-4">
        <pre className="text-[13px] leading-relaxed text-[#d4d4d8]">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}
