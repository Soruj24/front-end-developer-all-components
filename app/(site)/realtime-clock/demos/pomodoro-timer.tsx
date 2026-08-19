"use client";

import { useState, useEffect } from "react";
import { Clock, Sun } from "lucide-react";

export function PomodoroTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [running, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const total = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = ((total - seconds) / total) * 100;

  const switchMode = (m: "work" | "break") => {
    setMode(m);
    setRunning(false);
    setSeconds(m === "work" ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <button onClick={() => switchMode("work")} className={`px-3 py-1 rounded-full text-xs font-medium ${mode === "work" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          <Clock className="h-3 w-3 inline mr-1" /> Work (25m)
        </button>
        <button onClick={() => switchMode("break")} className={`px-3 py-1 rounded-full text-xs font-medium ${mode === "break" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          <Sun className="h-3 w-3 inline mr-1" /> Break (5m)
        </button>
      </div>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className={mode === "work" ? "text-primary" : "text-green-500"} strokeDasharray={`${progress * 2.64} 264`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-mono font-bold tabular-nums text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>
      <button onClick={() => setRunning(!running)} className={`px-4 py-2 rounded-lg text-sm font-medium ${running ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}>
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
}
