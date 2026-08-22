export const SEND_MESSAGE_SOURCE = `"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function BasicInput() {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 shadow-sm transition-all focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-800">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent px-1 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
        <button
          disabled={!message.trim()}
          className="rounded-lg bg-zinc-900 p-2 text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:active:scale-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`;
