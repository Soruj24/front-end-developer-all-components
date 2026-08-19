"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [total, setTotal] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || total <= 0) return;
    const interval = setInterval(() => setTotal((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, total]);

  const mins = Math.floor(total / 60);
  const secs = total % 60;
  const progress = ((300 - total) / 300) * 100;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary" strokeDasharray={`${progress * 2.64} 264`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-mono font-bold tabular-nums text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setRunning(!running)} className={`px-4 py-2 rounded-lg text-sm font-medium ${running ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setTotal(300); setRunning(false); }} className="px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground">Reset</button>
      </div>
    </div>
  );
}
