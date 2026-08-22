"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

export function EcgVisualizationDemo() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((o) => (o >= 200 ? 0 : o + 2)), 20);
    return () => clearInterval(interval);
  }, []);

  const generatePath = () => {
    const points: string[] = [];
    for (let x = 0; x < 200; x += 2) {
      const y = 50 + Math.sin((x + offset) * 0.05) * 5 + (x % 20 === 0 ? -20 : 0);
      points.push(`${x} ${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">ECG Monitor</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="relative h-24 overflow-hidden rounded-lg bg-zinc-950 dark:bg-black">
            <svg viewBox="0 0 200 100" className="h-full w-full">
              <path d={generatePath()} fill="none" stroke="#22c55e" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>Lead II</span>
            <span>25mm/s</span>
            <span>10mm/mV</span>
          </div>
        </div>
      </div>
    </div>
  );
}
