"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Zap, Coffee } from "lucide-react";

export function WorkoutTimerDemo() {
  const [mode, setMode] = useState<"work" | "rest">("work");
  const [timeLeft, setTimeLeft] = useState(30);
  const [rounds, setRounds] = useState(0);
  const [running, setRunning] = useState(false);
  const workTime = 30;
  const restTime = 10;

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (running && timeLeft <= 0) {
        if (mode === "work") {
          setMode("rest");
          setTimeLeft(restTime);
          setRounds((r) => r + 1);
        } else {
          setMode("work");
          setTimeLeft(workTime);
        }
      }
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft, mode]);

  const progress = mode === "work" ? ((workTime - timeLeft) / workTime) * 100 : ((restTime - timeLeft) / restTime) * 100;

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl p-6 text-center transition-all ${
        mode === "work" ? "bg-gradient-to-br from-red-500 to-orange-500 text-white" : "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
      }`}>
        <div className="mb-2 flex items-center justify-center gap-2">
          {mode === "work" ? <Zap className="h-5 w-5" /> : <Coffee className="h-5 w-5" />}
          <span className="text-sm font-bold uppercase">{mode === "work" ? "Work" : "Rest"}</span>
        </div>
        <div className="text-5xl font-extrabold font-mono tabular-nums">{timeLeft}</div>
        <div className="mt-2 text-xs opacity-80">Round {rounds + 1}</div>
        <div className="mt-3 h-1.5 rounded-full bg-white/30 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => { setMode("work"); setTimeLeft(workTime); setRunning(false); setRounds(0); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
