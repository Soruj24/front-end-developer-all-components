"use client";

import { useState, useEffect } from "react";
import { Radio } from "lucide-react";

export function AudioVisualizerDemo() {
  const [bars, setBars] = useState<number[]>(Array(20).fill(5));

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
          <Radio className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Audio Visualizer</h3>
        </div>
        <div className="flex items-end justify-center gap-1 h-24">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-t bg-zinc-900 transition-all duration-150 dark:bg-zinc-100"
              style={{ height: `${h * 4}px`, opacity: 0.5 + (h / 22) * 0.5 }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>60Hz</span>
          <span>250Hz</span>
          <span>1kHz</span>
          <span>4kHz</span>
          <span>16kHz</span>
        </div>
      </div>
    </div>
  );
}
