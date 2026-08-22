"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function CharacterCounter() {
  const [message, setMessage] = useState("");
  const maxChars = 280;
  const remaining = maxChars - message.length;
  const isOver = remaining < 0;
  const isNear = remaining <= 20 && remaining >= 0;

  return (
    <div className="w-full max-w-sm space-y-1.5">
      <div className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm transition-all focus-within:ring-2 ${
        isOver
          ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100 dark:border-red-700 dark:focus-within:border-red-500 dark:focus-within:ring-red-900/30"
          : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-800"
      }`}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          maxLength={maxChars + 20}
          className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
        <button
          disabled={!message.trim() || isOver}
          className="rounded-lg bg-zinc-900 p-2 text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:active:scale-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-end px-1">
        <span className={`font-mono text-[11px] font-medium transition-colors ${
          isOver ? "text-red-500" : isNear ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500"
        }`}>
          {remaining}
        </span>
      </div>
    </div>
  );
}
