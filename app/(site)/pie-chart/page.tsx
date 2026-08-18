"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add pie-chart`;

const usageCode = `import { PieChart } from "@/components/pie-chart";

<PieChart
  data={[
    { label: "Desktop", value: 45, color: "#3b82f6" },
    { label: "Mobile", value: 35, color: "#10b981" },
    { label: "Tablet", value: 20, color: "#f59e0b" },
  ]}
  type="donut"
/>`;

const trafficData = [
  { label: "Desktop", value: 45, color: "#3b82f6" },
  { label: "Mobile", value: 35, color: "#10b981" },
  { label: "Tablet", value: 20, color: "#f59e0b" },
];

const revenueData = [
  { label: "Direct", value: 4200, color: "#6366f1" },
  { label: "Organic", value: 3100, color: "#22c55e" },
  { label: "Referral", value: 2400, color: "#f97316" },
  { label: "Social", value: 1800, color: "#ec4899" },
  { label: "Email", value: 1200, color: "#14b8a6" },
];

const statusData = [
  { label: "Completed", value: 1240, color: "#22c55e" },
  { label: "In Progress", value: 380, color: "#3b82f6" },
  { label: "Pending", value: 150, color: "#f59e0b" },
  { label: "Failed", value: 42, color: "#ef4444" },
];

function Pie({ data, size = 200, innerRadius = 0 }: { data: typeof trafficData; size?: number; innerRadius?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 8;
  const ir = innerRadius;
  const slices = data.map((d, idx) => {
    const angle = (d.value / total) * 360;
    const startAngle = data.slice(0, idx).reduce((acc, item) => acc + (item.value / total) * 360, -90);
    const endAngle = startAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = size / 2 + r * Math.cos(startRad);
    const y1 = size / 2 + r * Math.sin(startRad);
    const x2 = size / 2 + r * Math.cos(endRad);
    const y2 = size / 2 + r * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    if (ir > 0) {
      const ix1 = size / 2 + ir * Math.cos(startRad);
      const iy1 = size / 2 + ir * Math.sin(startRad);
      const ix2 = size / 2 + ir * Math.cos(endRad);
      const iy2 = size / 2 + ir * Math.sin(endRad);
      return {
        ...d,
        path: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${largeArc} 0 ${ix1} ${iy1} Z`,
        percentage: ((d.value / total) * 100).toFixed(1),
      };
    }

    return {
      ...d,
      path: `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      percentage: ((d.value / total) * 100).toFixed(1),
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} className="transition-all duration-300 hover:opacity-80" stroke="hsl(var(--background))" strokeWidth={2} />
      ))}
    </svg>
  );
}

export default function PieChartPage() {
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const total = trafficData.reduce((s, d) => s + d.value, 0);
  const rTotal = revenueData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pie Chart</h1>
          <Badge variant="primary">Charts</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Pie and donut charts for proportional data visualization. Features interactive legends, hover states, and clean tooltips.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="pie-chart-donut">
        <div className="flex w-full items-center justify-center gap-8">
          <div className="relative">
            <Pie data={trafficData} size={200} innerRadius={60} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{total}%</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {trafficData.map((d, i) => (
              <div
                key={d.label}
                className={`flex items-center gap-3 transition-opacity ${activeSlice !== null && activeSlice !== i ? "opacity-40" : ""}`}
                onMouseEnter={() => setActiveSlice(i)}
                onMouseLeave={() => setActiveSlice(null)}
              >
                <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
                <div>
                  <p className="text-sm font-medium text-foreground">{d.label}</p>
                  <p className="text-xs text-muted-foreground">{d.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="pie-chart-revenue">
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <Pie data={revenueData} size={220} />
          <div className="flex flex-col gap-2">
            {revenueData.map((d) => (
              <div key={d.label} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-muted-foreground">{d.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">${d.value.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">{((d.value / rTotal) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="pie-chart-status">
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="relative">
            <Pie data={statusData} size={180} innerRadius={55} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-foreground">{statusData.reduce((s, d) => s + d.value, 0)}</span>
              <span className="text-[10px] text-muted-foreground">Tasks</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {statusData.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <div>
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="text-sm font-semibold text-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">{"{ label: string; value: number; color: string }[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">type</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pie&quot; | &quot;donut&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pie&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">200</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">showLegend</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
