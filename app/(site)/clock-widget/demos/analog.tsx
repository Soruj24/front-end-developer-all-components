"use client";

import { useState, useEffect } from "react";

export function AnalogClockDemo() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-44 w-44 rounded-full border-4 border-foreground bg-card shadow-lg">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 88 + 70 * Math.cos(angle);
          const y = 88 + 70 * Math.sin(angle);
          return (
            <span key={i} className="absolute text-[11px] font-semibold text-foreground" style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>
              {i === 0 ? 12 : i}
            </span>
          );
        })}
        <div className="absolute left-1/2 bottom-1/2 h-1 w-1 origin-bottom rounded-full bg-foreground" style={{ transform: `translateX(-50%) rotate(${hours * 30 + minutes * 0.5}deg)`, height: 36 }} />
        <div className="absolute left-1/2 bottom-1/2 h-0.5 w-0.5 origin-bottom rounded-full bg-muted-foreground" style={{ transform: `translateX(-50%) rotate(${minutes * 6}deg)`, height: 52 }} />
        <div className="absolute left-1/2 bottom-1/2 w-px origin-bottom rounded-full bg-red-500" style={{ transform: `translateX(-50%) rotate(${seconds * 6}deg)`, height: 56 }} />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="rounded-xl border border-black/[.08] bg-card px-4 py-3 shadow-sm dark:border-white/[.145]">
          <span className="text-[10px] font-medium text-muted-foreground">Local Time</span>
          <p className="font-mono text-2xl font-bold tabular-nums">
            {String(time.getHours()).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>
        <div className="rounded-xl border border-black/[.08] bg-card px-4 py-2 shadow-sm dark:border-white/[.145]">
          <span className="text-[10px] font-medium text-muted-foreground">Date</span>
          <p className="text-xs font-medium">{time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
        </div>
      </div>
    </div>
  );
}
