"use client";

import { useState } from "react";
import { Target } from "lucide-react";

export function ProgressRing() {
  const [progress, setProgress] = useState(72);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <Target className="h-4 w-4 text-emerald-500" />
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Progress Ring</span>
      </div>
      <div className="flex flex-col items-center gap-4 py-5">
        <div className="relative">
          <svg className="h-36 w-36 -rotate-90">
            <circle cx="68" cy="68" r="54" fill="none" stroke="currentColor" strokeWidth="10" className="text-zinc-100 dark:text-zinc-800" />
            <circle cx="68" cy="68" r="54" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-emerald-500 transition-all duration-700" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{progress}%</span>
          </div>
        </div>
        <input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full max-w-xs accent-emerald-500" />
      </div>
    </div>
  );
}
