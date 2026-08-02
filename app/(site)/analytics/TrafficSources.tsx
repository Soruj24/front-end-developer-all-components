"use client";

import { conicGradient, trafficSources } from "./data";

export function TrafficSourcesSection() {
  return (
    <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold text-foreground">Traffic Sources</h2>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-40 w-40 shrink-0">
          <div className="h-full w-full rounded-full" style={{ background: conicGradient }} />
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-background">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{trafficSources[0].pct}%</p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Organic</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          {trafficSources.map((t) => (
            <div key={t.source} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="w-16 font-medium text-muted-foreground">{t.source}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted dark:bg-muted">
                <div className="h-full rounded-full transition-all" style={{ width: `${t.pct}%`, backgroundColor: t.color }} />
              </div>
              <span className="w-10 text-right text-muted-foreground">{t.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="pb-3 pr-4 font-medium text-muted-foreground">Source</th>
              <th scope="col" className="pb-3 pr-4 font-medium text-muted-foreground">Visitors</th>
              <th scope="col" className="pb-3 pr-4 font-medium text-muted-foreground">%</th>
              <th scope="col" className="pb-3 font-medium text-muted-foreground">Change</th>
            </tr>
          </thead>
          <tbody>
            {trafficSources.map((t) => (
              <tr key={t.source} className="border-b border-border last:border-b-0 dark:border-border">
                <td className="py-3 pr-4 font-medium text-foreground">{t.source}</td>
                <td className="py-3 pr-4 text-muted-foreground">{t.visitors.toLocaleString()}</td>
                <td className="py-3 pr-4 text-muted-foreground">{t.pct}%</td>
                <td className={`py-3 text-sm ${t.up ? "text-green-600" : "text-red-500"}`}>
                  <span className="inline-flex items-center gap-0.5">
                    {t.up ? (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    {t.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
