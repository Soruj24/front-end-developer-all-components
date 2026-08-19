"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

export function ClockPresetDemo({ label, emoji }: { label: string; emoji: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-bold tabular-nums">00:00</span>
    </div>
  );
}

export function TimeDisplayDemo() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-black/[.08] bg-card px-6 py-4 shadow-sm dark:border-white/[.145]">
      <span className="text-[10px] font-medium text-muted-foreground">Current Time</span>
      <span className="font-mono text-3xl font-bold tabular-nums">
        {String(time.getHours()).padStart(2, "0")}:{String(time.getMinutes()).padStart(2, "0")}:{String(time.getSeconds()).padStart(2, "0")}
      </span>
    </div>
  );
}

export function BellDemo() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-black/[.08] bg-card px-4 py-3 shadow-sm dark:border-white/[.145]">
      <Bell className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">Alarm</span>
    </div>
  );
}
