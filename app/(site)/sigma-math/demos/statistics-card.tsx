"use client";

import { Sigma, Hash, Minus } from "lucide-react";

export function StatisticsCard() {
  const data = [12, 15, 18, 22, 19, 25, 30];
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30">
          <Sigma className="h-5 w-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{mean.toFixed(1)}</p>
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Mean</p>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
          <Hash className="h-5 w-5 text-emerald-500" />
        </div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{max}</p>
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Max</p>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/30">
          <Minus className="h-5 w-5 text-orange-500" />
        </div>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{min}</p>
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Min</p>
      </div>
    </div>
  );
}
