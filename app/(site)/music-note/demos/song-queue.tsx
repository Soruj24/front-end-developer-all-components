"use client";

import { useState } from "react";
import { Music } from "lucide-react";

export function SongQueueDemo() {
  const [queue, setQueue] = useState([
    { id: 1, title: "Sunrise Beats", artist: "MorningDJ", duration: "3:42" },
    { id: 2, title: "City Lights", artist: "Urban Flow", duration: "4:10" },
    { id: 3, title: "Chill Vibes", artist: "Lo-Fi Club", duration: "3:55" },
  ]);
  const removeFromQueue = (id: number) => setQueue((prev) => prev.filter((s) => s.id !== id));
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Music className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Song Queue</h3>
        </div>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{queue.length} tracks</span>
      </div>
      <div className="flex flex-col gap-1">
        {queue.map((song, i) => (
          <div key={song.id} className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800">
            <span className="w-4 text-center text-[10px] text-zinc-400 dark:text-zinc-500">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">{song.title}</p>
              <p className="truncate text-[10px] text-zinc-400 dark:text-zinc-500">{song.artist}</p>
            </div>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{song.duration}</span>
            <button onClick={() => removeFromQueue(song.id)} className="rounded-md p-1 text-[10px] text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-red-500 dark:hover:bg-zinc-700">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
