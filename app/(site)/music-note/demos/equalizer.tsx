"use client";

import { useState } from "react";
import { Music } from "lucide-react";

export function EqualizerDemo() {
  const [bands, setBands] = useState([65, 45, 80, 55, 70, 40, 75, 60]);
  const labels = ["32", "64", "125", "250", "500", "1K", "4K", "16K"];
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Music className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Equalizer</h3>
      </div>
      <div className="flex items-end gap-2 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
        {bands.map((val, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <input
              type="range"
              min={0}
              max={100}
              value={val}
              onChange={(e) => setBands((prev) => prev.map((v, j) => j === i ? Number(e.target.value) : v))}
              className="h-24 w-4 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100"
              style={{ writingMode: "vertical-lr", direction: "rtl" }}
            />
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
