"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

export function MusicVisualizerDemo() {
  const [bars, setBars] = useState<number[]>(Array(16).fill(5));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 20) + 2));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Beat Visualizer</h3>
        </div>
        <div className="flex h-20 items-end justify-center gap-1">
          {bars.map((h, i) => (
            <div key={i} className="w-3 rounded-t transition-all duration-150" style={{ height: `${h * 4}px`, backgroundColor: `hsl(${280 + i * 5}, 70%, 50%)`, opacity: 0.6 + (h / 22) * 0.4 }} />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[9px] text-zinc-500 dark:text-zinc-400">
          <span>808</span>
          <span>Snare</span>
          <span>Hi-Hat</span>
          <span>Kick</span>
        </div>
      </div>
    </div>
  );
}
