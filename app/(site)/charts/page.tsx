"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";
import { BarChart } from "./components/BarChart";
import { HorizontalBarChart } from "./components/HorizontalBarChart";
import { AreaChart } from "./components/AreaChart";
import { PieChartComponent } from "./components/PieChartComponent";
import { DonutChart } from "./components/DonutChart";
import { LineChart } from "./components/LineChart";

const STYLES: Array<{ label: string; Render: React.ComponentType; registryId: string }> = [
  { label: "Bar Chart", Render: BarChart, registryId: "chart-bar" },
  { label: "Horizontal Bar", Render: HorizontalBarChart, registryId: "chart-horizontal-bar" },
  { label: "Area Chart", Render: AreaChart, registryId: "chart-area" },
  { label: "Pie Chart", Render: PieChartComponent, registryId: "chart-pie" },
  { label: "Donut Chart", Render: DonutChart, registryId: "chart-donut" },
  { label: "Line Chart", Render: LineChart, registryId: "chart-line" },
];

export default function ChartsPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active, registryId } = STYLES[activeStyle];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Charts</h1>
      <p className="text-muted-foreground">SVG charts with interactive hover labels, legends, and multiple chart types.</p>

      <section>
        <div className="mb-8 flex flex-wrap gap-2">
          {STYLES.map((s, i) => (
            <button
              key={s.registryId}
              onClick={() => setActiveStyle(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeStyle === i
                  ? "bg-blue-500 text-white shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ComponentPreview id={registryId}>
          <Active />
        </ComponentPreview>
      </section>
    </div>
  );
}
