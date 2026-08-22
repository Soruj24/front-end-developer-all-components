"use client";

import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const data: DumbbellData[] = [
  { label: "Engineering", start: 88, end: 92 },
  { label: "Marketing", start: 30, end: 41 },
  { label: "Operations", start: 62, end: 48 },
  { label: "Support", start: 55, end: 51 },
  { label: "Research", start: 24, end: 37 },
];

export function BudgetAnalysisDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DumbbellChart data={data} color="bg-rose-500" max={100} />
      <p className="text-xs text-muted-foreground">
        Allocated vs spent, % of annual budget ($K). Operations underspent; Marketing overran.
      </p>
    </div>
  );
}
