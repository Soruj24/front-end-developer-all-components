"use client";

import { Video } from "@/components/ui/Video";

export function PosterVideo() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative group cursor-pointer">
        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <img src="/poster.jpg" alt="Video poster" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-xl backdrop-blur transition-all group-hover:scale-110">
            <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Video with Poster</p>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Click to play</p>
      </div>
    </div>
  );
}
