"use client";

import { historyConversations } from "./data";
import { CloseIcon } from "./icons";

export function Sidebar({ visible, onClose, onClear }: { visible: boolean; onClose: () => void; onClear: () => void }) {
  return (
    <div
      className={`${visible ? "w-72" : "w-0 overflow-hidden"} flex-shrink-0 border-r border-border bg-muted/40 transition-all duration-300 dark:border-border dark:bg-zinc-900/50`}
    >
      <div className="flex h-full flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground">Conversations</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-muted-foreground/70 hover:bg-muted/70 lg:hidden">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {historyConversations.map((conv) => (
            <button
              key={conv.id}
              className="w-full rounded-xl bg-white px-4 py-3 text-left text-sm shadow-sm transition-colors hover:bg-muted dark:bg-muted dark:hover:bg-muted"
            >
              <div className="font-medium text-zinc-800 dark:text-zinc-200">{conv.title}</div>
              <div className="mt-0.5 text-xs text-muted-foreground/70">{conv.timestamp}</div>
            </button>
          ))}
        </div>
        <div className="mt-4 border-t border-border pt-4 dark:border-border">
          <button
            onClick={onClear}
            className="w-full rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            Clear conversation
          </button>
        </div>
      </div>
    </div>
  );
}
