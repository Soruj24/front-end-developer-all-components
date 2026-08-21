"use client";

import { PieChart } from "@/components/ui/PieChart";
import type { PieChartData } from "@/components/ui/PieChart";

const trafficData: PieChartData[] = [
  { label: "Desktop", value: 45, color: "#3b82f6" },
  { label: "Mobile", value: 35, color: "#10b981" },
  { label: "Tablet", value: 20, color: "#f59e0b" },
];

const revenueData: PieChartData[] = [
  { label: "Direct", value: 4200, color: "#6366f1" },
  { label: "Organic", value: 3100, color: "#22c55e" },
  { label: "Referral", value: 2400, color: "#f97316" },
  { label: "Social", value: 1800, color: "#ec4899" },
  { label: "Email", value: 1200, color: "#14b8a6" },
];

const statusData: PieChartData[] = [
  { label: "Completed", value: 1240, color: "#22c55e" },
  { label: "In Progress", value: 380, color: "#3b82f6" },
  { label: "Pending", value: 150, color: "#f59e0b" },
  { label: "Failed", value: 42, color: "#ef4444" },
];

export function DonutDemo() {
  const total = trafficData.reduce((s, d) => s + d.value, 0);
  return (
    <PieChart
      data={trafficData}
      type="donut"
      size={200}
      centerContent={
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold tabular-nums text-foreground">{total}%</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      }
    />
  );
}

export function PieDemo() {
  return <PieChart data={revenueData} size={220} />;
}

export function StatusDemo() {
  return (
    <PieChart
      data={statusData}
      type="donut"
      size={180}
      centerContent={
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold tabular-nums text-foreground">{statusData.reduce((s, d) => s + d.value, 0)}</span>
          <span className="text-[10px] text-muted-foreground">Tasks</span>
        </div>
      }
    />
  );
}
