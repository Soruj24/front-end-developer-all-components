export const CLOCK_WIDGET_SOURCE = `"use client";

import { useEffect, useState } from "react";

interface ClockWidgetProps {
  showSeconds?: boolean;
  className?: string;
}

export function ClockWidget({ showSeconds = true, className = "" }: ClockWidgetProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className={\`flex items-center gap-6 \${className}\`}>
      <div className="relative h-44 w-44 rounded-full border-4 border-foreground bg-card shadow-lg">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 88 + 70 * Math.cos(angle);
          const y = 88 + 70 * Math.sin(angle);
          return (
            <span
              key={i}
              className="absolute text-[11px] font-semibold text-foreground"
              style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
            >
              {i === 0 ? 12 : i}
            </span>
          );
        })}
        <div
          className="absolute left-1/2 bottom-1/2 h-1 w-1 origin-bottom rounded-full bg-foreground"
          style={{ transform: \`translateX(-50%) rotate(\${hours * 30 + minutes * 0.5}deg)\`, height: 36 }}
        />
        <div
          className="absolute left-1/2 bottom-1/2 h-0.5 w-0.5 origin-bottom rounded-full bg-muted-foreground"
          style={{ transform: \`translateX(-50%) rotate(\${minutes * 6}deg)\`, height: 52 }}
        />
        {showSeconds && (
          <div
            className="absolute left-1/2 bottom-1/2 w-px origin-bottom rounded-full bg-red-500"
            style={{ transform: \`translateX(-50%) rotate(\${seconds * 6}deg)\`, height: 56 }}
          />
        )}
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
          <p className="text-xs font-medium">
            {time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}`;

export const ANALOG_EXAMPLE = `<ClockWidget showSeconds />`;

export const DIGITAL_EXAMPLE = `<div className="flex items-baseline gap-1">
  <span className="font-mono text-5xl font-bold tabular-nums">07</span>
  <span className="text-5xl font-bold text-muted-foreground">:</span>
  <span className="font-mono text-5xl font-bold tabular-nums">42</span>
  <span className="ml-2 text-lg font-semibold text-muted-foreground">AM</span>
</div>`;

export const STOPWATCH_EXAMPLE = `<div className="font-mono text-4xl font-bold tabular-nums">00:32:15</div>
<div className="flex gap-2">
  <button>Start</button>
  <button>Lap</button>
  <button>Reset</button>
</div>`;

export const WORLD_EXAMPLE = `const zones = [
  { label: "New York", offset: -5 },
  { label: "London", offset: 0 },
  { label: "Tokyo", offset: 9 },
];

{zones.map((z) => (
  <div key={z.label} className="rounded-xl border bg-card p-3 text-center">
    <p>{z.label}</p>
    <p>{timeInZone(z.offset)}</p>
  </div>
))}`;

export const COUNTDOWN_EXAMPLE = `const diff = target.getTime() - Date.now();
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((diff / (1000 * 60)) % 60);
const seconds = Math.floor((diff / 1000) % 60);`;

export const POMODORO_EXAMPLE = `<div className="relative">
  <svg viewBox="0 0 64 64" className="-rotate-90">
    <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
    <circle
      cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6"
      strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * progress) / 100}
      strokeLinecap="round"
    />
  </svg>
</div>`;

export const ALARM_EXAMPLE = `<div className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
  <div>
    <p className="font-mono text-lg font-bold tabular-nums">07:00</p>
    <p className="text-[10px] text-muted-foreground">Wake up</p>
  </div>
  <button className="flex h-6 w-11 items-center rounded-full bg-foreground p-0.5">
    <div className="h-5 w-5 translate-x-5 rounded-full bg-background shadow-sm" />
  </button>
</div>`;
