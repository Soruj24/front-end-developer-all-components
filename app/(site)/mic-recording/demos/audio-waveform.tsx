"use client";

import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export function AudioWaveform() {
  const [playing, setPlaying] = useState(false);
  const bars = 24;
  const [heights, setHeights] = useState(Array.from({ length: bars }, () => Math.random() * 100));

  const togglePlay = () => {
    setPlaying(!playing);
    if (!playing) {
      const interval = setInterval(() => setHeights(Array.from({ length: bars }, () => Math.random() * 100)), 150);
      setTimeout(() => clearInterval(interval), 5000);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Volume2 className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Audio Waveform</h3>
      </div>
      <div className="flex items-center gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="flex flex-1 items-end gap-[2px]">
          {heights.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm bg-zinc-900/60 transition-all duration-150 dark:bg-zinc-100/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <span className="shrink-0 text-[10px] text-zinc-400 dark:text-zinc-500">3:24</span>
      </div>
    </div>
  );
}
