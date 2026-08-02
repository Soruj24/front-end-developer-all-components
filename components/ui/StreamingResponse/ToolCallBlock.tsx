"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ToolCall } from "../StreamingResponse";
import { CheckIcon, ChevronDownIcon, WrenchIcon, XIcon } from "./icons";

export function ToolStatusIcon({ status }: { status: ToolCall["status"] }) {
  if (status === "success") return <CheckIcon className="h-3.5 w-3.5 text-success" />;
  if (status === "error") return <XIcon className="h-3.5 w-3.5 text-danger" />;
  return <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />;
}

function formatToolArgs(args: string): string {
  try {
    return JSON.stringify(JSON.parse(args), null, 2);
  } catch {
    return args;
  }
}

export function ToolCallBlock({ tool }: { tool: ToolCall }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
            tool.status === "error" ? "bg-danger-soft text-danger" : "bg-primary-soft text-primary"
          )}
        >
          <WrenchIcon className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-sm font-semibold text-foreground">{tool.name}</span>
          <span className="block text-xs text-muted-foreground">{tool.status}</span>
        </span>
        <ToolStatusIcon status={tool.status} />
        <ChevronDownIcon className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="border-t border-border px-4 py-3">
          <pre className="scrollbar-thin overflow-x-auto rounded-lg bg-muted/50 p-3 font-mono text-xs text-foreground/85">
            {formatToolArgs(tool.arguments)}
          </pre>
          {tool.result && <p className="mt-2 text-xs text-muted-foreground">Result: {tool.result}</p>}
        </div>
      )}
    </div>
  );
}
