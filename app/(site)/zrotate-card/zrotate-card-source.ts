export const ZROTATE_CARD_SOURCE = `"use client";

export function BasicRotate() {
  return (
    <div className="flex justify-center">
      <div className="h-32 w-48 cursor-pointer rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 shadow-sm transition-all duration-300 hover:-rotate-3 hover:scale-105 hover:shadow-lg dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:hover:shadow-zinc-900/20">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Hover to Rotate</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Z-axis transform</p>
      </div>
    </div>
  );
}`;
