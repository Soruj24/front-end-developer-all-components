"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Target,
  DollarSign,
  Clock,
  Zap,
} from "lucide-react";

const installCommand = `npx component-library@latest add dumbbell-chart`;
const usageCode = `import { DumbbellChart } from "@/components/dumbbell-chart";

<DumbbellChart
  data={[
    { label: "Q1", start: 20, end: 80 },
    { label: "Q2", start: 35, end: 90 },
  ]}
/>`;

interface DumbbellData {
  label: string;
  start: number;
  end: number;
}

function DumbbellChartRenderer({
  data,
  max = 100,
  color = "bg-primary",
  showValues = true,
  orientation = "horizontal",
}: {
  data: DumbbellData[];
  max?: number;
  color?: string;
  showValues?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <div className="flex items-end gap-3 h-48">
        {data.map((d) => {
          const bottom = (d.start / max) * 100;
          const height = ((d.end - d.start) / max) * 100;
          const change = d.end - d.start;
          return (
            <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
              {showValues && (
                <span className="text-[10px] font-mono text-muted-foreground">{d.end}</span>
              )}
              <div className="relative w-4 h-36">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-muted" style={{ height: "100%" }} />
                <div className={`absolute left-1/2 -translate-x-1/2 w-1.5 rounded-full ${color}/30`} style={{ bottom: `${bottom}%`, height: `${height}%` }} />
                <div className="absolute left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-muted-foreground border-2 border-background" style={{ bottom: `calc(${bottom}% - 5px)` }} />
                <div className={`absolute left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full ${color} border-2 border-background`} style={{ bottom: `calc(${bottom + height}% - 5px)` }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.label}</span>
              {showValues && (
                <span className={`text-[9px] font-medium ${change > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {change > 0 ? "+" : ""}{change}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {data.map((d) => {
        const left = (d.start / max) * 100;
        const width = ((d.end - d.start) / max) * 100;
        const change = d.end - d.start;
        return (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-20 text-right text-xs text-muted-foreground truncate">{d.label}</span>
            <div className="flex-1 relative h-6">
              <div className="absolute inset-y-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-muted" />
              <div className={`absolute inset-y-1/2 -translate-y-1/2 h-1.5 rounded-full ${color}/30`} style={{ left: `${left}%`, width: `${width}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-muted-foreground border-2 border-background shadow" style={{ left: `calc(${left}% - 6px)` }} />
              <div className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ${color} border-2 border-background shadow`} style={{ left: `calc(${left + width}% - 6px)` }} />
            </div>
            {showValues && (
              <span className="w-16 text-xs font-mono text-right text-muted-foreground">
                {d.start}→{d.end}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function HorizontalChartDemo() {
  const data = [
    { label: "Revenue", start: 20, end: 85 },
    { label: "Users", start: 45, end: 92 },
    { label: "Conversion", start: 15, end: 60 },
    { label: "Retention", start: 55, end: 88 },
    { label: "Growth", start: 30, end: 75 },
  ];

  return (
    <div className="w-full max-w-md">
      <DumbbellChartRenderer data={data} />
    </div>
  );
}

function VerticalChartDemo() {
  const data = [
    { label: "Jan", start: 30, end: 70 },
    { label: "Feb", start: 45, end: 85 },
    { label: "Mar", start: 25, end: 60 },
    { label: "Apr", start: 50, end: 90 },
    { label: "May", start: 35, end: 78 },
    { label: "Jun", start: 42, end: 88 },
  ];

  return (
    <div className="w-full max-w-lg">
      <DumbbellChartRenderer data={data} orientation="vertical" />
    </div>
  );
}

function PerformanceMetricsDemo() {
  const metrics = [
    { label: "Page Load", start: 4200, end: 1200, unit: "ms" },
    { label: "FCP", start: 2800, end: 900, unit: "ms" },
    { label: "LCP", start: 3500, end: 1100, unit: "ms" },
    { label: "TTI", start: 4000, end: 1400, unit: "ms" },
  ];

  const max = 5000;

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Core Web Vitals</h3>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Before</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> After</span>
          </div>
        </div>
        <DumbbellChartRenderer data={metrics.map((m) => ({
          label: m.label,
          start: (m.start / max) * 100,
          end: (m.end / max) * 100,
        }))} color="bg-emerald-500" showValues={false} />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg bg-muted/50 p-2 text-center">
              <p className="text-[9px] text-muted-foreground">{m.label}</p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                -{Math.round(((m.start - m.end) / m.start) * 100)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesComparisonDemo() {
  const regions = [
    { label: "North", start: 45000, end: 82000 },
    { label: "South", start: 38000, end: 71000 },
    { label: "East", start: 52000, end: 95000 },
    { label: "West", start: 41000, end: 78000 },
  ];

  const max = 100000;

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Regional Sales</h3>
          <span className="text-[10px] text-muted-foreground">Pre vs Post Campaign</span>
        </div>
        <DumbbellChartRenderer
          data={regions.map((r) => ({
            label: r.label,
            start: (r.start / max) * 100,
            end: (r.end / max) * 100,
          }))}
          color="bg-blue-500"
          showValues={false}
        />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {regions.map((r) => {
            const growth = Math.round(((r.end - r.start) / r.start) * 100);
            return (
              <div key={r.label} className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[9px] text-muted-foreground">{r.label}</p>
                <p className="text-xs font-bold">${(r.end / 1000).toFixed(0)}k</p>
                <p className="text-[9px] text-emerald-600 dark:text-emerald-400">+{growth}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeamStatsDemo() {
  const players = [
    { label: "Sarah", start: 72, end: 89 },
    { label: "Marcus", start: 65, end: 82 },
    { label: "Emma", start: 78, end: 94 },
    { label: "Alex", start: 60, end: 76 },
    { label: "Lisa", start: 70, end: 88 },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Team Performance</h3>
          <span className="text-[10px] text-muted-foreground">Rating Change</span>
        </div>
        <DumbbellChartRenderer data={players} color="bg-purple-500" />
        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Start Rating</span>
          <span>End Rating</span>
        </div>
      </div>
    </div>
  );
}

function ProjectTimelineDemo() {
  const tasks = [
    { label: "Design", start: 5, end: 8 },
    { label: "Dev", start: 12, end: 18 },
    { label: "Testing", start: 4, end: 6 },
    { label: "Deploy", start: 2, end: 3 },
    { label: "QA", start: 3, end: 5 },
  ];

  const max = 20;

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Project Timeline</h3>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400" /> Estimated</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Actual</span>
          </div>
        </div>
        <DumbbellChartRenderer data={tasks} max={max} color="bg-blue-500" />
        <div className="mt-4 rounded-lg bg-muted/30 px-3 py-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Total Estimated</span>
            <span className="font-mono font-medium">{tasks.reduce((s, t) => s + t.start, 0)} days</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Total Actual</span>
            <span className="font-mono font-medium">{tasks.reduce((s, t) => s + t.end, 0)} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetAnalysisDemo() {
  const departments = [
    { label: "Engineering", start: 120000, end: 145000 },
    { label: "Marketing", start: 80000, end: 92000 },
    { label: "Sales", start: 95000, end: 110000 },
    { label: "Operations", start: 60000, end: 55000 },
  ];

  const max = 160000;

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Budget vs Actual</h3>
          <span className="text-[10px] text-muted-foreground">FY 2024</span>
        </div>
        <DumbbellChartRenderer
          data={departments.map((d) => ({
            label: d.label,
            start: (d.start / max) * 100,
            end: (d.end / max) * 100,
          }))}
          color="bg-orange-500"
          showValues={false}
        />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {departments.map((d) => {
            const diff = d.end - d.start;
            const isOver = diff > 0;
            return (
              <div key={d.label} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="text-[10px] text-muted-foreground">{d.label}</span>
                <span className={`text-[10px] font-mono font-medium ${isOver ? "text-red-500" : "text-emerald-600"}`}>
                  {isOver ? "+" : ""}{((diff / 1000).toFixed(0))}k
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function DumbbellChartPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dumbbell Chart
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Dumbbell chart for comparing before/after values with horizontal and vertical
          orientations and trend indicators.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Horizontal Chart</h3>
          <p className="text-sm text-muted-foreground">
            Basic horizontal dumbbell with start and end values.
          </p>
          <ComponentPreview id="db-horizontal">
            <HorizontalChartDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Vertical Chart</h3>
          <p className="text-sm text-muted-foreground">
            Vertical orientation with change indicators.
          </p>
          <ComponentPreview id="db-vertical">
            <VerticalChartDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Performance Metrics</h3>
          <p className="text-sm text-muted-foreground">
            Core Web Vitals improvement before and after optimization.
          </p>
          <ComponentPreview id="db-performance">
            <PerformanceMetricsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Sales Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Regional sales before and after marketing campaign.
          </p>
          <ComponentPreview id="db-sales">
            <SalesComparisonDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Team Stats</h3>
          <p className="text-sm text-muted-foreground">
            Player rating changes over the season.
          </p>
          <ComponentPreview id="db-team">
            <TeamStatsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Project Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Estimated vs actual time for project tasks.
          </p>
          <ComponentPreview id="db-timeline">
            <ProjectTimelineDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Budget Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Department budget vs actual spending.
          </p>
          <ComponentPreview id="db-budget">
            <BudgetAnalysisDemo />
          </ComponentPreview>
        </div>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">DumbbellData[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"horizontal\" | \"vertical\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"horizontal\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"bg-primary"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showValues</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
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
