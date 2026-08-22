"use client";

import { useState } from "react";
import { Moon } from "lucide-react";

export function SleepTrackerDemo() {
  const [selected, setSelected] = useState("lastNight");
  const nights = {
    lastNight: { deep: 2, light: 4, rem: 1.5, total: 7.5 },
    tuesday: { deep: 1.5, light: 5, rem: 1, total: 7.5 },
    monday: { deep: 2.5, light: 3.5, rem: 2, total: 8 },
  };

  const data = nights[selected as keyof typeof nights];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sleep Tracker</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex gap-1.5">
            {Object.keys(nights).map((n) => (
              <button
                key={n}
                onClick={() => setSelected(n)}
                className={`flex-1 rounded-lg px-3 py-2 text-[10px] font-medium capitalize transition-all ${
                  selected === n
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mb-4 text-center">
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">{data.total}h</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Sleep</p>
          </div>
          <div className="mb-4 flex h-6 overflow-hidden rounded-full">
            <div className="bg-indigo-500 rounded-l-full" style={{ width: `${(data.deep / data.total) * 100}%` }} />
            <div className="bg-blue-400" style={{ width: `${(data.light / data.total) * 100}%` }} />
            <div className="bg-purple-400 rounded-r-full" style={{ width: `${(data.rem / data.total) * 100}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.deep}h</p>
              <p className="text-[10px] text-indigo-500">Deep</p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.light}h</p>
              <p className="text-[10px] text-blue-400">Light</p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.rem}h</p>
              <p className="text-[10px] text-purple-400">REM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
