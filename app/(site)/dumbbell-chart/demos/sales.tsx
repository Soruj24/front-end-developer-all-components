"use client";

import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const data: DumbbellData[] = [
  { label: "Q1", start: 42, end: 68 },
  { label: "Q2", start: 51, end: 74 },
  { label: "Q3", start: 63, end: 59 },
  { label: "Q4", start: 70, end: 91 },
];

export function SalesComparisonDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DumbbellChart data={data} color="bg-blue-500" max={100} />
      <p className="text-xs text-muted-foreground">
        Quarterly target vs actual revenue (index). Q3 dipped below target.
      </p>
    </div>
  );
}
