export const REALTIME_CLOCK_SOURCE = `"use client";

import { useEffect, useState } from "react";

interface RealtimeClockProps {
  format?: "12h" | "24h";
  timezone?: string;
  showSeconds?: boolean;
  className?: string;
}

export function RealtimeClock({ format = "24h", timezone, showSeconds = true, className = "" }: RealtimeClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", {
    hour12: format === "12h",
    timeZone: timezone,
    second: showSeconds ? "2-digit" : undefined,
  });

  const date = time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className={"flex flex-col items-center gap-3 " + className}>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-mono font-bold tabular-nums text-foreground">{formatted}</span>
      </div>
      <span className="text-sm text-muted-foreground">{date}</span>
    </div>
  );
}`;

export const ANALOG_EXAMPLE = `<div className="relative h-40 w-40 rounded-full border-4 border-foreground/10">
  <div
    className="absolute h-10 w-1 bg-foreground/70 origin-bottom"
    style={{ transformOrigin: "bottom center", transform: \`rotate(\${hours * 30 + minutes * 0.5}deg)\` }}
  />
  <div
    className="absolute h-14 w-0.5 bg-foreground origin-bottom"
    style={{ transformOrigin: "bottom center", transform: \`rotate(\${minutes * 6}deg)\` }}
  />
  <div
    className="absolute h-14 w-px bg-red-500 origin-bottom"
    style={{ transformOrigin: "bottom center", transform: \`rotate(\${seconds * 6}deg)\` }}
  />
  <div className="absolute h-3 w-3 rounded-full bg-primary" />
</div>`;

export const DIGITAL_EXAMPLE = `<RealtimeClock format="12h" showSeconds />`;

export const WORLD_EXAMPLE = `const zones = [
  { label: "New York", tz: "America/New_York" },
  { label: "London", tz: "Europe/London" },
  { label: "Tokyo", tz: "Asia/Tokyo" },
];

{zones.map((z) => (
  <div key={z.tz} className="rounded-xl border p-3 text-center">
    <span>{z.label}</span>
    <RealtimeClock timezone={z.tz} />
  </div>
))}`;

export const STOPWATCH_EXAMPLE = `<span className="text-4xl font-mono font-bold tabular-nums">
  {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
</span>
<span className="text-lg font-mono text-muted-foreground">.{String(ms).padStart(2, "0")}</span>`;

export const COUNTDOWN_EXAMPLE = `<div className="relative h-32 w-32">
  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6"
      strokeDasharray={progress * 2.64 + " 264"} strokeLinecap="round" />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-2xl font-mono font-bold tabular-nums">04:58</span>
  </div>
</div>`;

export const ALARM_EXAMPLE = `<div className="flex items-center gap-3">
  <AlarmClock className="h-4 w-4 text-primary" />
  <span className="text-sm text-muted-foreground">Alarm: 08:00</span>
  <button className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">On</button>
</div>`;

export const POMODORO_EXAMPLE = `<div className="flex gap-2">
  <button className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
    Work (25m)
  </button>
  <button className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
    Break (5m)
  </button>
</div>`;
