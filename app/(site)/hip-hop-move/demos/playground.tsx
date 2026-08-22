"use client";

import { useState, useEffect } from "react";
import { Music, Play, Pause } from "lucide-react";
import { DanceMoveRenderer } from "./dance-move-renderer";

export function PlaygroundDemo() {
  const [selected, setSelected] = useState("bounce");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [bars, setBars] = useState<number[]>(Array(12).fill(5));

  const moves = [
    { id: "bounce", name: "Bounce" },
    { id: "wave", name: "Wave" },
    { id: "pop", name: "Pop" },
    { id: "lock", name: "Lock" },
  ];

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 20) + 2));
    }, 150);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <Music className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Dance Move</p>
        </div>
        <div className="mb-4 flex justify-center">
          <DanceMoveRenderer move={selected} size={100} />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {moves.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all ${
                selected === m.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Beat Visualizer</p>
          </div>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{playing ? "Playing" : "Paused"}</span>
        </div>
        <div className="mb-2 flex h-16 items-end justify-center gap-0.5">
          {bars.map((h, i) => (
            <div key={i} className="w-2 rounded-t transition-all duration-150" style={{ height: `${h * 3}px`, backgroundColor: `hsl(${280 + i * 8}, 70%, 50%)`, opacity: 0.5 + (h / 22) * 0.5 }} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-zinc-500 dark:text-zinc-400">Volume</span>
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
          <span className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400">{volume}%</span>
        </div>
      </div>
    </div>
  );
}
