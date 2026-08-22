"use client";

import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const data: DumbbellData[] = [
  { label: "Discovery", start: 0, end: 100 },
  { label: "Design", start: 15, end: 85 },
  { label: "Build", start: 40, end: 62 },
  { label: "Beta", start: 5, end: 20 },
  { label: "Launch", start: 0, end: 8 },
];

export function ProjectTimelineDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <DumbbellChart data={data} color="bg-orange-500" />
      <p className="text-xs text-muted-foreground">
        Planned completion vs actual completion per phase (%).
      </p>
    </div>
  );
}
