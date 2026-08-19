"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Flag, RotateCcw } from "lucide-react";

export function StopwatchDemo() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((e) => e + 10), 10);
    return () => clearInterval(interval);
  }, [running]);

  const format = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const cent = Math.floor((ms % 1000) / 10);
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(cent).padStart(2, "0")}`;
  };

  const addLap = () => {
    const lastLap = laps.length > 0 ? laps[0] : 0;
    setLaps([elapsed - lastLap, ...laps]);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="text-center">
          <span className="text-[10px] font-medium text-muted-foreground">Elapsed Time</span>
          <p className="mt-1 font-mono text-4xl font-bold tabular-nums">{format(elapsed)}</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={() => setRunning(!running)} className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${running ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-foreground text-background hover:bg-foreground/90"}`}>
            {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {running ? "Pause" : "Start"}
          </button>
          {running && (
            <button onClick={addLap} className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-xs font-medium hover:bg-muted/80 transition-colors">
              <Flag className="h-3.5 w-3.5" />
              Lap
            </button>
          )}
          {!running && elapsed > 0 && (
            <button onClick={() => { setRunning(false); setElapsed(0); setLaps([]); }} className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-xs font-medium hover:bg-muted/80 transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
        {laps.length > 0 && (
          <div className="mt-4 space-y-1 max-h-32 overflow-y-auto">
            {laps.map((lap, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">Lap {laps.length - i}</span>
                <span className="font-mono font-medium tabular-nums">{format(lap)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
