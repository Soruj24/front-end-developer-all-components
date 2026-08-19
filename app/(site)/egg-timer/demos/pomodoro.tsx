"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export function PomodoroTimerDemo() {
  const [phase, setPhase] = useState<"focus" | "short" | "long">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const phaseConfig = {
    focus: { time: 25 * 60, label: "Focus", color: "from-blue-500 to-indigo-600" },
    short: { time: 5 * 60, label: "Short Break", color: "from-emerald-500 to-teal-500" },
    long: { time: 15 * 60, label: "Long Break", color: "from-purple-500 to-pink-500" },
  };

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (running && timeLeft <= 0) {
        if (phase === "focus") {
          const newSessions = sessions + 1;
          setSessions(newSessions);
          setPhase(newSessions % 4 === 0 ? "long" : "short");
          setTimeLeft(newSessions % 4 === 0 ? phaseConfig.long.time : phaseConfig.short.time);
        } else {
          setPhase("focus");
          setTimeLeft(phaseConfig.focus.time);
        }
        setRunning(false);
      }
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft, phase, sessions]);

  const total = phaseConfig[phase].time;
  const progress = ((total - timeLeft) / total) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl bg-gradient-to-br ${phaseConfig[phase].color} p-6 text-center text-white shadow-lg`}>
        <span className="text-sm font-bold">{phaseConfig[phase].label}</span>
        <div className="my-4 text-5xl font-extrabold font-mono tabular-nums">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div className="mb-4 flex justify-center gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i < sessions % 4 ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-white/30 overflow-hidden">
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
          onClick={() => { setPhase("focus"); setTimeLeft(phaseConfig.focus.time); setRunning(false); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
