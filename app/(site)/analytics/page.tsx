"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
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

const installCommand = `npx component-library@latest add analytics`;

const usageCode = `import { Analytics } from "@/features/analytics";

<Analytics />`;

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("30D");
  const [exported, setExported] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Analytics</h1>
          <Badge variant="primary">6 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Real-time performance metrics with KPI cards, traffic charts, geographic data, and device breakdowns.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">KPI Cards</h3>
          <p className="text-sm text-muted-foreground">Display key performance indicators with trend indicators.</p>
          <div className="flex flex-col gap-6 p-6 rounded-lg border border-border bg-background">
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
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">kpiData</td>
                <td className="px-4 py-3 text-muted-foreground">KpiItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">deviceData</td>
                <td className="px-4 py-3 text-muted-foreground">DeviceItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">timeRanges</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
