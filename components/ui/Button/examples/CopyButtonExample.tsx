"use client";

import { useRef, useState } from "react";
import { Button } from "../../Button";

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

export function CopyButtonExample() {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    const text = textRef.current?.textContent;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5">
        <span ref={textRef} className="flex-1 font-mono text-sm text-foreground">
          npx create-app@latest
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <CheckIcon />
          ) : (
            <CopyIcon />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5">
        <span ref={textRef} className="flex-1 font-mono text-sm text-foreground">
          npm install @company/ui
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? (
            <CheckIcon />
          ) : (
            <ClipboardIcon />
          )}
        </Button>
      </div>
    </div>
  );
}
