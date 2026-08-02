"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon } from "./icons";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

function fallbackCopy(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(textarea);
  }
  return ok;
}

async function writeClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return fallbackCopy(value);
    }
  }
  return fallbackCopy(value);
}

/** Icon button that copies `value`, flashing a check while it is copied. */
export function CopyButton({ value, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await writeClipboard(value);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ? `Copy ${label}` : "Copy"}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-95",
        className ?? "text-muted-foreground hover:bg-muted hover:text-foreground"
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
        {copied ? "Copied to clipboard" : ""}
      </span>
      {label ?? (copied ? "Copied" : "Copy")}
    </button>
  );
}
