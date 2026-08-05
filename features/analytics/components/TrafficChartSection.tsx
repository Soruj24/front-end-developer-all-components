"use client";

import { useState } from "react";
import { areaPoints, linePoints, maxMonthly, monthlyLabels, monthlyValues } from "../constants/analytics-data";

function BarChart() {
  return (
    <div>
      <div className="flex h-56 w-full items-end gap-1.5">
        {monthlyValues.map((v, i) => (
          <div key={i} className="group relative flex-1">
            <div
              className="w-full rounded-t transition-all hover:opacity-80"
              style={{
                height: `${(v / maxMonthly) * 100}%`,
                background: "linear-gradient(to top, #3b82f6, #60a5fa)",
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
              {monthlyLabels[i]}: {v.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        {monthlyLabels.map((l, i) => (
          <span key={i} className={i % 2 === 0 ? "" : "hidden sm:inline"}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function LineChart() {
  return (
    <div className="relative h-56 w-full">
      <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={`M${areaPoints}`} fill="url(#areaFill)" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {monthlyValues.map((v, i) => (
          <circle
            key={i}
            cx={(i / (monthlyValues.length - 1)) * 100}
            cy={40 - (v / maxMonthly) * 35}
            r="1.5"
            fill="#3b82f6"
            className="cursor-pointer hover:r-3"
          >
            <title>
              {monthlyLabels[i]}: {v.toLocaleString()}
            </title>
          </circle>
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        {monthlyLabels
          .filter((_, i) => i % 2 === 0)
          .map((l) => (
            <span key={l}>{l}</span>
          ))}
      </div>
    </div>
  );
}

export function TrafficChartSection() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  return (
    <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Page Views Over Time</h2>
        <div className="flex overflow-hidden rounded-lg border border-border">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              chartType === "bar"
                ? "bg-blue-600 text-white"
                : "bg-white text-muted-foreground hover:bg-muted/40 dark:bg-zinc-900 dark:text-muted-foreground/70 dark:hover:bg-muted"
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              chartType === "line"
                ? "bg-blue-600 text-white"
                : "bg-white text-muted-foreground hover:bg-muted/40 dark:bg-zinc-900 dark:text-muted-foreground/70 dark:hover:bg-muted"
            }`}
          >
            Line Chart
          </button>
        </div>
      </div>
      {chartType === "bar" ? <BarChart /> : <LineChart />}
    </div>
  );
}
