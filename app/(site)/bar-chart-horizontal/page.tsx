"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const BAR_CHART_HORIZONTAL_SOURCE = `"use client";

interface BarItem {
  label: string;
  value: number;
  color?: string;
}

interface BarChartHorizontalProps {
  data: BarItem[];
  showValue?: boolean;
}

export function BarChartHorizontal({ data, showValue = true }: BarChartHorizontalProps) {
  return (
    <div className="w-full space-y-3">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-20 text-right text-sm text-muted-foreground">{item.label}</span>
          <div className="h-6 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={\`h-full rounded-full \${item.color ?? "bg-primary"} transition-all duration-500\`}
              style={{ width: \`\${item.value}%\` }}
            />
          </div>
          {showValue && <span className="w-10 text-sm font-medium">{item.value}%</span>}
        </div>
      ))}
    </div>
  );
}`;

const BASIC_EXAMPLE = `<BarChartHorizontal
  data={[
    { label: "React", value: 85, color: "bg-blue-500" },
    { label: "Vue", value: 65, color: "bg-green-500" },
    { label: "Angular", value: 45, color: "bg-red-500" },
  ]}
/>`;

const STACKED_EXAMPLE = `[{ label: "Q1", segments: [
  { w: 30, color: "bg-primary" },
  { w: 20, color: "bg-primary/60" },
  { w: 10, color: "bg-primary/30" },
]}].map((item) => (
  <div className="flex flex-1 overflow-hidden rounded-full bg-muted">
    {item.segments.map((s, i) => (
      <div key={i} className={\`h-full \${s.color}\`} style={{ width: \`\${s.w}%\` }} />
    ))}
  </div>
))`;

const LABELED_EXAMPLE = `<BarChartHorizontal
  data={[{ label: "Downloads", value: 92, color: "bg-emerald-500" }]}
  showValue
/>`;

function BasicChartDemo() {
  return (
    <div className="w-full p-4 space-y-3">
      {[{ label: "React", value: 85, color: "bg-blue-500" }, { label: "Vue", value: 65, color: "bg-green-500" }, { label: "Angular", value: 45, color: "bg-red-500" }].map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-20 text-sm text-right text-muted-foreground">{item.label}</span>
          <div className="flex-1 h-6 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full ${item.color} transition-all duration-500`} style={{ width: `${item.value}%` }} />
          </div>
          <span className="w-10 text-sm font-medium">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}

function StackedChartDemo() {
  return (
    <div className="w-full p-4 space-y-3">
      {[{ label: "Q1", segments: [{ w: 30, color: "bg-primary" }, { w: 20, color: "bg-primary/60" }, { w: 10, color: "bg-primary/30" }] }, { label: "Q2", segments: [{ w: 25, color: "bg-primary" }, { w: 30, color: "bg-primary/60" }, { w: 15, color: "bg-primary/30" }] }].map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-10 text-sm text-right text-muted-foreground">{item.label}</span>
          <div className="flex-1 h-6 rounded-full bg-muted overflow-hidden flex">
            {item.segments.map((s, i) => (
              <div key={i} className={`h-full ${s.color}`} style={{ width: `${s.w}%` }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LabeledValuesDemo() {
  return (
    <div className="w-full p-4 space-y-3">
      {[{ label: "Downloads", value: 92, color: "bg-emerald-500" }, { label: "Installs", value: 78, color: "bg-cyan-500" }, { label: "Active Users", value: 60, color: "bg-violet-500" }].map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-24 text-sm text-muted-foreground">{item.label}</span>
          <div className="flex-1 h-8 rounded-lg bg-muted overflow-hidden relative">
            <div className={`h-full rounded-lg ${item.color} flex items-center justify-end pr-2 transition-all`} style={{ width: `${item.value}%` }}>
              <span className="text-xs font-medium text-white">{item.value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BarChartHorizontalPage() {
  return (
    <ComponentDocPage
      name="Bar Chart Horizontal"
      category="Data Display"
      description="A horizontal bar chart component for displaying data comparisons across categories with smooth animations."
    >
      <PreviewPanel filename="bar-chart-horizontal.tsx">
        <BasicChartDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BAR_CHART_HORIZONTAL_SOURCE} filename="components/ui/BarChartHorizontal/BarChartHorizontal.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Horizontal Bar Chart" description="Simple horizontal bars showing data values." code={BASIC_EXAMPLE}><BasicChartDemo /></ExampleBlock>
        <ExampleBlock title="Stacked Bars" description="Multiple data series stacked in a single bar." code={STACKED_EXAMPLE}><StackedChartDemo /></ExampleBlock>
        <ExampleBlock title="Labeled Values" description="Bars with inline value labels for clarity." code={LABELED_EXAMPLE}><LabeledValuesDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}