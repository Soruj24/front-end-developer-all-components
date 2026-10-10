"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { writeClipboard } from "@/lib/clipboard";
import { CheckIcon, CopyIcon } from "./icons";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

/** Icon button that copies `value`, flashing a check while it is copied. */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const onCopy = async () => {
    const ok = await writeClipboard(value);
    setCopied(ok);
    setFailed(!ok);
    if (ok) window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied to clipboard" : failed ? "Copy failed" : label ? `Copy ${label}` : "Copy"}
      className={cn(
        "inline-flex min-h-[32px] items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        copied
          ? "text-success"
          : failed
            ? "text-danger"
            : (className ?? "text-muted-foreground hover:bg-muted hover:text-foreground")
      )}
    >
      {copied ? (
        <span className="inline-flex animate-pop">
          <CheckIcon className="h-3.5 w-3.5 text-success" />
        </span>
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : failed ? "Copy failed" : ""}
      </span>
      {label ?? (copied ? "Copied" : failed ? "Failed" : "Copy")}
    </button>
  );
}
