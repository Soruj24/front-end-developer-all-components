"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  timeRanges,
  kpiData,
  deviceData,
  KpiSection,
  DevicesSection,
  TrafficChartSection,
  TrafficSourcesSection,
  GeographicSection,
  TopPagesSection,
} from "@/features/analytics";
import {
  ANALYTICS_SOURCE,
  KPI_EXAMPLE,
  TRAFFIC_EXAMPLE,
  SOURCES_EXAMPLE,
  GEO_EXAMPLE,
  PAGES_EXAMPLE,
  DEVICES_EXAMPLE,
} from "./analytics-source";

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
            {timeRanges.map((r) => (
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
          <KpiSection kpis={kpiData} />
          <TrafficChartSection />
          <div className="grid gap-6 lg:grid-cols-2">
            <TrafficSourcesSection />
            <GeographicSection />
          </div>
          <TopPagesSection />
          <DevicesSection devices={deviceData} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ANALYTICS_SOURCE}
        filename="components/ui/Analytics/Analytics.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="KPI Cards" description="Key performance indicators with trend indicators." code={KPI_EXAMPLE}>
          <div className="w-full">
            <KpiSection kpis={kpiData} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Traffic Chart" description="Visitors over time for the selected range." code={TRAFFIC_EXAMPLE}>
          <div className="w-full">
            <TrafficChartSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Traffic Sources" description="Breakdown of where visitors come from." code={SOURCES_EXAMPLE}>
          <div className="w-full">
            <TrafficSourcesSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Geographic" description="Visitor distribution across regions." code={GEO_EXAMPLE}>
          <div className="w-full">
            <GeographicSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Top Pages" description="Most visited pages with engagement metrics." code={PAGES_EXAMPLE}>
          <div className="w-full">
            <TopPagesSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Devices" description="Live device breakdown with real-time visitors." code={DEVICES_EXAMPLE}>
          <div className="w-full">
            <DevicesSection devices={deviceData} />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}