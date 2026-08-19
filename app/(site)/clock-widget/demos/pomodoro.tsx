"use client";

import { useState, useEffect } from "react";
import { Brain, Coffee, Play, Pause, RotateCcw } from "lucide-react";

export function PomodoroDemo() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const durations = { work: 25 * 60, break: 5 * 60 };

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (mode === "work") {
            setSessions((s) => s + 1);
            setMode("break");
            return durations.break;
          } else {
            setMode("work");
            return durations.work;
          }
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, mode]);

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <button onClick={() => { setMode("work"); setTimeLeft(durations.work); setRunning(false); }} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${mode === "work" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            <Brain className="h-3.5 w-3.5" />
            Focus
          </button>
          <button onClick={() => { setMode("break"); setTimeLeft(durations.break); setRunning(false); }} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${mode === "break" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            <Coffee className="h-3.5 w-3.5" />
            Break
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <svg className="h-32 w-32 -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
              <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray={351.86} strokeDashoffset={351.86 - (351.86 * progress) / 100} className={`transition-all duration-1000 ${mode === "work" ? "text-red-500" : "text-emerald-500"}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-bold tabular-nums">{format(timeLeft)}</span>
              <span className="text-[10px] font-medium text-muted-foreground">{mode === "work" ? "Focus Time" : "Break Time"}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setRunning(!running)} className={`flex items-center gap-1.5 rounded-lg px-5 py-2 text-xs font-medium transition-colors ${running ? "bg-yellow-500 text-white" : "bg-foreground text-background"}`}>
              {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {running ? "Pause" : "Start"}
            </button>
            <button onClick={() => { setRunning(false); setTimeLeft(durations[mode]); }} className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-xs font-medium hover:bg-muted/80 transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i < sessions ? "bg-foreground" : "bg-muted"}`} />
          ))}
          <span className="ml-2 text-[10px] text-muted-foreground">{sessions}/4 sessions</span>
        </div>
      </div>
    </div>
  );
}
