"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { EggType, eggPresets } from "./shared";

export function EggTimerDemo() {
  const [selected, setSelected] = useState<EggType>("medium");
  const [timeLeft, setTimeLeft] = useState(eggPresets.medium.time);
  const [running, setRunning] = useState(false);
  const totalTime = eggPresets[selected].time;

  useEffect(() => {
    if (!running || timeLeft <= 0) { setRunning(false); return; }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-2">
        {(["soft", "medium", "hard"] as EggType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setSelected(t); setTimeLeft(eggPresets[t].time); setRunning(false); }}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              selected === t
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {eggPresets[t].emoji} {eggPresets[t].label}
          </button>
        ))}
      </div>

      <div className="relative h-36 w-36">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
          <circle
            cx="50" cy="50" r="42" fill="none" strokeWidth="6"
            strokeDasharray={`${progress * 2.64} 264`}
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{ stroke: selected === "soft" ? "#fb923c" : selected === "medium" ? "#f59e0b" : "#ca8a04" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground">{eggPresets[selected].label}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => { setTimeLeft(eggPresets[selected].time); setRunning(false); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
