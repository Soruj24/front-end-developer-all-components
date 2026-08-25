import React from "react";
import { cn } from "@/lib/cn";
import type { ConsoleEntry } from "./CodePlayground.types";
import { TerminalIcon, TrashIcon, ChevronDownIcon } from "./CodePlayground.icons";
import { formatConsoleArg } from "./CodePlayground.utils";

interface CodePlaygroundConsoleProps {
  logs: ConsoleEntry[]; setLogs: (fn: (prev: ConsoleEntry[]) => ConsoleEntry[]) => void;
  setConsoleOpen: (v: boolean) => void;
}

export function CodePlaygroundConsole({ logs, setLogs, setConsoleOpen }: CodePlaygroundConsoleProps) {
  return (
    <div className="flex h-44 flex-col border-t border-border/60 bg-background">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <TerminalIcon className="h-3.5 w-3.5" />Console<span className="font-mono text-[10px] text-muted-foreground/60">{logs.length} entries</span>
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setLogs(() => [])} aria-label="Clear console" className="inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><TrashIcon className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => setConsoleOpen(false)} aria-label="Hide console" className="inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><ChevronDownIcon className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <div className="scrollbar-thin flex-1 overflow-auto px-3 py-2 font-mono text-xs leading-relaxed">
        {logs.length === 0 ? <p className="text-muted-foreground/60">Log output will appear here</p> : logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 border-b border-border/40 py-1">
            <span className="shrink-0 text-[10px] text-muted-foreground/60">{new Date(log.ts).toLocaleTimeString([], { hour12: false })}</span>
            <span className={cn("shrink-0 text-[10px] font-semibold uppercase", log.type === "error" ? "text-danger" : log.type === "warn" ? "text-warning" : log.type === "info" ? "text-info" : log.type === "debug" ? "text-muted-foreground/60" : "text-muted-foreground")}>{log.type}</span>
            <span className={cn("min-w-0 break-words", log.type === "error" ? "text-danger" : log.type === "warn" ? "text-warning" : "text-foreground")}>
              {log.args.map((arg, i) => <React.Fragment key={i}>{i > 0 ? " " : ""}{formatConsoleArg(arg).slice(0, 400)}</React.Fragment>)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
