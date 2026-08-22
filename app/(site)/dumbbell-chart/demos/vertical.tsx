"use client";

import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const data: DumbbellData[] = [
  { label: "Jan", start: 25, end: 62 },
  { label: "Feb", start: 40, end: 78 },
  { label: "Mar", start: 35, end: 55 },
  { label: "Apr", start: 50, end: 88 },
  { label: "May", start: 45, end: 70 },
  { label: "Jun", start: 58, end: 92 },
];

export function VerticalChartDemo() {
  return (
    <DumbbellChart
      data={data}
      orientation="vertical"
      className="w-full"
    />
  );
}
