"use client";

import type { Kpi } from "../types/analytics";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-8 items-end gap-[1px]">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-2 rounded-t transition-all hover:opacity-80"
          style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(to top, ${color}88, ${color})` }}
        />
      ))}
    </div>
  );
}

interface KpiSectionProps {
  kpis: Kpi[];
}

export function KpiSection({ kpis }: KpiSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className="rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md dark:border-border dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.title}</p>
            <svg className="h-4 w-4 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={kpi.icon} />
            </svg>
          </div>
          <p className="mt-1 text-2xl font-bold text-foreground">{kpi.value}</p>
          <div className="mt-1 flex items-center gap-1">
            <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {kpi.up ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            <span className="text-sm font-medium text-green-600">{kpi.change}</span>
          </div>
          <div className="mt-3">
            <Sparkline data={kpi.spark} color={kpi.color} />
          </div>
        </div>
      ))}
    </div>
  );
}
