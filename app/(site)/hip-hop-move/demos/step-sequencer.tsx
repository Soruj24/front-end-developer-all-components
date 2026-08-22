"use client";

import { useState, useEffect } from "react";
import { Music, Play, Pause } from "lucide-react";

export function StepSequencerDemo() {
  const [steps, setSteps] = useState(Array(16).fill(false));
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setCurrent((c) => (c >= 15 ? 0 : c + 1)), 200);
    return () => clearInterval(interval);
  }, [playing]);

  const toggle = (i: number) => {
    setSteps((prev) => prev.map((s, idx) => (idx === i ? !s : s)));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Step Sequencer</h3>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="mb-3 grid grid-cols-8 gap-1">
          {steps.map((active, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`aspect-square rounded-md transition-all ${
                active
                  ? "bg-zinc-900 dark:bg-zinc-100"
                  : "bg-zinc-200 dark:bg-zinc-700"
              } ${current === i && playing ? "ring-2 ring-zinc-900 ring-offset-1 dark:ring-zinc-100" : ""}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-zinc-500 dark:text-zinc-400">
          {["Kick", "Snare", "Hi-Hat", "Clap", "Tom", "Cymbal", "Rim", "Perc"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
