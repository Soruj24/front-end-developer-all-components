"use client";

import { useState, useEffect } from "react";
import { Music, Play, Pause, SkipBack, SkipForward } from "lucide-react";

export function MusicPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentTime] = useState("1:23");
  const [duration] = useState("4:02");

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="relative h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-12 w-12 text-purple-400" />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-3 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Midnight Dreams</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Luna Wave</p>
          </div>
          <div className="mb-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{currentTime}</span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
