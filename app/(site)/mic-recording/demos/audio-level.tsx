"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";

export function AudioLevel() {
  const [level, setLevel] = useState(65);
  const [peak, setPeak] = useState(85);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Volume2 className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Audio Level</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Input Level</span>
            <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">{level}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all ${
                level > 80 ? "bg-red-500" : level > 50 ? "bg-amber-500" : "bg-emerald-500"
              }`}
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Peak Level</span>
            <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">{peak}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-zinc-900/60 transition-all dark:bg-zinc-100/60" style={{ width: `${peak}%` }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setLevel(Math.max(0, level - 10))} className="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            - Volume
          </button>
          <button onClick={() => setLevel(Math.min(100, level + 10))} className="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            + Volume
          </button>
        </div>
      </div>
    </div>
  );
}
