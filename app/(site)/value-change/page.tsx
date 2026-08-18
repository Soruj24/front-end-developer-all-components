"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, BarChart3, Activity, DollarSign } from "lucide-react";

const installCommand = `npx shadcn@latest add value-change`;

const usageCode = `import { ValueChange } from "@/components/ui/value-change";

export function ValueChangeDemo() {
  return (
    <ValueChange
      value={1234}
      previousValue={1100}
      format="currency"
    />
  );
}`;

function PriceChange() {
  const [price, setPrice] = useState(49.99);
  const [previousPrice, setPreviousPrice] = useState(44.99);
  const change = price - previousPrice;
  const percent = ((change / previousPrice) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{"$" + price.toFixed(2)}</span>
        <div className={`flex items-center gap-1 ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
          {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="text-sm font-medium">
            {change >= 0 ? "+" : ""}{percent}%
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => { setPreviousPrice(price); setPrice(price + 5); }}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
        >
          <ArrowUp className="mr-1 h-4 w-4" />
          +$5.00
        </button>
        <button
          onClick={() => { setPreviousPrice(price); setPrice(Math.max(0, price - 5)); }}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
        >
          <ArrowDown className="mr-1 h-4 w-4" />
          -$5.00
        </button>
      </div>
    </div>
  );
}

function StatChange() {
  const [stat, setStat] = useState(1247);
  const [prevStat, setPrevStat] = useState(1180);
  const change = stat - prevStat;
  const percent = ((change / prevStat) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Users</span>
          <Badge variant={change >= 0 ? "default" : "destructive"}>
            {change >= 0 ? "+" : ""}{percent}%
          </Badge>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{stat.toLocaleString()}</span>
          <span className={`text-sm ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {change >= 0 ? "+" : ""}{change}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => { setPrevStat(stat); setStat(stat + 67); }}
          className="text-xs text-primary underline"
        >
          Simulate growth
        </button>
        <button
          onClick={() => { setPrevStat(stat); setStat(Math.max(0, stat - 30)); }}
          className="text-xs text-muted-foreground underline"
        >
          Simulate decline
        </button>
      </div>
    </div>
  );
}

function PercentageChange() {
  const [value, setValue] = useState(78);
  const [previous, setPrevious] = useState(72);
  const change = value - previous;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{value}%</div>
          <div className="text-xs text-muted-foreground">Current</div>
        </div>
        <div className={`flex flex-col items-center ${change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
          {change >= 0 ? <ArrowUp className="h-6 w-6" /> : <ArrowDown className="h-6 w-6" />}
          <span className="text-sm font-medium">
            {change >= 0 ? "+" : ""}{change}pp
          </span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => { setPrevious(value); setValue(Number(e.target.value)); }}
        className="w-full"
      />
    </div>
  );
}

function StockTicker() {
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", price: 178.52, change: 2.34 },
    { symbol: "GOOGL", price: 141.80, change: -1.23 },
    { symbol: "MSFT", price: 378.91, change: 5.67 },
  ]);

  const refresh = () => {
    setStocks(stocks.map((s) => ({
      ...s,
      price: s.price + (Math.random() - 0.5) * 5,
      change: (Math.random() - 0.5) * 10,
    })));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {stocks.map((s) => (
          <div key={s.symbol} className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <span className="font-medium">{s.symbol}</span>
              <span className="ml-2 text-sm text-muted-foreground">{"$" + s.price.toFixed(2)}</span>
            </div>
            <div className={`flex items-center gap-1 ${s.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {s.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm">
                {s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={refresh}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
      >
        <Activity className="mr-1 h-4 w-4" />
        Refresh Prices
      </button>
    </div>
  );
}

function MetricDelta() {
  const [metrics, setMetrics] = useState([
    { label: "Revenue", current: 125000, previous: 118000, format: "currency" },
    { label: "Users", current: 8420, previous: 8100, format: "number" },
    { label: "Conversion", current: 3.2, previous: 2.9, format: "percent" },
  ]);

  const formatValue = (val: number, fmt: string) => {
    if (fmt === "currency") return "$" + val.toLocaleString();
    if (fmt === "percent") return val + "%";
    return val.toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {metrics.map((m) => {
          const change = m.current - m.previous;
          const pct = ((change / m.previous) * 100).toFixed(1);
          return (
            <div key={m.label} className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">{m.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatValue(m.current, m.format)}</span>
                <Badge variant={change >= 0 ? "default" : "destructive"}>
                  {change >= 0 ? "+" : ""}{pct}%
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setMetrics(metrics.map((m) => ({
          ...m,
          previous: m.current,
          current: m.current * (1 + (Math.random() - 0.3) * 0.1),
        })))}
        className="text-sm text-primary underline"
      >
        Simulate changes
      </button>
    </div>
  );
}

function RevenueChange() {
  const [monthly, setMonthly] = useState([45000, 52000, 48000, 61000, 58000, 67000]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-1 h-32">
        {monthly.map((val, i) => {
          const max = Math.max(...monthly);
          const height = (val / max) * 100;
          const change = i > 0 ? val - monthly[i - 1] : 0;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t ${change >= 0 ? "bg-emerald-500" : "bg-red-500"}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-muted-foreground">{months[i]}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Total: {"$" + monthly.reduce((a, b) => a + b, 0).toLocaleString()}
        </span>
        <button
          onClick={() => setMonthly(monthly.map((v) => v + Math.floor(Math.random() * 10000 - 3000)))}
          className="text-xs text-primary underline"
        >
          Refresh data
        </button>
      </div>
    </div>
  );
}

function GrowthIndicator() {
  const [growth, setGrowth] = useState(24.5);
  const [period, setPeriod] = useState("monthly");

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Growth Rate</p>
            <p className="text-3xl font-bold">{growth.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">{period} basis</p>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
            growth >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
          }`}>
            {growth >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {["daily", "weekly", "monthly"].map((p) => (
          <button
            key={p}
            onClick={() => { setPeriod(p); setGrowth(Math.random() * 50 - 10); }}
            className={`rounded-md px-3 py-1.5 text-sm capitalize ${
              period === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ValueChangePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <TrendingUp className="mr-2 inline h-8 w-8" />
          Value Change
        </h1>
        <p className="text-lg text-muted-foreground">
          Display value changes with animated indicators, trends, and deltas.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Price Change</h3>
          <ComponentPreview>
            <PriceChange />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Stat Change</h3>
          <ComponentPreview>
            <StatChange />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Percentage Change</h3>
          <ComponentPreview>
            <PercentageChange />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Stock Ticker</h3>
          <ComponentPreview>
            <StockTicker />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Metric Delta</h3>
          <ComponentPreview>
            <MetricDelta />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Revenue Change</h3>
          <ComponentPreview>
            <RevenueChange />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Growth Indicator</h3>
          <ComponentPreview>
            <GrowthIndicator />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">value</td>
                <td className="p-3">number</td>
                <td className="p-3">required</td>
                <td className="p-3">Current value</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">previousValue</td>
                <td className="p-3">number</td>
                <td className="p-3">required</td>
                <td className="p-3">Previous value for comparison</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">format</td>
                <td className="p-3">"number" | "currency" | "percent"</td>
                <td className="p-3">"number"</td>
                <td className="p-3">Value format type</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">showIcon</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Show trend icon</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">animated</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Enable value transition animation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">invertColors</td>
                <td className="p-3">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Invert positive/negative colors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
