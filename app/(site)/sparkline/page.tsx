"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TrendingUp, TrendingDown, Activity, BarChart3, LineChart, Zap, DollarSign } from "lucide-react";

const installCommand = `npx component-library@latest add sparkline`;

const usageCode = `import { Sparkline } from "@/components/ui/sparkline";

export default function Demo() {
  return <Sparkline data={[10, 25, 15, 30, 20, 35]} />;
}`;

function MiniChartDemo() {
  const data = [20, 35, 25, 45, 30, 55, 40, 60, 50, 65, 55, 70];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-48 h-16 rounded-lg bg-muted/30 p-2">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </svg>
      </div>
    </div>
  );
}

function PositiveTrendDemo() {
  const data = [10, 15, 12, 20, 18, 25, 22, 30, 28, 35];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
  const fillPoints = `0,100 ${points} 100,100`;
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <div className="w-40 h-12 rounded-lg bg-green-50 dark:bg-green-950/20 p-1">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polygon points={fillPoints} className="fill-green-500/10" />
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500" />
          </svg>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">+24%</span>
        </div>
      </div>
    </div>
  );
}

function NegativeTrendDemo() {
  const data = [50, 45, 48, 40, 42, 35, 38, 30, 32, 25];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
  const fillPoints = `0,100 ${points} 100,100`;
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <div className="w-40 h-12 rounded-lg bg-red-50 dark:bg-red-950/20 p-1">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polygon points={fillPoints} className="fill-red-500/10" />
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500" />
          </svg>
        </div>
        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
          <TrendingDown className="h-4 w-4" />
          <span className="text-sm font-semibold">-18%</span>
        </div>
      </div>
    </div>
  );
}

function AreaSparklineDemo() {
  const data = [5, 15, 10, 25, 20, 35, 30, 40, 35, 45, 40, 50];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
  const fillPoints = `0,100 ${points} 100,100`;
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-56 h-16 rounded-lg bg-muted/30 p-2">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="stop-color-primary stop-opacity-30" />
              <stop offset="100%" className="stop-color-primary stop-opacity-5" />
            </linearGradient>
          </defs>
          <polygon points={fillPoints} fill="url(#areaGrad)" />
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </svg>
      </div>
    </div>
  );
}

function StockChartDemo() {
  const data = [100, 105, 98, 112, 108, 118, 115, 125, 120, 130, 128, 135];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
  const fillPoints = `0,100 ${points} 100,100`;
  const change = ((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(1);
  return (
    <div className="flex flex-col items-center gap-3 p-8">
      <div className="w-64 h-20 rounded-lg bg-muted/30 p-2 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polygon points={fillPoints} className="fill-primary/10" />
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <circle cx="100" cy={100 - ((data[data.length - 1] - min) / (max - min)) * 100} r="3" className="fill-primary" />
        </svg>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="font-mono font-medium">${data[data.length - 1]}</span>
        <span className={`flex items-center gap-1 ${Number(change) >= 0 ? "text-green-600" : "text-red-600"}`}>
          {Number(change) >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {change}%
        </span>
      </div>
    </div>
  );
}

function MetricLineDemo() {
  const metrics = [
    { label: "Users", data: [20, 25, 22, 30, 28, 35], change: "+12%", up: true },
    { label: "Revenue", data: [50, 45, 48, 42, 55, 52], change: "-3%", up: false },
    { label: "Orders", data: [10, 15, 12, 20, 18, 25], change: "+25%", up: true },
  ];
  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => {
          const max = Math.max(...m.data);
          const min = Math.min(...m.data);
          const points = m.data.map((v, i) => `${(i / (m.data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
          return (
            <div key={m.label} className="rounded-lg border bg-background p-3">
              <p className="text-[10px] text-muted-foreground">{m.label}</p>
              <svg viewBox="0 0 100 100" className="w-full h-8 my-1" preserveAspectRatio="none">
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className={m.up ? "text-green-500" : "text-red-500"} />
              </svg>
              <p className={`text-xs font-medium ${m.up ? "text-green-600" : "text-red-600"}`}>{m.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RevenueSparklineDemo() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [12000, 18000, 15000, 22000, 19000, 28000];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / (max - min)) * 100}`).join(" ");
  const fillPoints = `0,100 ${points} 100,100`;
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-64 rounded-xl border bg-background p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-lg font-bold">$28,000</p>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
            <DollarSign className="h-3 w-3" /> +33%
          </div>
        </div>
        <div className="h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="stop-color-primary stop-opacity-20" />
                <stop offset="100%" className="stop-color-primary stop-opacity-0" />
              </linearGradient>
            </defs>
            <polygon points={fillPoints} fill="url(#revGrad)" />
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-muted-foreground">
          {months.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function SparklinePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sparkline</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A small inline chart showing trends in data over time, perfect for dashboards and data-rich interfaces.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various sparkline chart demonstrations.</p>
        </div>

        <ComponentPreview id="sparkline-mini">
          <MiniChartDemo />
        </ComponentPreview>

        <ComponentPreview id="sparkline-positive">
          <PositiveTrendDemo />
        </ComponentPreview>

        <ComponentPreview id="sparkline-negative">
          <NegativeTrendDemo />
        </ComponentPreview>

        <ComponentPreview id="sparkline-area">
          <AreaSparklineDemo />
        </ComponentPreview>

        <ComponentPreview id="sparkline-stock">
          <StockChartDemo />
        </ComponentPreview>

        <ComponentPreview id="sparkline-metric">
          <MetricLineDemo />
        </ComponentPreview>

        <ComponentPreview id="sparkline-revenue">
          <RevenueSparklineDemo />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">number[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"currentColor"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
