export const SMILE_EMOJI_SOURCE = `"use client";

import { useState } from "react";

const EMOJIS = ["😀","😂","😍","🤔","😎","🥳","😢","😡","👍","❤️","🎉","🔥"];

export function EmojiPicker() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm space-y-3">
      {selected && (
        <div className="flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-1.5 dark:bg-zinc-800">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Selected:</span>
          <span className="text-lg">{selected}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => setSelected(e)}
            className={\`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all active:scale-90 \${
              selected === e
                ? "bg-zinc-900 ring-2 ring-zinc-900 ring-offset-2 dark:bg-zinc-100 dark:ring-zinc-100"
                : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            }\`}
            aria-label={\`Select \${e}\`}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}`;
