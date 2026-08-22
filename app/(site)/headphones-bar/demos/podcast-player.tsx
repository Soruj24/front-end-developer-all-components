"use client";

import { useState } from "react";
import { Mic, Play, Pause } from "lucide-react";

export function PodcastPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const episodes = [
    { title: "The Future of AI", duration: "45:20", playing: false },
    { title: "Design Systems", duration: "32:15", playing: true },
    { title: "Web Development", duration: "28:45", playing: false },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Podcast</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
              <Mic className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Design Systems</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Episode 12 &middot; 32:15</p>
            </div>
            <button
              onClick={() => setPlaying(!playing)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
          </div>
          <div className="space-y-0.5">
            {episodes.map((ep) => (
              <div
                key={ep.title}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  ep.playing ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                {ep.playing ? (
                  <Pause className="h-3 w-3 shrink-0 text-zinc-600 dark:text-zinc-300" />
                ) : (
                  <Play className="h-3 w-3 shrink-0 text-zinc-400 dark:text-zinc-500" />
                )}
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-zinc-900 dark:text-zinc-100">{ep.title}</p>
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{ep.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
