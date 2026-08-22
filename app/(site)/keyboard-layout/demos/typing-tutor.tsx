"use client";

import { useState } from "react";

export function TypingTutorDemo() {
  const [typed, setTyped] = useState("");
  const target = "the quick brown fox jumps over the lazy dog";
  const display = target.split("").map((char, i) => {
    let state = "pending";
    if (i < typed.length) {
      state = typed[i] === char ? "correct" : "wrong";
    }
    return { char, state };
  });

  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap gap-0.5 font-mono text-lg">
        {display.map((d, i) => (
          <span
            key={i}
            className={`rounded px-0.5 transition-colors ${
              d.state === "correct"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                : d.state === "wrong"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            {d.char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder="Start typing here..."
        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
        autoFocus
      />
      <div className="flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Progress: {Math.round((typed.length / target.length) * 100)}%</span>
        <span>Chars: {typed.length}/{target.length}</span>
      </div>
    </div>
  );
}
