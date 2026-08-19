"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export function WorldClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { label: "New York", tz: "America/New_York" },
    { label: "London", tz: "Europe/London" },
    { label: "Tokyo", tz: "Asia/Tokyo" },
    { label: "Sydney", tz: "Australia/Sydney" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {zones.map((z) => (
        <div key={z.tz} className="rounded-xl border p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{z.label}</span>
          </div>
          <span className="text-lg font-mono font-bold tabular-nums text-foreground">
            {time.toLocaleTimeString("en-US", { timeZone: z.tz, hour: "2-digit", minute: "2-digit", hour12: false })}
          </span>
        </div>
      ))}
    </div>
  );
}
