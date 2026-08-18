"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

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

const sampleData: DumbbellData[] = [
  { label: "Revenue", start: 20, end: 85 },
  { label: "Users", start: 45, end: 92 },
  { label: "Conversion", start: 15, end: 60 },
  { label: "Retention", start: 55, end: 88 },
  { label: "Growth", start: 30, end: 75 },
];

function DumbbellChartDemo({ data }: { data: DumbbellData[] }) {
  const max = 100;
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {data.map((d) => {
        const left = (d.start / max) * 100;
        const width = ((d.end - d.start) / max) * 100;
        return (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-20 text-right text-xs text-muted-foreground">{d.label}</span>
            <div className="flex-1 relative h-6">
              <div className="absolute inset-y-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-muted" />
              <div className="absolute inset-y-1/2 -translate-y-1/2 h-1.5 rounded-full bg-primary/30" style={{ left: `${left}%`, width: `${width}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-muted-foreground border-2 border-background shadow" style={{ left: `calc(${left}% - 6px)` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary border-2 border-background shadow" style={{ left: `calc(${left + width}% - 6px)` }} />
            </div>
            <span className="w-12 text-xs font-mono text-right text-muted-foreground">{d.start}→{d.end}</span>
          </div>
        );
      })}
    </div>
  );
}

function VerticalDumbbellDemo() {
  const data = [
    { label: "Jan", start: 30, end: 70 },
    { label: "Feb", start: 45, end: 85 },
    { label: "Mar", start: 25, end: 60 },
    { label: "Apr", start: 50, end: 90 },
  ];
  const max = 100;
  return (
    <div className="flex items-end gap-4 h-48">
      {data.map((d) => {
        const bottom = (d.start / max) * 100;
        const height = ((d.end - d.start) / max) * 100;
        return (
          <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[10px] font-mono text-muted-foreground">{d.end}</span>
            <div className="relative w-4 h-36">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-muted" style={{ height: "100%" }} />
              <div className="absolute left-1/2 -translate-x-1/2 w-1.5 rounded-full bg-primary/30" style={{ bottom: `${bottom}%`, height: `${height}%` }} />
              <div className="absolute left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-muted-foreground border-2 border-background" style={{ bottom: `calc(${bottom}% - 5px)` }} />
              <div className="absolute left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" style={{ bottom: `calc(${bottom + height}% - 5px)` }} />
            </div>
            <span className="text-[10px] text-muted-foreground">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ComparisonDemo() {
  const items = [
    { label: "Before", value: 40, trend: "down" as const },
    { label: "After", value: 85, trend: "up" as const },
  ];
  return (
    <div className="flex gap-6">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            {item.trend === "up" ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
            <span className="text-lg font-bold">{item.value}%</span>
          </div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DumbbellChartPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dumbbell Chart</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Dumbbell chart for comparing before/after values with horizontal and vertical orientations and trend indicators.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal Chart</h2>
        <ComponentPreview>
          <DumbbellChartDemo data={sampleData} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Chart</h2>
        <ComponentPreview>
          <VerticalDumbbellDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Before / After</h2>
        <ComponentPreview>
          <ComparisonDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">data</td><td className="px-4 py-3 text-muted-foreground">DumbbellData[]</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">orientation</td><td className="px-4 py-3 text-muted-foreground">{'"horizontal" | "vertical"'}</td><td className="px-4 py-3 text-muted-foreground">{'"horizontal"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
