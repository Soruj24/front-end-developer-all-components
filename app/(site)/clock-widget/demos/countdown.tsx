"use client";

import { useState, useEffect } from "react";

export function CountdownDemo() {
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };
    setRemaining(calc());
    const interval = setInterval(() => setRemaining(calc()), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl border border-black/[.08] bg-card px-6 py-4 shadow-sm dark:border-white/[.145]">
        <p className="text-center text-xs font-medium text-muted-foreground">Countdown to Launch</p>
        <div className="mt-3 flex items-center gap-3">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="font-mono text-3xl font-bold tabular-nums">{String(u.value).padStart(2, "0")}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{u.label}</span>
              </div>
              {i < units.length - 1 && <span className="text-2xl font-bold text-muted-foreground/30">:</span>}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Target: {target.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
    </div>
  );
}
