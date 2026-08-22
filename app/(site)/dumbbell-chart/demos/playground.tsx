"use client";

import { useState } from "react";
import { SegmentedControl, Switch } from "@/components/ui";
import { DumbbellChart, type DumbbellData } from "./DumbbellChart";

const DATASETS: Record<string, { label: string; data: DumbbellData[]; color: string }> = {
  skills: {
    label: "Skills",
    color: "bg-emerald-500",
    data: [
      { label: "Frontend", start: 62, end: 88 },
      { label: "Backend", start: 54, end: 79 },
      { label: "DevOps", start: 41, end: 66 },
      { label: "Testing", start: 48, end: 84 },
    ],
  },
  revenue: {
    label: "Revenue",
    color: "bg-blue-500",
    data: [
      { label: "Q1", start: 42, end: 68 },
      { label: "Q2", start: 51, end: 74 },
      { label: "Q3", start: 63, end: 59 },
      { label: "Q4", start: 70, end: 91 },
    ],
  },
  budget: {
    label: "Budget",
    color: "bg-rose-500",
    data: [
      { label: "Eng", start: 88, end: 92 },
      { label: "Mkt", start: 30, end: 41 },
      { label: "Ops", start: 62, end: 48 },
      { label: "R&D", start: 24, end: 37 },
    ],
  },
};

export function PlaygroundDemo() {
  const [dataset, setDataset] = useState("skills");
  const [orientation, setOrientation] = useState("horizontal");
  const [showValues, setShowValues] = useState(true);

  const current = DATASETS[dataset];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <SegmentedControl
            size="sm"
            value={dataset}
            onChange={setDataset}
            options={Object.entries(DATASETS).map(([value, d]) => ({ value, label: d.label }))}
          />
          <SegmentedControl
            size="sm"
            value={orientation}
            onChange={setOrientation}
            options={[
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
            ]}
          />
        </div>
        <Switch
          size="sm"
          checked={showValues}
          onChange={(e) => setShowValues(e.target.checked)}
          label="Show values"
        />
      </div>
      <div className="rounded-xl border border-black/[.08] bg-card p-5 dark:border-white/[.145]">
        <DumbbellChart
          key={`${dataset}-${orientation}`}
          data={current.data}
          color={current.color}
          orientation={orientation as "horizontal" | "vertical"}
          showValues={showValues}
          className="w-full"
        />
      </div>
    </div>
  );
}
