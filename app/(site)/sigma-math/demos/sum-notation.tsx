"use client";

import { useState } from "react";

export function SumNotation() {
  const [n, setN] = useState(5);
  const sum = (n * (n + 1)) / 2;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-8 py-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-3">
        <span className="text-4xl font-serif italic text-zinc-900 dark:text-zinc-100">&Sigma;</span>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">n={n}</span>
          <span className="text-xs text-zinc-600 dark:text-zinc-300">i=1</span>
        </div>
        <span className="text-xl font-serif italic text-zinc-700 dark:text-zinc-300">i</span>
        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">= {sum}</span>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">n:</label>
        <input
          type="range"
          min={1}
          max={20}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="h-1.5 w-32 cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700"
        />
        <span className="w-7 rounded-lg bg-zinc-100 py-1 text-center text-xs font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{n}</span>
      </div>
    </div>
  );
}
