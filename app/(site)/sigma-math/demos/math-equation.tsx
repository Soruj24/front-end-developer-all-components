"use client";

import { useState } from "react";

export function MathEquation() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const result = a + b;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <input
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        className="h-12 w-16 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-sm font-semibold text-zinc-900 outline-none transition-all focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
      />
      <span className="text-xl font-bold text-zinc-400 dark:text-zinc-500">+</span>
      <input
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
        className="h-12 w-16 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-sm font-semibold text-zinc-900 outline-none transition-all focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
      />
      <span className="text-xl font-bold text-zinc-400 dark:text-zinc-500">=</span>
      <span className="flex h-12 w-16 items-center justify-center rounded-xl bg-zinc-900 text-lg font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{result}</span>
    </div>
  );
}
