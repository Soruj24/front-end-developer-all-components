"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const STAT_CARD_SOURCE = `"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function StatCard({
  title,
  value,
  change = 0,
  trend = "up",
  icon,
  color = "bg-primary/10 text-primary",
}: {
  title: string;
  value: string;
  change?: number;
  trend?: "up" | "down";
  icon: React.ReactNode;
  color?: string;
}) {
  const isUp = trend === "up";
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={\`flex h-9 w-9 items-center justify-center rounded-lg \${color}\`}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <div className="mt-1 flex items-center gap-1">
          {isUp ? (
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          )}
          <span className={\`text-sm font-medium \${isUp ? "text-green-600" : "text-red-600"}\`}>
            {change}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;`;

const REVENUE_CODE = `<StatCard title="Revenue" value="$45,231" change={12.5} trend="up" icon={<DollarSign className="h-5 w-5" />} />`;

const USERS_CODE = `<StatCard title="Active Users" value="2,350" change={8.2} trend="up" icon={<Users className="h-5 w-5" />} color="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" />`;

const GROWTH_CODE = `<StatCard title="Conversion Rate" value="3.24%" change={2.1} trend="down" icon={<BarChart3 className="h-5 w-5" />} color="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" />`;

const MULTIPLE_CODE = `const stats = [
  { title: "Total Revenue", value: "$124,563", change: 12.5, trend: "up", icon: <DollarSign className="h-5 w-5" /> },
  { title: "Active Users", value: "23,456", change: 8.2, trend: "up", icon: <Users className="h-5 w-5" /> },
  { title: "Bounce Rate", value: "24.5%", change: 3.1, trend: "down", icon: <Activity className="h-5 w-5" /> },
  { title: "Sessions", value: "45,678", change: 5.7, trend: "up", icon: <BarChart3 className="h-5 w-5" /> },
];

<div className="grid grid-cols-2 gap-4">
  {stats.map((s) => <StatCard key={s.title} {...s} />)}
</div>`;

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
    <ComponentDocPage name="Stat Card" category="Data Display" description="Statistics cards with trend indicators for dashboards. Display KPIs, metrics, and key data points with visual trend feedback.">
      <PreviewPanel filename="stat-card.tsx">
        <MultipleStatsDemo />
      </PreviewPanel>

      <SourceCodeViewer source={STAT_CARD_SOURCE} filename="components/ui/StatCard/StatCard.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Revenue" description="Revenue stat with upward trend." code={REVENUE_CODE}>
          <RevenueDemo />
        </ExampleBlock>

        <ExampleBlock title="Users" description="User count with purple accent." code={USERS_CODE}>
          <UsersDemo />
        </ExampleBlock>

        <ExampleBlock title="Growth" description="Metric with downward trend." code={GROWTH_CODE}>
          <GrowthDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}