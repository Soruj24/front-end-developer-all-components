"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add bar-chart-horizontal`;
const usageCode = `import { BarChartHorizontal } from "@/components/ui/bar-chart-horizontal";

<BarChartHorizontal
  data={[
    { label: "React", value: 85 },
    { label: "Vue", value: 65 },
    { label: "Angular", value: 45 },
  ]}
/>`;

export default function BarChartHorizontalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bar Chart Horizontal</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A horizontal bar chart component for displaying data comparisons across categories with smooth animations.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Horizontal Bar Chart</h2><p className="mt-1 text-sm text-muted-foreground">Simple horizontal bars showing data values.</p></div>
        <ComponentPreview id="bar-chart-horizontal-basic">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Stacked Bars</h2><p className="mt-1 text-sm text-muted-foreground">Multiple data series stacked in a single bar.</p></div>
        <ComponentPreview id="bar-chart-horizontal-stacked">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Labeled Values</h2><p className="mt-1 text-sm text-muted-foreground">Bars with inline value labels for clarity.</p></div>
        <ComponentPreview id="bar-chart-horizontal-labeled">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
