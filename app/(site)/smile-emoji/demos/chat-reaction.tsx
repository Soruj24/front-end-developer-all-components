"use client";

import { useState } from "react";

const QUICK_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🎉"];

export function ChatReaction() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (e: string) =>
    setSelected((s) => (s.includes(e) ? s.filter((x) => x !== e) : [...s, e]));

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">This is a sample message to react to.</p>
      </div>
      <div className="flex gap-1.5">
        {QUICK_REACTIONS.map((e) => (
          <button
            key={e}
            onClick={() => toggle(e)}
            className={`flex h-9 items-center justify-center rounded-xl px-2.5 text-sm transition-all active:scale-90 ${
              selected.includes(e)
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
            aria-label={`React with ${e}`}
          >
            {e}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Reactions: {selected.join(" ")}</p>
      )}
    </div>
  );
}
