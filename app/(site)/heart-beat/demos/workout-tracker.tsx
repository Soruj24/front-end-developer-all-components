"use client";

import { useState, useEffect } from "react";
import { Activity, Heart, Flame, Zap } from "lucide-react";

export function WorkoutTrackerDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Workout Session</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 text-center">
            <p className="text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">{formatTime(elapsed)}</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{active ? "In Progress" : "Paused"}</p>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-950/20">
              <Heart className="mx-auto mb-1 h-4 w-4 text-red-500" />
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">142</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">BPM</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-3 text-center dark:bg-orange-950/20">
              <Flame className="mx-auto mb-1 h-4 w-4 text-orange-500" />
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">320</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Cal</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-950/20">
              <Zap className="mx-auto mb-1 h-4 w-4 text-blue-500" />
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">85</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Avg BPM</p>
            </div>
          </div>
          <button
            onClick={() => setActive(!active)}
            className={`w-full rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              active
                ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            }`}
          >
            {active ? "Stop Workout" : "Start Workout"}
          </button>
        </div>
      </div>
    </div>
  );
}
