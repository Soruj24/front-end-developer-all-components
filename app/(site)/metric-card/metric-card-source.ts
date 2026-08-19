export const METRIC_CARD_SOURCE = `"use client";

import type { ComponentType } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: ComponentType<{ className?: string }>;
  sparkline?: number[];
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 40;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return x + "," + y;
  });
  const last = points[points.length - 1].split(",");
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke="currentColor" strokeWidth={2} points={points.join(" ")} />
      <circle cx={parseFloat(last[0])} cy={parseFloat(last[1])} r={3} fill="currentColor" />
    </svg>
  );
}

export function MetricCard({ title, value, change, icon: Icon, sparkline = [] }: MetricCardProps) {
  const isUp = change >= 0;
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <span className="rounded-lg p-2 bg-primary/10">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <span className={"text-xs font-medium " + (isUp ? "text-emerald-500" : "text-red-500")}>
          {isUp ? "+" : ""}{change}%
        </span>
      </div>
      {sparkline.length > 0 && (
        <div className="h-10">
          <Sparkline data={sparkline} />
        </div>
      )}
    </div>
  );
}`;