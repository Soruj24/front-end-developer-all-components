"use client";

import { Send } from "lucide-react";

export function DisabledState() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 opacity-60 dark:border-zinc-700 dark:bg-zinc-900">
        <input
          type="text"
          placeholder="Type a message..."
          disabled
          className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-400 outline-none placeholder:text-zinc-400 dark:text-zinc-500 dark:placeholder:text-zinc-600"
        />
        <button
          disabled
          className="rounded-lg bg-zinc-300 p-2 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
