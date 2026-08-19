"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";

export function ProgressBarDemo() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const totalSeconds = 420;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setProgress((p) => { if (p >= 100) { setRunning(false); return 100; } return p + 100 / totalSeconds; });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const elapsed = Math.round((progress / 100) * totalSeconds);
  const remaining = totalSeconds - elapsed;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Hard Boiled Egg</h3>
          <span className="text-xs text-muted-foreground">{Math.floor(remaining / 60)}m {remaining % 60}s left</span>
        </div>
        <div className="mb-2 h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</span>
          <span>{Math.floor(totalSeconds / 60)}:{String(totalSeconds % 60).padStart(2, "0")}</span>
        </div>
      </div>
      <button
        onClick={() => { setProgress(0); setRunning(true); }}
        disabled={running}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
          running ? "bg-muted text-muted-foreground" : "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
        }`}
      >
        {running ? (
          <><div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Cooking...</>
        ) : (
          <><Play className="h-4 w-4" /> Start Timer</>
        )}
      </button>
    </div>
  );
}
