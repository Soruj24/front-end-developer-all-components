"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Hammer, Wrench, Drill, Ruler, Paintbrush, HardHat, DollarSign, Settings } from "lucide-react";

const installCommand = `npx component-library@latest add hammer-tool`;
const usageCode = `import { HammerTool } from "@/components/hammer-tool";

<HammerTool />`;

function ToolInventoryDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const tools = [
    { id: "hammer", name: "Hammer", icon: Hammer, count: 3, status: "available" },
    { id: "wrench", name: "Wrench Set", icon: Wrench, count: 2, status: "available" },
    { id: "drill", name: "Power Drill", icon: Drill, count: 1, status: "in-use" },
    { id: "screwdriver", name: "Screwdrivers", icon: Settings, count: 5, status: "available" },
  ];
  const statusColors = {
    available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    "in-use": "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    maintenance: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Tool Inventory</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{tools.length} items</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelected(selected === tool.id ? null : tool.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                selected === tool.id
                  ? "border-primary bg-primary/5"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <tool.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">{tool.name}</p>
                <p className="text-[10px] text-muted-foreground">Qty: {tool.count}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${statusColors[tool.status as keyof typeof statusColors]}`}>
                {tool.status}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectTasksDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Frame walls", done: true },
    { id: 2, label: "Install electrical", done: true },
    { id: 3, label: "Drywall installation", done: false },
    { id: 4, label: "Paint interior", done: false },
    { id: 5, label: "Install fixtures", done: false },
  ]);

  const toggle = (id: number) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <HardHat className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Project Tasks</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{completed}/{tasks.length}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completed / tasks.length) * 100}%` }} />
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggle(task.id)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                  task.done ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
                }`}
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  task.done ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                }`}>
                  {task.done && <span className="text-[10px]">✓</span>}
                </div>
                <span className={`text-xs ${task.done ? "line-through text-muted-foreground" : "font-medium"}`}>{task.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCategoriesDemo() {
  const categories = [
    { name: "Hand Tools", icon: Hammer, count: 24, color: "text-amber-600" },
    { name: "Power Tools", icon: Drill, count: 12, color: "text-blue-600" },
    { name: "Measuring", icon: Ruler, count: 8, color: "text-green-600" },
    { name: "Painting", icon: Paintbrush, count: 15, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {categories.map((cat) => (
        <div key={cat.name} className="rounded-xl border border-black/[.08] bg-card p-4 dark:border-white/[.145]">
          <cat.icon className={`h-6 w-6 ${cat.color} mb-2`} />
          <p className="text-sm font-bold">{cat.name}</p>
          <p className="text-[10px] text-muted-foreground">{cat.count} items</p>
        </div>
      ))}
    </div>
  );
}

function WorkshopDashboardDemo() {
  const stats = [
    { label: "Total Tools", value: "156", change: "+12" },
    { label: "In Use", value: "43", change: "-5" },
    { label: "Maintenance", value: "8", change: "+2" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Workshop Dashboard</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-xl font-extrabold">{s.value}</p>
                <p className="text-[9px] text-muted-foreground">{s.label}</p>
                <p className={`text-[9px] font-medium ${s.change.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>{s.change}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { name: "Drill Press", status: "Available", time: "Last used 2h ago" },
              { name: "Table Saw", status: "In Use", time: "Since 10:30 AM" },
              { name: "Belt Sander", status: "Maintenance", time: "Scheduled 3PM" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.status === "Available" ? "#22c55e" : item.status === "In Use" ? "#eab308" : "#ef4444" }} />
                <div className="flex-1">
                  <p className="text-xs font-medium">{item.name}</p>
                  <p className="text-[9px] text-muted-foreground">{item.time}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolRentalDemo() {
  const [days, setDays] = useState(1);
  const tools = [
    { name: "Hammer Drill", pricePerDay: 25, icon: Drill },
    { name: "Circular Saw", pricePerDay: 35, icon: Hammer },
    { name: "Sander Kit", pricePerDay: 15, icon: Wrench },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Tool Rental</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-muted-foreground">Rental days:</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setDays((d) => Math.max(1, d - 1))} className="h-7 w-7 rounded-md bg-muted text-xs font-bold hover:bg-muted/80">-</button>
              <span className="w-8 text-center font-mono text-sm font-bold">{days}</span>
              <button onClick={() => setDays((d) => Math.min(30, d + 1))} className="h-7 w-7 rounded-md bg-muted text-xs font-bold hover:bg-muted/80">+</button>
            </div>
          </div>
          <div className="space-y-2">
            {tools.map((tool) => (
              <div key={tool.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-3">
                <tool.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs font-bold">{tool.name}</p>
                  <p className="text-[10px] text-muted-foreground">${tool.pricePerDay}/day</p>
                </div>
                <p className="text-sm font-extrabold">${tool.pricePerDay * days}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-foreground/5 p-3">
            <span className="text-xs font-medium">Total</span>
            <span className="text-lg font-extrabold">${tools.reduce((sum, t) => sum + t.pricePerDay * days, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaintenanceScheduleDemo() {
  const items = [
    { tool: "Power Drill", lastService: "Jan 15", nextService: "Apr 15", status: "ok" },
    { tool: "Circular Saw", lastService: "Dec 10", nextService: "Mar 10", status: "due" },
    { tool: "Sander", lastService: "Nov 20", nextService: "Feb 20", status: "overdue" },
  ];
  const statusStyles = {
    ok: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    due: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Maintenance Schedule</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {items.map((item) => (
            <div key={item.tool} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs font-bold">{item.tool}</p>
                <p className="text-[9px] text-muted-foreground">Last: {item.lastService}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-medium">Next: {item.nextService}</p>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${statusStyles[item.status as keyof typeof statusStyles]}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConstructionQuoteDemo() {
  const items = [
    { label: "Framing Labor", qty: 40, unit: "hrs", rate: 50 },
    { label: "Lumber", qty: 1, unit: "lot", rate: 1200 },
    { label: "Nails & Screws", qty: 1, unit: "box", rate: 45 },
    { label: "Drywall", qty: 20, unit: "sheets", rate: 15 },
  ];
  const total = items.reduce((sum, i) => sum + i.qty * i.rate, 0);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Construction Quote</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <div>
                  <p className="text-xs font-medium">{item.label}</p>
                  <p className="text-[9px] text-muted-foreground">{item.qty} {item.unit} × ${item.rate}</p>
                </div>
                <p className="text-xs font-bold">${item.qty * item.rate}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg bg-foreground/5 p-3">
            <span className="text-sm font-medium">Total Estimate</span>
            <span className="text-xl font-extrabold">${total.toLocaleString()}</span>
          </div>
          <button className="mt-3 w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HammerToolPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hammer Tool
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A hammer tool icon component for construction and tool-related data display.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tool Inventory</h3>
          <p className="text-sm text-muted-foreground">
            Toolbox with status indicators.
          </p>
          <ComponentPreview id="hammer-inventory">
            <ToolInventoryDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Project Tasks</h3>
          <p className="text-sm text-muted-foreground">
            Construction project task tracker.
          </p>
          <ComponentPreview id="hammer-tasks">
            <ProjectTasksDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tool Categories</h3>
          <p className="text-sm text-muted-foreground">
            Different tool type categories.
          </p>
          <ComponentPreview id="hammer-categories">
            <ToolCategoriesDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Workshop Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Workshop management overview.
          </p>
          <ComponentPreview id="hammer-workshop">
            <WorkshopDashboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tool Rental</h3>
          <p className="text-sm text-muted-foreground">
            Rental pricing calculator.
          </p>
          <ComponentPreview id="hammer-rental">
            <ToolRentalDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Maintenance Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Tool maintenance tracking.
          </p>
          <ComponentPreview id="hammer-maintenance">
            <MaintenanceScheduleDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Construction Quote</h3>
          <p className="text-sm text-muted-foreground">
            Project cost estimator.
          </p>
          <ComponentPreview id="hammer-quote">
            <ConstructionQuoteDemo />
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
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
