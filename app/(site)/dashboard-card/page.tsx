"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TrendingUp, TrendingDown } from "lucide-react";

const installCommand = `npx component-library@latest add dashboard-card`;
const usageCode = `import { DashboardCard } from "@/components/ui/dashboard-card";

<DashboardCard title="Revenue" value="$12,345" change={12.5} />`;

export default function DashboardCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dashboard Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A dashboard metric card for displaying KPIs, statistics, and key numbers with trend indicators and charts.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Metric Cards</h2><p className="mt-1 text-sm text-muted-foreground">Cards showing key metrics with trend arrows.</p></div>
        <ComponentPreview id="dashboard-card-metrics">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Revenue", value: "$45,231", change: 12.5, up: true },
                { title: "Users", value: "2,350", change: 8.2, up: true },
                { title: "Orders", value: "1,247", change: -3.1, up: false },
                { title: "Conversion", value: "3.2%", change: 0.8, up: true },
              ].map((card) => (
                <div key={card.title} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {card.up ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                    <span className={`text-xs font-medium ${card.up ? "text-green-600" : "text-red-600"}`}>{card.up ? "+" : ""}{card.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Mini Chart</h2><p className="mt-1 text-sm text-muted-foreground">Dashboard cards with sparkline charts.</p></div>
        <ComponentPreview id="dashboard-card-chart">
          <div className="w-full p-4">
            <div className="max-w-sm rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <span className="text-xs text-green-600 font-medium">+18%</span>
              </div>
              <p className="text-3xl font-bold">$124,563</p>
              <svg className="w-full h-12 mt-3" viewBox="0 0 200 40">
                <polyline fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" points="0,35 20,28 40,32 60,15 80,20 100,10 120,18 140,8 160,12 180,5 200,10" />
              </svg>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Status Card</h2><p className="mt-1 text-sm text-muted-foreground">Card with status indicator and progress.</p></div>
        <ComponentPreview id="dashboard-card-status">
          <div className="w-full p-4">
            <div className="max-w-sm rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-sm font-medium">System Status</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
              <div className="mt-4 space-y-2">
                {[
                  { label: "API", value: "99.9%" },
                  { label: "Database", value: "99.8%" },
                  { label: "CDN", value: "100%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
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
