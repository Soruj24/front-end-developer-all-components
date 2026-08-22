"use client";

import { DumbbellChart } from "./DumbbellChart";

export function HorizontalChartDemo() {
  return (
    <DumbbellChart
      data={[
        { label: "Design", start: 20, end: 65 },
        { label: "Development", start: 45, end: 90 },
        { label: "Testing", start: 30, end: 70 },
        { label: "Deployment", start: 10, end: 55 },
      ]}
      className="w-full"
    />
  );
}
