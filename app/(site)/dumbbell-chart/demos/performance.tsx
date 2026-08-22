"use client";

import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const data: DumbbellData[] = [
  { label: "Frontend", start: 62, end: 88 },
  { label: "Backend", start: 54, end: 79 },
  { label: "DevOps", start: 41, end: 66 },
  { label: "Testing", start: 48, end: 84 },
  { label: "Security", start: 33, end: 58 },
];

export function PerformanceMetricsDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DumbbellChart data={data} color="bg-emerald-500" />
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500 shadow-sm" />
        End of quarter score
        <span aria-hidden="true" className="ml-3 inline-block h-2.5 w-2.5 rounded-full border-2 border-background bg-muted-foreground" />
        Start of quarter score
      </p>
    </div>
  );
}
