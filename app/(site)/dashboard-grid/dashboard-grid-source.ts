export const DASHBOARD_GRID_SOURCE = `"use client";

import type { ReactNode } from "react";

interface DashboardGridProps {
  columns?: number;
  gap?: number;
  children: ReactNode;
  className?: string;
}

export function DashboardGrid({ columns = 4, gap = 3, children, className = "" }: DashboardGridProps) {
  return (
    <div
      className={\`grid w-full \${className}\`}
      style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\`, gap: gap * 4 + "px" }}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  className?: string;
}

export function StatCard({ title, value, change, className = "" }: StatCardProps) {
  const positive = change?.startsWith("+");
  return (
    <div className={\`rounded-lg border border-border bg-background p-3 \${className}\`}>
      <div className="text-[10px] text-muted-foreground">{title}</div>
      <div className="mt-1 text-lg font-semibold text-foreground">{value}</div>
      {change && (
        <div className={\`text-[10px] \${positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}\`}>
          {change}
        </div>
      )}
    </div>
  );
}

interface ChartCardProps {
  title: string;
  span?: number;
  children?: ReactNode;
}

export function ChartCard({ title, span = 1, children }: ChartCardProps) {
  return (
    <div
      className="rounded-lg border border-border bg-background p-4"
      style={span > 1 ? { gridColumn: \`span \${span} / span \${span}\` } : undefined}
    >
      <div className="text-xs font-medium text-foreground">{title}</div>
      <div className="mt-3 flex h-24 items-end gap-1">
        {children}
        {[40, 65, 45, 80, 55, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-primary/20" style={{ height: h + "%" }} />
        ))}
      </div>
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<DashboardGrid columns={4}>
  <StatCard title="Users" value="1,234" change="+12%" />
  <StatCard title="Revenue" value="$48K" change="+8%" />
  <StatCard title="Orders" value="1,892" change="-3%" />
  <StatCard title="Conversion" value="3.24%" change="+0.8%" />
</DashboardGrid>`;

export const CHARTS_EXAMPLE = `<DashboardGrid columns={4}>
  <ChartCard span={2} title="Revenue Overview" />
  <StatCard title="Active Users" value="2,847" />
  <StatCard title="Growth" value="+24.5%" />
</DashboardGrid>`;

export const SPANNING_EXAMPLE = `<DashboardGrid columns={6}>
  <ChartCard span={2} title="Wide Card" />
  <ChartCard span={4} title="Extra Wide Card" />
</DashboardGrid>`;

export const ACTIVITY_EXAMPLE = `<div className="grid grid-cols-3 gap-3">
  <ChartCard span={2} title="Performance" />
  <div className="rounded-lg border bg-background p-4">
    <div className="text-xs font-medium">Recent Activity</div>
  </div>
</div>`;

export const DARK_EXAMPLE = `<DashboardGrid columns={4}>
  {stats.map((s) => (
    <div className={\`rounded-lg bg-gradient-to-br \${s.color} border p-3\`}>
      <div className="text-[10px] text-muted-foreground">{s.label}</div>
      <div className="mt-1 text-lg font-semibold">{s.value}</div>
    </div>
  ))}
</DashboardGrid>`;

export const THREECOL_EXAMPLE = `<DashboardGrid columns={3}>
  <StatCard title="Metric 1" value="1,234" />
  <StatCard title="Metric 2" value="5,678" />
  <StatCard title="Metric 3" value="9,012" />
</DashboardGrid>`;

export const KPI_EXAMPLE = `<div className="grid grid-cols-2 gap-3">
  {kpis.map((kpi) => (
    <div className="rounded-lg border bg-background p-4">
      <div className="text-xs text-muted-foreground">{kpi.title}</div>
      <div className="text-sm font-semibold">{kpi.value}</div>
      <div className="mt-2 h-1.5 rounded-full bg-muted">
        <div className={\`h-1.5 rounded-full \${kpi.color}\`} style={{ width: kpi.progress + "%" }} />
      </div>
    </div>
  ))}
</div>`;