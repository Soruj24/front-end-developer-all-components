"use client";

import { useState, useEffect } from "react";

export function WorldClockDemo() {
  const zones = [
    { label: "New York", offset: -5, flag: "US", color: "bg-blue-500" },
    { label: "London", offset: 0, flag: "UK", color: "bg-red-500" },
    { label: "Tokyo", offset: 9, flag: "JP", color: "bg-pink-500" },
    { label: "Sydney", offset: 11, flag: "AU", color: "bg-emerald-500" },
    { label: "Dubai", offset: 4, flag: "AE", color: "bg-green-500" },
  ];

  const [times, setTimes] = useState(() =>
    zones.map((z) => {
      const d = new Date();
      d.setHours(d.getHours() + z.offset - d.getTimezoneOffset() / 60);
      return d;
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(zones.map((z) => {
        const d = new Date();
        d.setHours(d.getHours() + z.offset - d.getTimezoneOffset() / 60);
        return d;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-3">
      {zones.map((z, i) => (
        <div key={z.label} className="rounded-xl border border-black/[.08] bg-card p-3 shadow-sm text-center dark:border-white/[.145]">
          <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${z.color}`}>
            <span className="text-[10px] font-bold text-white">{z.flag}</span>
          </div>
          <p className="mt-2 text-[10px] font-medium text-muted-foreground">{z.label}</p>
          <p className="font-mono text-lg font-bold tabular-nums">
            {String(times[i].getHours()).padStart(2, "0")}:{String(times[i].getMinutes()).padStart(2, "0")}
          </p>
          <p className="text-[10px] text-muted-foreground/60">{times[i].getHours() >= 12 ? "PM" : "AM"}</p>
        </div>
      ))}
    </div>
  );
}
