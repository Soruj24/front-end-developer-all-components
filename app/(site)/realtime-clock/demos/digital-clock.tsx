"use client";

import { useState, useEffect } from "react";

export function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState<"24h" | "12h">("24h");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", { hour12: format === "12h" });
  const date = time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-mono font-bold tabular-nums text-foreground">{formatted}</span>
        <button onClick={() => setFormat(format === "24h" ? "12h" : "24h")} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors">
          {format}
        </button>
      </div>
      <span className="text-sm text-muted-foreground">{date}</span>
    </div>
  );
}
