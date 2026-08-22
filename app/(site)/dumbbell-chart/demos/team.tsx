"use client";

import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const data: DumbbellData[] = [
  { label: "Ava", start: 18, end: 34 },
  { label: "Noah", start: 22, end: 30 },
  { label: "Mia", start: 12, end: 28 },
  { label: "Liam", start: 26, end: 39 },
  { label: "Zoe", start: 15, end: 24 },
];

export function TeamStatsDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DumbbellChart data={data} color="bg-purple-500" />
      <p className="text-xs text-muted-foreground">
        Story points completed per sprint, first sprint vs current sprint.
      </p>
    </div>
  );
}
