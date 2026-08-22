"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  DUMBBELL_CHART_SOURCE,
} from "./dumbbell-chart-source";
import {
  BASIC_EXAMPLE,
  VERTICAL_EXAMPLE,
  COLOR_EXAMPLE,
  SALES_EXAMPLE,
  TEAM_EXAMPLE,
  TIMELINE_EXAMPLE,
  BUDGET_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./dumbbell-chart-examples";
import {
  HorizontalChartDemo,
  VerticalChartDemo,
  PerformanceMetricsDemo,
  SalesComparisonDemo,
  TeamStatsDemo,
  ProjectTimelineDemo,
  BudgetAnalysisDemo,
  PlaygroundDemo,
} from "./demos";

export default function DumbbellChartPage() {
  return (
    <ComponentDocPage
      name="Dumbbell Chart"
      category="Data Display"
      description="Compare two values per category with connected dumbbell endpoints. Supports horizontal and vertical orientations, custom colors, trend indicators, and an animated entrance."
    >
      <PreviewPanel filename="dumbbell-chart.tsx">
        <HorizontalChartDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DUMBBELL_CHART_SOURCE}
        filename="components/ui/DumbbellChart/DumbbellChart.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch datasets, orientation, and value visibility." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Horizontal" description="Default orientation with labels on the left and start → end values." code={BASIC_EXAMPLE}>
          <HorizontalChartDemo />
        </ExampleBlock>
        <ExampleBlock title="Vertical" description="Columns with dots along a vertical axis and delta chips underneath." code={VERTICAL_EXAMPLE}>
          <VerticalChartDemo />
        </ExampleBlock>
        <ExampleBlock title="Custom Color" description="Pass any background utility class to restyle the connector and end dot." code={COLOR_EXAMPLE}>
          <PerformanceMetricsDemo />
        </ExampleBlock>
        <ExampleBlock title="Sales Comparison" description="Target vs actual revenue per quarter with a dip highlighted by the trend icon." code={SALES_EXAMPLE}>
          <SalesComparisonDemo />
        </ExampleBlock>
        <ExampleBlock title="Team Stats" description="Sprint velocity per member, first sprint vs current sprint." code={TEAM_EXAMPLE}>
          <TeamStatsDemo />
        </ExampleBlock>
        <ExampleBlock title="Project Timeline" description="Planned vs actual completion across project phases." code={TIMELINE_EXAMPLE}>
          <ProjectTimelineDemo />
        </ExampleBlock>
        <ExampleBlock title="Budget Analysis" description="Allocated vs spent budget. Inverted ranges render correctly in both directions." code={BUDGET_EXAMPLE}>
          <BudgetAnalysisDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
