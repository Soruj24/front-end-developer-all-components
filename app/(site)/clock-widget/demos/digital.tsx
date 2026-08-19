"use client";

import { useState, useEffect } from "react";

export function DigitalClockDemo() {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState<"12h" | "24h">("12h");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = format === "12h" ? time.getHours() % 12 || 12 : time.getHours();
  const period = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl border border-black/[.08] bg-card px-8 py-6 shadow-sm dark:border-white/[.145]">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold font-mono tabular-nums">{String(hours).padStart(2, "0")}</span>
          <span className="text-5xl font-bold text-muted-foreground animate-pulse">:</span>
          <span className="text-5xl font-bold font-mono tabular-nums">{String(time.getMinutes()).padStart(2, "0")}</span>
          <span className="text-5xl font-bold text-muted-foreground animate-pulse">:</span>
          <span className="text-5xl font-bold font-mono tabular-nums">{String(time.getSeconds()).padStart(2, "0")}</span>
          {format === "12h" && <span className="ml-2 text-lg font-semibold text-muted-foreground">{period}</span>}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">{time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setFormat((f) => (f === "12h" ? "24h" : "12h"))} className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
          Switch to {format === "12h" ? "24h" : "12h"}
        </button>
      </div>
    </div>
  );
}
