"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export function CookingTimerDemo() {
  const [items, setItems] = useState<{ id: number; name: string; time: number; left: number; running: boolean }[]>([
    { id: 1, name: "Eggs", time: 300, left: 300, running: false },
    { id: 2, name: "Toast", time: 120, left: 120, running: false },
    { id: 3, name: "Bacon", time: 480, left: 480, running: false },
    { id: 4, name: "Coffee", time: 240, left: 240, running: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((ts) => ts.map((t) => {
        if (!t.running || t.left <= 0) return { ...t, running: false };
        return { ...t, left: t.left - 1 };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (id: number) => {
    setItems((ts) => ts.map((t) => t.id === id ? { ...t, running: !t.running } : t));
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Breakfast Prep</h3>
        <div className="grid grid-cols-2 gap-3">
          {items.map((t) => {
            const progress = ((t.time - t.left) / t.time) * 100;
            const mins = Math.floor(t.left / 60);
            const secs = t.left % 60;
            const done = t.left <= 0;
            return (
              <div key={t.id} className={`rounded-lg border p-3 transition-all ${
                done ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/20" : "border-black/[.08] dark:border-white/[.145]"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">{t.name}</span>
                  {done && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
                <div className={`text-lg font-bold font-mono tabular-nums ${
                  done ? "text-emerald-600 dark:text-emerald-400" : ""
                }`}>
                  {done ? "Done!" : `${mins}:${String(secs).padStart(2, "0")}`}
                </div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${
                    done ? "bg-emerald-500" : "bg-primary"
                  }`} style={{ width: `${progress}%` }} />
                </div>
                <button
                  onClick={() => toggle(t.id)}
                  disabled={done}
                  className="mt-2 w-full rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 disabled:opacity-50"
                >
                  {t.running ? "Pause" : "Start"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
