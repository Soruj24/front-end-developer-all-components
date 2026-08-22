"use client";

import { useState } from "react";
import { Volume2, Play, Pause } from "lucide-react";

export function DjBoothDemo() {
  const [volume, setVolume] = useState(75);
  const [bpm, setBpm] = useState(128);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">DJ Booth</h3>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => setPlaying(!playing)} className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900">
            {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
          </button>
          <div className="text-center">
            <p className="text-2xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">{bpm}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">BPM</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setBpm((b) => Math.max(60, b - 4))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">-</button>
            <button onClick={() => setBpm((b) => Math.min(200, b + 4))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">+</button>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Volume</span>
            <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{volume}%</span>
          </div>
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        </div>
        <div className="flex gap-2">
          {["4/4", "3/4", "6/8"].map((t) => (
            <button key={t} className="flex-1 rounded-lg bg-zinc-100 px-2 py-1.5 text-[10px] font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
