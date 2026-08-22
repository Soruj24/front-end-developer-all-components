"use client";

import { useState } from "react";
import { Radar, Pause, Play } from "lucide-react";

export function AnimatedRadar() {
  const [running, setRunning] = useState(true);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative h-40 w-40">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-5 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-10 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-15 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        {running && (
          <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "2s" }} />
        )}
        <div className="absolute left-[25%] top-[20%] h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
        <div className="absolute right-[25%] top-[35%] h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
        <div className="absolute bottom-[25%] left-[65%] h-2 w-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
      </div>
      <button
        onClick={() => setRunning(!running)}
        className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        {running ? "Pause" : "Resume"}
      </button>
    </div>
  );
}
