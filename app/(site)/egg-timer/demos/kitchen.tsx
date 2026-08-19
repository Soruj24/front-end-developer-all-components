"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export function KitchenTimerDemo() {
  const [timers, setTimers] = useState<{ id: number; label: string; time: number; left: number; running: boolean }[]>([
    { id: 1, label: "Pasta", time: 600, left: 600, running: false },
    { id: 2, label: "Rice", time: 900, left: 900, running: false },
    { id: 3, label: "Tea", time: 180, left: 180, running: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((ts) => ts.map((t) => {
        if (!t.running || t.left <= 0) return { ...t, running: false };
        return { ...t, left: t.left - 1 };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id: number) => {
    setTimers((ts) => ts.map((t) => t.id === id ? { ...t, running: !t.running } : t));
  };

  const resetTimer = (id: number) => {
    setTimers((ts) => ts.map((t) => t.id === id ? { ...t, left: t.time, running: false } : t));
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Kitchen Timers</h3>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {timers.map((t) => {
            const progress = ((t.time - t.left) / t.time) * 100;
            const mins = Math.floor(t.left / 60);
            const secs = t.left % 60;
            return (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{t.label}</span>
                    <span className="text-xs font-mono tabular-nums">{mins}:{String(secs).padStart(2, "0")}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button onClick={() => toggleTimer(t.id)} className="rounded-md p-1.5 hover:bg-muted">
                  {t.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button onClick={() => resetTimer(t.id)} className="rounded-md p-1.5 hover:bg-muted">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
