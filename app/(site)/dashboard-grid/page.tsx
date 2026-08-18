"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { LayoutDashboard, BarChart3, Users, TrendingUp, Activity, PieChart } from "lucide-react";

const installCommand = `npx component-library@latest add dashboard-grid`;

const usageCode = `import { DashboardGrid, StatCard, ChartCard } from "@/components/ui/DashboardGrid";

<DashboardGrid columns={4}>
  <StatCard title="Users" value="1,234" change="+12%" />
  <StatCard title="Revenue" value="$48K" change="+8%" />
  <ChartCard span={2} title="Analytics" />
  <ChartCard title="Revenue" />
</DashboardGrid>`;

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
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/20" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><Users className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Active Users</span></div>
          <div className="mt-1 text-lg font-semibold">2,847</div>
          <div className="mt-2 h-1 rounded-full bg-muted">
            <div className="h-1 w-3/4 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><TrendingUp className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Growth</span></div>
          <div className="mt-1 text-lg font-semibold">+24.5%</div>
          <div className="mt-2 h-1 rounded-full bg-muted">
            <div className="h-1 w-1/2 rounded-full bg-blue-500" />
          </div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><Activity className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Sessions</span></div>
          <div className="mt-1 text-lg font-semibold">14.2K</div>
          <div className="mt-2 h-1 rounded-full bg-muted">
            <div className="h-1 w-2/3 rounded-full bg-amber-500" />
          </div>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="flex items-center gap-2"><PieChart className="h-3 w-3 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">Bounce Rate</span></div>
          <div className="mt-1 text-lg font-semibold">32.1%</div>
          <div className="mt-2 h-1 rounded-full bg-muted">
            <div className="h-1 w-1/3 rounded-full bg-purple-500" />
          </div>
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
            {[30, 50, 35, 65, 45, 75, 55, 85, 40, 70, 60, 80].map((h, i) => (
              <div key={i} className="flex-1 rounded bg-primary/10" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <div className="text-xs font-medium">Recent Activity</div>
          <div className="mt-3 flex flex-col gap-2">
            {["User signed up", "Order placed", "Payment received", "Review posted"].map((activity, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {activity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardDarkCards() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Dark themed stat cards</p>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Users", value: "12.4K", color: "from-blue-500/20 to-blue-600/10" },
          { label: "Revenue", value: "$48K", color: "from-green-500/20 to-green-600/10" },
          { label: "Orders", value: "1.8K", color: "from-amber-500/20 to-amber-600/10" },
          { label: "Growth", value: "+24%", color: "from-purple-500/20 to-purple-600/10" },
        ].map((card) => (
          <div key={card.label} className={`rounded-lg bg-gradient-to-br ${card.color} border p-3`}>
            <div className="text-[10px] text-muted-foreground">{card.label}</div>
            <div className="mt-1 text-lg font-semibold">{card.value}</div>
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
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">KPI dashboard with progress indicators</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "Sales Target", value: "$125K", progress: 78, color: "bg-blue-500" },
          { title: "New Users", value: "2,400", progress: 62, color: "bg-green-500" },
          { title: "Support Tickets", value: "89", progress: 45, color: "bg-amber-500" },
          { title: "Uptime", value: "99.9%", progress: 99, color: "bg-purple-500" },
        ].map((kpi) => (
          <div key={kpi.title} className="rounded-lg border bg-background p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{kpi.title}</span>
              <span className="text-sm font-semibold">{kpi.value}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className={`h-1.5 rounded-full ${kpi.color}`} style={{ width: `${kpi.progress}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">{kpi.progress}% complete</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardGridPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dashboard Grid</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Grid-based dashboard layouts with stat cards, charts, spanning widgets, and activity feeds. Build data-rich interfaces with consistent spacing.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">4-column stat cards with key metrics.</p>
        </div>
        <ComponentPreview id="dashboard-basic">
          <DashboardBasic />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Charts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Dashboard combining stats with chart widgets.</p>
        </div>
        <ComponentPreview id="dashboard-charts">
          <DashboardWithCharts />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Column Spanning</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items spanning multiple columns for emphasis.</p>
        </div>
        <ComponentPreview id="dashboard-spanning">
          <DashboardSpanning />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Activity Feed</h2>
          <p className="mt-1 text-sm text-muted-foreground">Charts alongside real-time activity.</p>
        </div>
        <ComponentPreview id="dashboard-activity">
          <DashboardWithActivity />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dark Cards</h2>
          <p className="mt-1 text-sm text-muted-foreground">Gradient stat cards for visual emphasis.</p>
        </div>
        <ComponentPreview id="dashboard-dark">
          <DashboardDarkCards />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">3-Column Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">Compact 3-column dashboard variant.</p>
        </div>
        <ComponentPreview id="dashboard-3col">
          <Dashboard3Column />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">KPI Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">Progress-based KPI tracking cards.</p>
        </div>
        <ComponentPreview id="dashboard-kpi">
          <DashboardKPI />
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
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">3</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">span</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
