"use client";

import { cn } from "@/lib/cn";
import { historyConversations } from "./data";
import { CloseIcon } from "./icons";

export function Sidebar({ visible, onClose, onClear }: { visible: boolean; onClose: () => void; onClear: () => void }) {
  return (
    <div
      className={cn(
        "flex-shrink-0 border-r border-border/60 bg-muted/30 transition-all duration-300",
        visible ? "w-72" : "w-0 overflow-hidden",
      )}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conversations</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground/70 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {historyConversations.map((conv) => (
            <button
              key={conv.id}
              className={cn(
                "w-full rounded-xl bg-card px-4 py-3 text-left text-sm",
                "border border-border/60 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
                "transition-all hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
                "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            >
              <div className="font-medium text-foreground">{conv.title}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{conv.timestamp}</div>
            </button>
          ))}
        </div>
        <div className="mt-4 border-t border-border/60 pt-4">
          <button
            onClick={onClear}
            className={cn(
              "w-full rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-500",
              "transition-all dark:border-red-800 dark:text-red-400",
              "hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
              "active:scale-[0.98]",
            )}
          >
            Clear conversation
          </button>
        </div>
      </div>
    </div>
  );
}
