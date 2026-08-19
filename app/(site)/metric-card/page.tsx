"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3, Activity } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { METRIC_CARD_SOURCE } from "./metric-card-source";

const metrics = [
  { title: "Total Revenue", value: "$45,231", change: 12.5, trend: "up" as const, icon: DollarSign, color: "text-blue-500", bg: "bg-blue-500/10", data: [20, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60] },
  { title: "Active Users", value: "2,350", change: 8.2, trend: "up" as const, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10", data: [15, 18, 22, 25, 20, 28, 32, 30, 35, 38, 40, 42] },
  { title: "Conversion", value: "3.6%", change: -2.1, trend: "down" as const, icon: BarChart3, color: "text-violet-500", bg: "bg-violet-500/10", data: [40, 38, 35, 32, 30, 28, 30, 27, 25, 23, 22, 20] },
  { title: "Uptime", value: "99.9%", change: 0.1, trend: "up" as const, icon: Activity, color: "text-amber-500", bg: "bg-amber-500/10", data: [99, 99.5, 99.8, 99.9, 99.95, 99.9, 99.99, 99.95, 99.9, 99.99, 99.99, 99.9] },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 40;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke="currentColor" strokeWidth={2} className={color} points={points.join(" ")} />
      <circle cx={parseFloat(points[points.length - 1].split(",")[0])} cy={parseFloat(points[points.length - 1].split(",")[1])} r={3} className={color} fill="currentColor" />
    </svg>
  );
}

function MetricGridDemo() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={m.title}
            className={`group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md ${hoveredCard === i ? "ring-2 ring-border" : ""}`}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{m.title}</span>
              <span className={`rounded-lg p-2 ${m.bg}`}>
                <Icon className={`h-4 w-4 ${m.color}`} />
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold tracking-tight text-foreground">{m.value}</span>
              <div className="flex items-center gap-1">
                {m.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${m.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                  {m.change > 0 ? "+" : ""}{m.change}%
                </span>
              </div>
            </div>
            <div className="h-10">
              <Sparkline data={m.data} color={m.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DetailedMetricsDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-blue-500/10 p-2.5">
            <DollarSign className="h-5 w-5 text-blue-500" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            <p className="text-2xl font-bold text-foreground">$124,563</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-500" /><span className="text-sm font-medium text-emerald-500">+18.2%</span><span className="text-sm text-muted-foreground">vs last month</span></div>
        <div className="h-16">
          <Sparkline data={[10, 15, 12, 18, 22, 20, 25, 28, 30, 35, 32, 38]} color="text-blue-500" />
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div><p className="text-xs text-muted-foreground">This Week</p><p className="text-sm font-semibold text-foreground">$31,200</p></div>
          <div><p className="text-xs text-muted-foreground">Last Week</p><p className="text-sm font-semibold text-foreground">$28,100</p></div>
          <div><p className="text-xs text-muted-foreground">Goal</p><p className="text-sm font-semibold text-foreground">$35,000</p></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-emerald-500/10 p-2.5">
            <Users className="h-5 w-5 text-emerald-500" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold text-foreground">8,432</p>
          </div>
        </div>
        <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-500" /><span className="text-sm font-medium text-emerald-500">+5.7%</span><span className="text-sm text-muted-foreground">vs last month</span></div>
        <div className="h-16">
          <Sparkline data={[30, 32, 35, 38, 40, 42, 45, 48, 50, 53, 55, 58]} color="text-emerald-500" />
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div><p className="text-xs text-muted-foreground">New Today</p><p className="text-sm font-semibold text-foreground">+124</p></div>
          <div><p className="text-xs text-muted-foreground">Churned</p><p className="text-sm font-semibold text-foreground">-12</p></div>
          <div><p className="text-xs text-muted-foreground">Retention</p><p className="text-sm font-semibold text-foreground">94.2%</p></div>
        </div>
      </div>
    </div>
  );
}

function MinimalMetricsDemo() {
  return (
    <div className="flex w-full items-center gap-6">
      {metrics.slice(0, 3).map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.title} className="flex items-center gap-3">
            <span className={`rounded-lg p-2 ${m.bg}`}>
              <Icon className={`h-4 w-4 ${m.color}`} />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{m.title}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-foreground">{m.value}</p>
                <span className={`text-xs font-medium ${m.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                  {m.change > 0 ? "+" : ""}{m.change}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MetricCardPage() {
  return (
    <ComponentDocPage
      name="Metric Card"
      category="Data Display"
      description="Display key metrics with trend indicators, sparkline charts, and icon accents. Perfect for dashboard KPI sections."
    >
      <PreviewPanel filename="metric-card.tsx">
        <MetricGridDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={METRIC_CARD_SOURCE}
        filename="components/ui/MetricCard/MetricCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Detailed Metrics"
          description="Full-width stat panels with sparklines and breakdowns."
          code={`<MetricCard title="Monthly Revenue" value="$124,563" change={18.2} icon={DollarSign} sparkline={[10, 15, 12, 18, 22, 20, 25, 28, 30, 35, 32, 38]} />
<MetricCard title="Active Users" value="8,432" change={5.7} icon={Users} sparkline={[30, 32, 35, 38, 40, 42, 45, 48, 50, 53, 55, 58]} />`}
        >
          <DetailedMetricsDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Minimal Metrics"
          description="Compact inline metric with icon and change."
          code={`<div className="flex items-center gap-6">
  <MetricCard title="Revenue" value="$45,231" change={12.5} icon={DollarSign} />
  <MetricCard title="Users" value="2,350" change={8.2} icon={Users} />
</div>`}
        >
          <MinimalMetricsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}