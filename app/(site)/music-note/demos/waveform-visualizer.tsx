"use client";

import { useState } from "react";
import { Music } from "lucide-react";

export function WaveformVisualizerDemo() {
  const [bars] = useState(() => Array.from({ length: 32 }, () => Math.random() * 100));
  const [activeBar, setActiveBar] = useState(8);
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Music className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Waveform Visualizer</h3>
      </div>
      <div className="flex h-20 items-end gap-px rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900">
        {bars.map((height, i) => (
          <div
            key={i}
            className={`flex-1 cursor-pointer rounded-t-sm transition-all duration-150 ${
              i <= activeBar ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
            style={{ height: `${height}%` }}
            onClick={() => setActiveBar(i)}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between px-3">
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">0:00</span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">3:24</span>
      </div>
    </div>
  );
}
