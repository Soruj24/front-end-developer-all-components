"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { BarChart } from "./components/BarChart";
import { HorizontalBarChart } from "./components/HorizontalBarChart";
import { AreaChart } from "./components/AreaChart";
import { PieChartComponent } from "./components/PieChartComponent";
import { DonutChart } from "./components/DonutChart";
import { LineChart } from "./components/LineChart";
import { CHARTS_SOURCE } from "./charts-source";

const STYLES: Array<{ label: string; Render: React.ComponentType }> = [
  { label: "Bar Chart", Render: BarChart },
  { label: "Horizontal Bar", Render: HorizontalBarChart },
  { label: "Area Chart", Render: AreaChart },
  { label: "Pie Chart", Render: PieChartComponent },
  { label: "Donut Chart", Render: DonutChart },
  { label: "Line Chart", Render: LineChart },
];

const BAR_CODE = `<BarChart data={data} />`;

const HORIZONTAL_CODE = `<HorizontalBarChart data={data} />`;

const AREA_CODE = `<AreaChart data={data} />`;

const PIE_CODE = `<PieChart data={data} />`;

const DONUT_CODE = `<DonutChart data={data} innerRadius={35} />`;

const LINE_CODE = `<LineChart data={data} />`;

export default function ChartsPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active } = STYLES[activeStyle];

  return (
    <ComponentDocPage
      name="Charts"
      category="Data Display"
      description="SVG charts with interactive hover labels, legends, and multiple chart types."
    >
      <PreviewPanel filename="charts.tsx">
        <div className="w-full">
          <div className="mb-8 flex flex-wrap gap-2">
            {STYLES.map((s, i) => (
              <button
                key={s.label}
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
          <Active />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CHARTS_SOURCE}
        filename="components/ui/Chart/BarChart.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Bar Chart" description="Vertical bars with hover tooltips and gradient fills." code={BAR_CODE}>
          <BarChart />
        </ExampleBlock>
        <ExampleBlock title="Horizontal Bar" description="Horizontal bars for comparing categorical values." code={HORIZONTAL_CODE}>
          <HorizontalBarChart />
        </ExampleBlock>
        <ExampleBlock title="Area Chart" description="Gradient-filled line area with data point markers." code={AREA_CODE}>
          <AreaChart />
        </ExampleBlock>
        <ExampleBlock title="Pie Chart" description="Proportional slices with color-coded legend." code={PIE_CODE}>
          <PieChartComponent />
        </ExampleBlock>
        <ExampleBlock title="Donut Chart" description="Pie chart with a hollow center for emphasis values." code={DONUT_CODE}>
          <DonutChart />
        </ExampleBlock>
        <ExampleBlock title="Line Chart" description="Multi-series trend lines with legend." code={LINE_CODE}>
          <LineChart />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}