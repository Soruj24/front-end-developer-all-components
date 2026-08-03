"use client";

import type { HistoryEntry } from "./PromptBuilder.types";
import { timeAgo } from "./PromptBuilder.utils";

export function PromptBuilderHistory({
  history,
  onJumpTo,
}: {
  history: HistoryEntry[];
  onJumpTo: (index: number) => void;
}) {
  const list = [...history].reverse();

  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-border bg-surface p-2 shadow-popover">
      <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Prompt History
      </p>
      {list.length === 0 ? (
        <p className="px-2 py-4 text-center text-sm text-muted-foreground">
          No changes yet.
        </p>
      ) : (
        <div className="scrollbar-thin max-h-64 overflow-y-auto">
          {list.map((entry, i) => {
            const originalIndex = history.length - 1 - i;
            return (
              <button
                key={`${entry.at}-${originalIndex}`}
                type="button"
                onClick={() => onJumpTo(originalIndex)}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
              >
                <span className="min-w-0 truncate text-muted-foreground">
                  {entry.reason}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70">
                  {timeAgo(entry.at)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
