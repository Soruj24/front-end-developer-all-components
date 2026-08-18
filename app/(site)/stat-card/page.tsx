"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

const installCommand = `npx component-library@latest add stat-card`;

const usageCode = `import { StatCard } from "@/components/ui";

<StatCard
  title="Revenue"
  value="$45,231"
  change={12.5}
  trend="up"
  icon={<DollarSign />}
/>`;

function StatCard({ title, value, change, trend, icon, color }: {
  title: string; value: string; change: number; trend: "up" | "down"; icon: React.ReactNode; color?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color || "bg-primary/10 text-primary"}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <div className="mt-1 flex items-center gap-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {change}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  );
}

function RevenueDemo() {
  return (
    <div className="w-full max-w-sm">
      <StatCard title="Revenue" value="$45,231" change={12.5} trend="up" icon={<DollarSign className="h-5 w-5" />} />
    </div>
  );
}

function UsersDemo() {
  return (
    <div className="w-full max-w-sm">
      <StatCard title="Active Users" value="2,350" change={8.2} trend="up" icon={<Users className="h-5 w-5" />} color="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" />
    </div>
  );
}

function GrowthDemo() {
  return (
    <div className="w-full max-w-sm">
      <StatCard title="Conversion Rate" value="3.24%" change={2.1} trend="down" icon={<BarChart3 className="h-5 w-5" />} color="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" />
    </div>
  );
}

function MultipleStatsDemo() {
  const stats = [
    { title: "Total Revenue", value: "$124,563", change: 12.5, trend: "up" as const, icon: <DollarSign className="h-5 w-5" />, color: "bg-primary/10 text-primary" },
    { title: "Active Users", value: "23,456", change: 8.2, trend: "up" as const, icon: <Users className="h-5 w-5" />, color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
    { title: "Bounce Rate", value: "24.5%", change: 3.1, trend: "down" as const, icon: <Activity className="h-5 w-5" />, color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
    { title: "Sessions", value: "45,678", change: 5.7, trend: "up" as const, icon: <BarChart3 className="h-5 w-5" />, color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  ];

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <StatCard key={s.title} {...s} />
      ))}
    </div>
  );
}

export default function StatCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Stat Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Statistics cards with trend indicators for dashboards. Display KPIs, metrics, and key data points with visual trend feedback.
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

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Revenue</h2>
          <p className="mt-1 text-sm text-muted-foreground">Revenue stat with upward trend.</p>
        </div>
        <ComponentPreview id="stat-card-revenue">
          <RevenueDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Users</h2>
          <p className="mt-1 text-sm text-muted-foreground">User count with purple accent.</p>
        </div>
        <ComponentPreview id="stat-card-users">
          <UsersDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Growth</h2>
          <p className="mt-1 text-sm text-muted-foreground">Metric with downward trend.</p>
        </div>
        <ComponentPreview id="stat-card-growth">
          <GrowthDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Multiple Stats</h2>
          <p className="mt-1 text-sm text-muted-foreground">Grid of stat cards for a dashboard view.</p>
        </div>
        <ComponentPreview id="stat-card-multiple">
          <MultipleStatsDemo />
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">change</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">trend</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;up&quot; | &quot;down&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;up&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;bg-primary/10 text-primary&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
