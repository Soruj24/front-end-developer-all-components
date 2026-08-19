export const ANALYTICS_SOURCE = `"use client";

import { useState } from "react";

interface Kpi {
  title: string;
  value: string;
  change: string;
  up: boolean;
  color: string;
  spark: number[];
}

const defaultKpis: Kpi[] = [
  { title: "Page Views", value: "284,730", change: "+12.5%", up: true, color: "#3b82f6", spark: [35, 42, 38, 55, 48, 62, 58, 70] },
  { title: "Unique Visitors", value: "124,580", change: "+8.3%", up: true, color: "#22c55e", spark: [40, 52, 48, 60, 55, 68, 62, 75] },
  { title: "Bounce Rate", value: "32.1%", change: "-2.1%", up: false, color: "#f59e0b", spark: [80, 75, 72, 68, 65, 60, 55, 50] },
];

const timeRanges = ["1H", "24H", "7D", "30D", "90D"];

export function Analytics() {
  const [range, setRange] = useState("30D");

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-4 flex flex-wrap gap-2">
        {timeRanges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={\`rounded-lg px-4 py-2 text-sm font-medium transition-all \${
              range === r ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
            }\`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {defaultKpis.map((kpi) => (
          <div key={kpi.title} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.title}</p>
            <p className="mt-1 text-2xl font-bold">{kpi.value}</p>
            <span className={\`text-sm font-medium \${kpi.up ? "text-green-600" : "text-red-500"}\`}>
              {kpi.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`;

export const KPI_EXAMPLE = `<KpiSection kpis={kpiData} />`;

export const TRAFFIC_EXAMPLE = `<TrafficChartSection />`;

export const SOURCES_EXAMPLE = `<TrafficSourcesSection />`;

export const GEO_EXAMPLE = `<GeographicSection />`;

export const PAGES_EXAMPLE = `<TopPagesSection />`;

export const DEVICES_EXAMPLE = `<DevicesSection devices={deviceData} />`;