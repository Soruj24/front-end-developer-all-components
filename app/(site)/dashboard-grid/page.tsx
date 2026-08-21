"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DASHBOARD_GRID_SOURCE } from "./dashboard-grid-source";

import { LayoutDashboard, BarChart3, Users, TrendingUp, Activity, PieChart } from "lucide-react";

function DashboardBasic() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LayoutDashboard className="h-4 w-4" />
        <span>Basic 4-Column Dashboard</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Total Users</div>
          <div className="mt-1 text-lg font-semibold">12,345</div>
          <div className="text-[10px] text-green-600 dark:text-green-400">+12.5%</div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Revenue</div>
          <div className="mt-1 text-lg font-semibold">$48,290</div>
          <div className="text-[10px] text-green-600 dark:text-green-400">+8.2%</div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Orders</div>
          <div className="mt-1 text-lg font-semibold">1,892</div>
          <div className="text-[10px] text-red-600 dark:text-red-400">-3.1%</div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Conversion</div>
          <div className="mt-1 text-lg font-semibold">3.24%</div>
          <div className="text-[10px] text-green-600 dark:text-green-400">+0.8%</div>
        </div>
      </div>
    </div>
  );
}

function DashboardWithCharts() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Dashboard with chart widgets</p>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2 row-span-2 rounded-lg border bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium">Revenue Overview</div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 flex h-24 items-end gap-1">
            {[40,65,45,80,55,70,90,60,75,85,50,95].map((h,i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/20" style={{height: `${h}%`}} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><Users className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Active Users</span></div>
          <div className="mt-1 text-lg font-semibold">2,847</div>
          <div className="mt-2 h-1 rounded-full bg-muted"><div className="h-1 w-3/4 rounded-full bg-green-500" /></div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><TrendingUp className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Growth</span></div>
          <div className="mt-1 text-lg font-semibold">+24.5%</div>
          <div className="mt-2 h-1 rounded-full bg-muted"><div className="h-1 w-1/2 rounded-full bg-blue-500" /></div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><Activity className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Sessions</span></div>
          <div className="mt-1 text-lg font-semibold">14.2K</div>
          <div className="mt-2 h-1 rounded-full bg-muted"><div className="h-1 w-2/3 rounded-full bg-amber-500" /></div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><PieChart className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Bounce Rate</span></div>
          <div className="mt-1 text-lg font-semibold">32.1%</div>
          <div className="mt-2 h-1 rounded-full bg-muted"><div className="h-1 w-1/3 rounded-full bg-purple-500" /></div>
        </div>
      </div>
    </div>
  );
}

function DashboardSpanning() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Grid items with column spanning</p>
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-2 rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Wide Card (span 2)</div>
          <div className="mt-2 h-16 rounded bg-primary/5" />
        </div>
        <div className="col-span-4 rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Extra Wide Card (span 4)</div>
          <div className="mt-2 h-16 rounded bg-primary/5" />
        </div>
        <div className="col-span-3 rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Half Width (span 3)</div>
          <div className="mt-2 h-12 rounded bg-primary/5" />
        </div>
        <div className="col-span-3 rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Half Width (span 3)</div>
          <div className="mt-2 h-12 rounded bg-primary/5" />
        </div>
      </div>
    </div>
  );
}

function DashboardWithActivity() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Dashboard with activity feed</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-lg border bg-background p-4">
          <div className="text-xs font-medium">Performance</div>
          <div className="mt-3 flex h-20 items-end gap-2">
            {[30,50,35,65,45,75,55,85,40,70,60,80].map((h,i) => (
              <div key={i} className="flex-1 rounded bg-primary/10" style={{height: `${h}%`}} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <div className="text-xs font-medium">Recent Activity</div>
          <div className="mt-3 flex flex-col gap-2">
            {["User signed up","Order placed","Payment received","Review posted"].map((a,i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardDarkCards() {
  const cards = [
    { label: "Users", value: "12.4K", color: "from-blue-500/20 to-blue-600/10" },
    { label: "Revenue", value: "$48K", color: "from-green-500/20 to-green-600/10" },
    { label: "Orders", value: "1.8K", color: "from-amber-500/20 to-amber-600/10" },
    { label: "Growth", value: "+24%", color: "from-purple-500/20 to-purple-600/10" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Dark themed stat cards</p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-lg bg-gradient-to-br ${c.color} border p-3`}>
            <div className="text-[10px] text-muted-foreground">{c.label}</div>
            <div className="mt-1 text-lg font-semibold">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard3Column() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">3-column dashboard variant</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Metric 1</div>
          <div className="mt-1 text-lg font-semibold">1,234</div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Metric 2</div>
          <div className="mt-1 text-lg font-semibold">5,678</div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Metric 3</div>
          <div className="mt-1 text-lg font-semibold">9,012</div>
        </div>
        <div className="col-span-2 rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Chart Area</div>
          <div className="mt-2 h-16 rounded bg-primary/5" />
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="text-[10px] text-muted-foreground">Side Panel</div>
          <div className="mt-2 flex flex-col gap-1">
            <div className="h-4 rounded bg-muted/50" />
            <div className="h-4 rounded bg-muted/50" />
            <div className="h-4 rounded bg-muted/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardKPI() {
  const kpis = [
    { title: "Sales Target", value: "$125K", progress: 78, color: "bg-blue-500" },
    { title: "New Users", value: "2,400", progress: 62, color: "bg-green-500" },
    { title: "Support Tickets", value: "89", progress: 45, color: "bg-amber-500" },
    { title: "Uptime", value: "99.9%", progress: 99, color: "bg-purple-500" },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">KPI dashboard with progress indicators</p>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k) => (
          <div key={k.title} className="rounded-lg border bg-background p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{k.title}</span>
              <span className="text-sm font-semibold">{k.value}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className={`h-1.5 rounded-full ${k.color}`} style={{width: `${k.progress}%`}} />
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">{k.progress}% complete</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CODE = {
  basic: '<div className="grid grid-cols-4 gap-3">\n  <StatCard label="Total Users" value="12,345" change="+12.5%" />\n  <StatCard label="Revenue" value="$48,290" change="+8.2%" />\n  <StatCard label="Orders" value="1,892" change="-3.1%" />\n  <StatCard label="Conversion" value="3.24%" change="+0.8%" />\n</div>',
  charts: '<div className="grid grid-cols-4 gap-3">\n  <div className="col-span-2 row-span-2">\n    {/* Revenue chart */}\n  </div>\n  <StatCard label="Active Users" value="2,847" />\n  <StatCard label="Growth" value="+24.5%" />\n</div>',
  spanning: '<div className="grid grid-cols-6 gap-3">\n  <div className="col-span-2">Wide Card</div>\n  <div className="col-span-4">Extra Wide</div>\n  <div className="col-span-3">Half Width</div>\n  <div className="col-span-3">Half Width</div>\n</div>',
  activity: '<div className="grid grid-cols-3 gap-3">\n  <div className="col-span-2">Performance chart</div>\n  <div>Recent Activity feed</div>\n</div>',
  dark: '<div className="grid grid-cols-4 gap-3">\n  {cards.map((c) => (\n    <div className="rounded-lg bg-gradient-to-br ... border p-3">...</div>\n  ))}\n</div>',
  kpi: '<div className="grid grid-cols-2 gap-3">\n  {kpis.map((k) => (\n    <div>\n      <ProgressBar value={k.progress} />\n      <span>{k.value}</span>\n    </div>\n  ))}\n</div>',
  threeCol: '<div className="grid grid-cols-3 gap-3">\n  <MetricCard value="1,234" />\n  <MetricCard value="5,678" />\n  <MetricCard value="9,012" />\n</div>',
};

export default function DashboardGridPage() {
  return (
    <ComponentDocPage name="Dashboard Grid" category="Layouts" description="Grid-based dashboard layouts with stat cards, charts, spanning widgets, and activity feeds. Build data-rich interfaces with consistent spacing.">
      <PreviewPanel filename="dashboard-grid-preview.tsx">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardBasic />
          <DashboardWithCharts />
          <DashboardSpanning />
          <DashboardWithActivity />
          <DashboardDarkCards />
          <Dashboard3Column />
          <DashboardKPI />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={DASHBOARD_GRID_SOURCE} filename="DashboardGrid.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Basic Dashboard" description="4-column stat cards with key metrics." code={CODE.basic}>
          <DashboardBasic />
        </ExampleBlock>
        <ExampleBlock title="With Charts" description="Dashboard combining stats with chart widgets." code={CODE.charts}>
          <DashboardWithCharts />
        </ExampleBlock>
        <ExampleBlock title="Column Spanning" description="Items spanning multiple columns for emphasis." code={CODE.spanning}>
          <DashboardSpanning />
        </ExampleBlock>
        <ExampleBlock title="With Activity Feed" description="Charts alongside real-time activity." code={CODE.activity}>
          <DashboardWithActivity />
        </ExampleBlock>
        <ExampleBlock title="Dark Cards" description="Gradient stat cards for visual emphasis." code={CODE.dark}>
          <DashboardDarkCards />
        </ExampleBlock>
        <ExampleBlock title="3-Column Layout" description="Compact 3-column dashboard variant." code={CODE.threeCol}>
          <Dashboard3Column />
        </ExampleBlock>
        <ExampleBlock title="KPI Dashboard" description="Progress-based KPI tracking cards." code={CODE.kpi}>
          <DashboardKPI />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
