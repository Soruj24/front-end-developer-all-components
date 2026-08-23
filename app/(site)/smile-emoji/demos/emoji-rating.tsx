"use client";

import { useState } from "react";

const EMOJIS = ["😫", "😕", "😐", "🙂", "🤩"];

export function EmojiRating() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {EMOJIS.map((e, i) => (
          <button
            key={i}
            onClick={() => setValue(i)}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all active:scale-90 ${
              value === i
                ? "scale-110 bg-zinc-900 shadow-sm dark:bg-zinc-100"
                : "bg-zinc-100 opacity-40 hover:opacity-70 dark:bg-zinc-800"
            }`}
            aria-label={`Rating ${i + 1}`}
          >
            {e}
          </button>
        ))}
      </div>
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Rating: {value + 1}/5</p>
    </div>
  );
}
