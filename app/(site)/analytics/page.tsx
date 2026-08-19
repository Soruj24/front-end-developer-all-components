"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const SOURCE = `"use client";

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

interface TrafficChartProps {
  range: string;
}

export function TrafficChart({ range }: TrafficChartProps) {
  return <div className="h-64 rounded-lg border border-border bg-card p-4">Traffic chart for {range}</div>;
}

interface TrafficSourcesProps {
  range: string;
}

export function TrafficSources({ range }: TrafficSourcesProps) {
  return <div className="rounded-lg border border-border bg-card p-4">Traffic sources for {range}</div>;
}

interface GeographicProps {
  range: string;
}

export function Geographic({ range }: GeographicProps) {
  return <div className="rounded-lg border border-border bg-card p-4">Geographic data for {range}</div>;
}

interface TopPagesProps {
  range: string;
}

export function TopPages({ range }: TopPagesProps) {
  return <div className="rounded-lg border border-border bg-card p-4">Top pages for {range}</div>;
}

interface DevicesProps {
  devices: any[];
}

export function Devices({ devices }: DevicesProps) {
  return <div className="rounded-lg border border-border bg-card p-4">Devices: {devices.length}</div>;
}`;

const KPI_EXAMPLE = `<KpiSection kpis={kpiData} />`;
const TRAFFIC_EXAMPLE = `<TrafficChartSection />`;
const SOURCES_EXAMPLE = `<TrafficSourcesSection />`;
const GEO_EXAMPLE = `<GeographicSection />`;
const PAGES_EXAMPLE = `<TopPagesSection />`;
const DEVICES_EXAMPLE = `<DevicesSection devices={deviceData} />`;

const kpiData = [
  { title: "Page Views", value: "284,730", change: "+12.5%", up: true, color: "#3b82f6", spark: [35, 42, 38, 55, 48, 62, 58, 70] },
  { title: "Unique Visitors", value: "124,580", change: "+8.3%", up: true, color: "#22c55e", spark: [40, 52, 48, 60, 55, 68, 62, 75] },
  { title: "Bounce Rate", value: "32.1%", change: "-2.1%", up: false, color: "#f59e0b", spark: [80, 75, 72, 68, 65, 60, 55, 50] },
];

const deviceData = [
  { id: 1, type: "Mobile", visitors: 124, online: 45 },
  { id: 2, type: "Desktop", visitors: 96, online: 32 },
  { id: 3, type: "Tablet", visitors: 24, online: 12 },
];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("30D");
  const [exported, setExported] = useState(false);

  return (
    <ComponentDocPage
      name="Analytics"
      category="Data Display"
      description="Real-time performance metrics with KPI cards, traffic charts, geographic data, and device breakdowns."
    >
      <PreviewPanel filename="analytics.tsx">
        <div className="flex w-full flex-col gap-6 rounded-lg border border-border bg-background p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Analytics</h1>
              <p className="text-muted-foreground dark:text-muted-foreground/70">Real-time performance metrics at a glance.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setExported(true);
                  setTimeout(() => setExported(false), 2000);
                }}
                className="relative flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {exported ? "Exported!" : "Export"}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["1H", "24H", "7D", "30D", "90D"].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  selectedRange === r
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>KPI Section</div>
            <div>Geographic Section</div>
          </div>
          <TrafficChart range={selectedRange} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div>Traffic Sources Section</div>
            <div>Top Pages Section</div>
          </div>
          <Devices devices={deviceData} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SOURCE}
        filename="components/ui/Analytics/Analytics.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="KPI Cards" description="Key performance indicators with trend indicators." code={KPI_EXAMPLE}>
          <div className="w-full">
            <div className="grid gap-4 sm:grid-cols-3">
              {kpiData.map((kpi) => (
                <div key={kpi.title} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.title}</p>
                  <p className="mt-1 text-2xl font-bold">{kpi.value}</p>
                  <span className={`text-sm font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                    {kpi.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Traffic Chart" description="Visitors over time for the selected range." code={TRAFFIC_EXAMPLE}>
          <div className="w-full">
            <TrafficChart range={selectedRange} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Traffic Sources" description="Breakdown of where visitors come from." code={SOURCES_EXAMPLE}>
          <div className="w-full">
            <TrafficSources range={selectedRange} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Geographic" description="Visitor distribution across regions." code={GEO_EXAMPLE}>
          <div className="w-full">
            <Geographic range={selectedRange} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Top Pages" description="Most visited pages with engagement metrics." code={PAGES_EXAMPLE}>
          <div className="w-full">
            <TopPages range={selectedRange} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Devices" description="Live device breakdown with real-time visitors." code={DEVICES_EXAMPLE}>
          <div className="w-full">
            <Devices devices={deviceData} />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}