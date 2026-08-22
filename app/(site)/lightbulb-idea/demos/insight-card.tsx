"use client";

import { Target } from "lucide-react";

export function InsightCardDemo() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
          <Target className="h-4 w-4 text-emerald-500" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Insight</h4>
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">Analytics</span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Components used most frequently in production are typically simple,
        composable, and have a clear single purpose. Focus on building small
        building blocks rather than monolithic widgets.
      </p>
    </div>
  );
}
