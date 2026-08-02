"use client";

import { useState } from "react";
import { timeRanges } from "./data";
import { DevicesSection, KpiSection } from "./Sections";
import { TrafficChartSection } from "./TrafficChart";
import { TrafficSourcesSection } from "./TrafficSources";
import { GeographicSection } from "./Geographic";
import { TopPagesSection } from "./TopPages";

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("30D");
  const [exported, setExported] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-8">
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

      <KpiSection />
      <TrafficChartSection />

      <div className="grid gap-6 lg:grid-cols-2">
        <TrafficSourcesSection />
        <GeographicSection />
      </div>

      <TopPagesSection />
      <DevicesSection />
    </div>
  );
}
