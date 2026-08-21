"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { PIE_CHART_SOURCE, DONUT_EXAMPLE, PIE_EXAMPLE, WITH_GAP_EXAMPLE } from "./pie-chart-source";
import { DonutDemo, PieDemo, StatusDemo } from "./pie-chart-demos";

export default function PieChartPage() {
  return (
    <ComponentDocPage
      name="Pie Chart"
      category="Charts"
      description="Pie and donut charts for proportional data visualization with interactive legends, hover states, and keyboard navigation."
    >
      <PreviewPanel filename="pie-chart.tsx">
        <DonutDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={PIE_CHART_SOURCE}
        filename="components/ui/PieChart/PieChart.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Pie Chart"
          description="Solid pie chart for revenue breakdown."
          code={PIE_EXAMPLE}
          filename="pie-chart.tsx"
        >
          <PieDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Status Overview"
          description="Compact donut with a center summary."
          code={STATUS_EXAMPLE}
          filename="status-chart.tsx"
        >
          <StatusDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}

const STATUS_EXAMPLE = `<PieChart data={statusData} type="donut" size={180}
  centerContent={<span className="text-xl font-bold">{total}</span>}
/>`;
