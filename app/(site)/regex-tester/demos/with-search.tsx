"use client";

import { Search } from "lucide-react";

export function WithSearch() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
        <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{"\\d{3}"}</span>
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Matches 3 consecutive digits</p>
    </div>
  );
}
