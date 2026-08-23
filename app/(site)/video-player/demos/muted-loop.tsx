"use client";

import { Video } from "@/components/ui/Video";

export function MutedLoop() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative overflow-hidden rounded-xl m-3">
        <video src="/video.mp4" muted loop autoPlay className="w-full aspect-video object-cover" />
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-medium text-white">Live</span>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Background Playback</p>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Muted, looping, autoplay</p>
      </div>
    </div>
  );
}
