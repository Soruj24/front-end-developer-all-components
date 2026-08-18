"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  Activity,
} from "lucide-react";

const installCommand = `npx component-library@latest add trend-arrow`;

const usageCode = `import { TrendArrow } from "@/components/trend-arrow";

<TrendArrow value={12.5} label="Revenue" />`;

function UpTrend() {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">+12.5%</p>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <ArrowUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">+8.3%</p>
            <p className="text-xs text-muted-foreground">this quarter</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownTrend() {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">-5.2%</p>
            <p className="text-xs text-muted-foreground">bounce rate</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <ArrowDown className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">-3.1%</p>
            <p className="text-xs text-muted-foreground">conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NeutralTrend() {
  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Minus className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">0.0%</p>
            <p className="text-xs text-muted-foreground">no change</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Minus className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">Stable</p>
            <p className="text-xs text-muted-foreground">throughput</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PercentageArrow() {
  const [value, setValue] = useState(15.3);
  const isUp = value > 0;
  const isDown = value < 0;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div
        className={`flex items-center gap-3 text-3xl font-bold ${
          isUp ? "text-green-600" : isDown ? "text-red-600" : "text-muted-foreground"
        }`}
      >
        {isUp ? (
          <TrendingUp className="h-8 w-8" />
        ) : isDown ? (
          <TrendingDown className="h-8 w-8" />
        ) : (
          <Minus className="h-8 w-8" />
        )}
        <span>
          {value > 0 ? "+" : ""}
          {value.toFixed(1)}%
        </span>
      </div>
      <input
        type="range"
        min={-50}
        max={50}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-64"
      />
      <p className="text-sm text-muted-foreground">Drag to change trend value</p>
    </div>
  );
}

function StockArrow() {
  const prices = [
    { symbol: "AAPL", change: 2.34, pct: 1.45 },
    { symbol: "GOOGL", change: -5.12, pct: -0.87 },
    { symbol: "MSFT", change: 0.0, pct: 0.0 },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-md space-y-2">
        {prices.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border bg-card p-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-16 font-mono text-sm font-bold">{p.symbol}</span>
              <span
                className={`text-sm font-medium ${
                  p.change > 0
                    ? "text-green-600"
                    : p.change < 0
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {p.change > 0 ? "+" : ""}
                {p.change.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 overflow-hidden rounded bg-muted">
                <div
                  className={`h-full ${
                    p.change > 0
                      ? "bg-green-500"
                      : p.change < 0
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                  style={{ width: `${Math.min(Math.abs(p.pct) * 20, 100)}%` }}
                />
              </div>
              <span
                className={`w-14 text-right text-xs font-medium ${
                  p.change > 0
                    ? "text-green-600"
                    : p.change < 0
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {p.pct > 0 ? "+" : ""}
                {p.pct.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricTrend() {
  const metrics = [
    { label: "Revenue", value: "$48.2K", change: 12.5, icon: BarChart3 },
    { label: "Users", value: "2,340", change: 8.3, icon: Activity },
    { label: "Bounce Rate", value: "32.1%", change: -5.2, icon: TrendingDown },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 text-center">
            <m.icon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <div
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                m.change > 0
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {m.change > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {m.change > 0 ? "+" : ""}
              {m.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonArrow() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  const data = {
    week: { label: "This Week", up: 3.2, down: -1.1 },
    month: { label: "This Month", up: 12.5, down: -4.3 },
    year: { label: "This Year", up: 45.8, down: -12.6 },
  };
  const d = data[period];

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex gap-2">
        {(["week", "month", "year"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              period === p
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex gap-8">
        <div className="text-center">
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUp className="h-4 w-4" />
            <span className="text-2xl font-bold">+{d.up}%</span>
          </div>
          <p className="text-xs text-muted-foreground">Growth</p>
          <p className="text-xs text-muted-foreground">{d.label}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 text-red-600">
            <ArrowDown className="h-4 w-4" />
            <span className="text-2xl font-bold">{d.down}%</span>
          </div>
          <p className="text-xs text-muted-foreground">Decline</p>
          <p className="text-xs text-muted-foreground">{d.label}</p>
        </div>
      </div>
    </div>
  );
}

export default function TrendArrowPage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Up Trend", component: UpTrend },
    { name: "Down Trend", component: DownTrend },
    { name: "Neutral Trend", component: NeutralTrend },
    { name: "Percentage Arrow", component: PercentageArrow },
    { name: "Stock Arrow", component: StockArrow },
    { name: "Metric Trend", component: MetricTrend },
    { name: "Comparison Arrow", component: ComparisonArrow },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trend Arrow
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Trend indicators showing upward, downward, and neutral data movements with percentage arrows.
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
          <p className="mt-1 text-sm text-muted-foreground">Interactive trend indicators.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeDemo === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>
        <ComponentPreview id={`trend-arrow-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
          <div className="w-full">
            <ActiveComponent />
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showIcon</td>
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
