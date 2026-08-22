"use client";

import { useState } from "react";
import { Headphones } from "lucide-react";

export function PlaylistItemDemo() {
  const [active, setActive] = useState(0);
  const songs = [
    { title: "Neon Horizons", artist: "Synth Wave", duration: "3:42" },
    { title: "Deep Blue", artist: "Ocean Sounds", duration: "4:15" },
    { title: "Golden Hour", artist: "Sunset Collective", duration: "3:58" },
  ];
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Headphones className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Playlist Items</h3>
      </div>
      <div className="flex flex-col gap-1">
        {songs.map((song, i) => (
          <button
            key={song.title}
            onClick={() => setActive(i)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-all ${
              active === i
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <span className={`w-5 text-center text-xs font-bold ${active === i ? "text-white dark:text-zinc-900" : "text-zinc-400 dark:text-zinc-500"}`}>
              {active === i ? "\u25B6" : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-xs font-medium ${active === i ? "" : "text-zinc-700 dark:text-zinc-300"}`}>{song.title}</p>
              <p className={`truncate text-[10px] ${active === i ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"}`}>{song.artist}</p>
            </div>
            <span className={`text-[10px] ${active === i ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400 dark:text-zinc-500"}`}>{song.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
