"use client";

import { useState } from "react";
import { Play, Pause, Volume2, Maximize, List } from "lucide-react";

const PLAYLIST = [
  { id: 1, title: "Introduction to Design Systems", duration: "4:00", active: true },
  { id: 2, title: "Component Architecture", duration: "6:30", active: false },
  { id: 3, title: "Token System Deep Dive", duration: "5:15", active: false },
  { id: 4, title: "Building Accessible Components", duration: "7:20", active: false },
  { id: 5, title: "Testing Strategies", duration: "3:45", active: false },
];

export function PlaylistVideo() {
  const [activeId, setActiveId] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [showList, setShowList] = useState(true);

  const activeItem = PLAYLIST.find((p) => p.id === activeId) || PLAYLIST[0];

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-1">
          <div className="aspect-video bg-zinc-900">
            <video src="/video.mp4" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button onClick={() => setPlaying(!playing)} className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label={playing ? "Pause" : "Play"}>
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" fill="currentColor" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Volume">
                  <Volume2 className="h-4 w-4" />
                </button>
                <button onClick={() => setShowList(!showList)} className={`rounded-lg p-1.5 transition-all hover:bg-white/10 active:scale-90 ${showList ? "text-white" : "text-white/60"}`} aria-label="Toggle playlist">
                  <List className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-1.5 text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-90" aria-label="Fullscreen">
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {showList && (
          <div className="w-full sm:w-56 border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">Playlist</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{PLAYLIST.length} videos</span>
            </div>
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-48 sm:max-h-none overflow-y-auto">
              {PLAYLIST.map((item) => (
                <button key={item.id} onClick={() => { setActiveId(item.id); setPlaying(true); }} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 ${item.id === activeId ? "bg-zinc-50 dark:bg-zinc-900" : ""}`}>
                  <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${item.id === activeId ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                    {item.id === activeId && playing ? <Pause className="h-3 w-3" /> : item.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-medium truncate ${item.id === activeId ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}>{item.title}</p>
                    <p className="text-[9px] text-zinc-400 dark:text-zinc-500">{item.duration}</p>
                  </div>
                </button>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
