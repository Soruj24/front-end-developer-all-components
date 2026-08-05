"use client";

import { useEffect, useState } from "react";
import type { Device } from "../types/analytics";

interface DevicesSectionProps {
  devices: Device[];
}

export function DevicesSection({ devices }: DevicesSectionProps) {
  const [visitorsNow, setVisitorsNow] = useState(847);

  useEffect(() => {
    const t = setInterval(() => {
      setVisitorsNow((p) => Math.max(200, p + Math.floor(Math.random() * 41) - 20));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className="rounded-xl border border-border bg-white p-6 lg:col-span-1 dark:border-border dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </div>
          <h2 className="text-sm font-semibold text-muted-foreground">Visitors Right Now</h2>
        </div>
        <p className="mt-3 text-4xl font-bold tracking-tight text-foreground">{visitorsNow.toLocaleString()}</p>
        <p className="mt-1 text-xs text-muted-foreground">Live from all sources</p>
      </div>

      {devices.map((d) => (
        <div key={d.name} className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" style={{ color: d.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d.icon} />
              </svg>
              <span className="text-sm font-medium text-muted-foreground">{d.name}</span>
            </div>
            <span className="text-lg font-bold text-foreground">{d.pct}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-muted dark:bg-muted overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{d.count} users</p>
        </div>
      ))}
    </div>
  );
}
