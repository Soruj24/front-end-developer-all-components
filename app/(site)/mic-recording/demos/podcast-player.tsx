"use client";

import { useState } from "react";
import { Play, Pause, Headphones } from "lucide-react";

export function PodcastPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [speed, setSpeed] = useState(1);

  const episodes = [
    { id: 1, title: "Episode 1: Getting Started", duration: "45:00" },
    { id: 2, title: "Episode 2: Advanced Tips", duration: "52:00" },
    { id: 3, title: "Episode 3: Expert Interview", duration: "38:00" },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Headphones className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Podcast Player</h3>
      </div>
      <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <Headphones className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Episode 1: Getting Started</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Design Systems Podcast</p>
          </div>
        </div>
        <div className="relative mb-2 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="absolute h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100" style={{ width: `${progress}%` }} />
        </div>
        <div className="mb-3 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
          <span>15:45</span>
          <span>45:00</span>
        </div>
        <div className="mb-3 flex items-center justify-center gap-4">
          <button className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19,20 9,12 19,4" /><line x1="5" y1="4" x2="5" y2="20" /></svg>
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>
          <button className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5,4 15,12 5,20" /><line x1="19" y1="4" x2="19" y2="20" /></svg>
          </button>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all ${
                speed === s
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-1">
        {episodes.map((ep) => (
          <div key={ep.id} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Play className="h-3.5 w-3.5 text-zinc-400" />
            <span className="flex-1 text-xs text-zinc-700 dark:text-zinc-300">{ep.title}</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{ep.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
