export const SIGMA_MATH_SOURCE = `"use client";

export function FormulaDisplay() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-8 py-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <span className="text-4xl font-serif italic text-zinc-900 dark:text-zinc-100">E = mc&sup2;</span>
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Mass-energy equivalence</p>
    </div>
  );
}`;
