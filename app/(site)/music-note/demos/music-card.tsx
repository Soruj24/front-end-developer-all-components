"use client";

import { useState } from "react";
import { Headphones, Play } from "lucide-react";

export function MusicCardDemo() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Headphones className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Music Card</h3>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5 text-white shadow-xl shadow-purple-500/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold">Electric Dreams</p>
            <p className="text-sm text-white/70">Neon Pulse &middot; 2024</p>
          </div>
          <button onClick={() => setLiked(!liked)} className="transition-colors hover:scale-110">
            <span className={`text-lg ${liked ? "text-red-300" : "text-white/60 hover:text-white"}`}>{liked ? "\u2665" : "\u2661"}</span>
          </button>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95">
            <Play className="ml-0.5 h-4 w-4" />
          </button>
          <div className="h-1 flex-1 rounded-full bg-white/20">
            <div className="h-full w-[45%] rounded-full bg-white" />
          </div>
          <span className="text-xs text-white/70">2:15 / 5:02</span>
        </div>
      </div>
    </div>
  );
}
