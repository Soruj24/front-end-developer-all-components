export const REGEX_TESTER_SOURCE = `"use client";

export function BasicPattern() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pattern</label>
          <div className="mt-1 flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900">
            <span className="text-zinc-400 dark:text-zinc-500">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">^[a-z]+$</span>
            <span className="text-zinc-400 dark:text-zinc-500">/</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Test String</label>
          <div className="mt-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">hello</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium">Match found</span>
        </div>
      </div>
    </div>
  );
}`;
