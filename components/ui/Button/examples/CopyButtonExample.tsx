"use client";

import { useState } from "react";
import { Button } from "../../Button";
import { writeClipboard } from "@/lib/clipboard";

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

const SNIPPETS = ["npx create-app@latest", "npm install @company/ui"] as const;

function CopyRow({ text, index }: { text: string; index: number }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const handleCopy = async () => {
    const ok = await writeClipboard(text);
    setState(ok ? "copied" : "failed");
    if (ok) window.setTimeout(() => setState("idle"), 2000);
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-4 py-2.5">
      <span className="flex-1 font-mono text-sm text-foreground">{text}</span>
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={handleCopy}
        aria-label={state === "copied" ? `Copied snippet ${index + 1}` : `Copy snippet ${index + 1} to clipboard`}
      >
        {state === "copied" ? <CheckIcon /> : index === 1 ? <ClipboardIcon /> : <CopyIcon />}
      </Button>
      <span aria-live="polite" role="status" className="sr-only">
        {state === "copied" ? `Snippet ${index + 1} copied.` : state === "failed" ? `Copy failed for snippet ${index + 1}.` : ""}
      </span>
    </div>
  );
}

export function CopyButtonExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {SNIPPETS.map((text, index) => (
        <CopyRow key={text} text={text} index={index} />
      ))}
    </div>
  );
}
