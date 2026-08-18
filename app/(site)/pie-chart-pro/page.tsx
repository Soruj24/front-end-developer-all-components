"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PieChart } from "lucide-react";

const installCommand = `npx component-library@latest add pie-chart-pro`;
const usageCode = `import { PieChartPro } from "@/components/pie-chart-pro";

<PieChartPro
  data={chartData}
  size={200}
  showLegend={true}
/>`;

export default function PieChartProPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pie Chart Pro</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A professional pie chart component for visualizing data distributions with legends, tooltips, and interactive segments.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Pie Chart</h2>
        <ComponentPreview>
          <div className="flex items-center gap-6 p-4">
            <svg width="120" height="120" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="40 60" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-40" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-70" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" />
            </svg>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-blue-500" /><span className="text-sm">Direct (40%)</span></div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-green-500" /><span className="text-sm">Organic (30%)</span></div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-yellow-500" /><span className="text-sm">Referral (20%)</span></div>
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-red-500" /><span className="text-sm">Social (10%)</span></div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Donut Chart</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-4">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="12" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="50 50" />
                <circle cx="18" cy="18" r="12" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="30 70" strokeDashoffset="-50" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">73%</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Hover Effect</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-4 p-4">
            {[
              { label: "Active", value: 45, color: "bg-blue-500" },
              { label: "Inactive", value: 35, color: "bg-gray-300" },
              { label: "Pending", value: 20, color: "bg-yellow-500" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <div className={`h-16 w-16 rounded-full ${item.color} opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer`} />
                <span className="text-xs text-muted-foreground">{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
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
                <td className="px-4 py-3 text-muted-foreground">ChartData[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">200</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showLegend</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
