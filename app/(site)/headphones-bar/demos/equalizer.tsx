"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

export function EqualizerDemo() {
  const [bands, setBands] = useState([60, 70, 50, 80, 65]);
  const labels = ["Bass", "Low Mid", "Mid", "High Mid", "Treble"];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Equalizer</h3>
        </div>
        <div className="mb-2 flex items-end justify-between gap-3 h-32">
          {bands.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">{val}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={val}
                onChange={(e) => {
                  const newBands = [...bands];
                  newBands[i] = Number(e.target.value);
                  setBands(newBands);
                }}
                className="h-20 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100"
                style={{ writingMode: "vertical-lr", direction: "rtl" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {labels.map((l) => (
            <span key={l} className="text-center flex-1 text-[9px] text-zinc-500 dark:text-zinc-400">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
