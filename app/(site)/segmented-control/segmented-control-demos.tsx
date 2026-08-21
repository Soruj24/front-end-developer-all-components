"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Sun, Moon, Monitor, Grid, List, LayoutGrid } from "lucide-react";

export function DefaultDemo() {
  const [active, setActive] = useState("overview");
  return (
    <SegmentedControl
      options={[
        { value: "overview", label: "Overview" },
        { value: "analytics", label: "Analytics" },
        { value: "reports", label: "Reports" },
      ]}
      value={active}
      onChange={setActive}
    />
  );
}

export function IconsDemo() {
  const [theme, setTheme] = useState("system");
  return (
    <SegmentedControl
      options={[
        { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
        { value: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
        { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
      ]}
      value={theme}
      onChange={setTheme}
    />
  );
}

export function SizesDemo() {
  const [active, setActive] = useState("m");
  const options = [
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl options={options} value={active} onChange={setActive} size="sm" />
      <SegmentedControl options={options} value={active} onChange={setActive} size="md" />
      <SegmentedControl options={options} value={active} onChange={setActive} size="lg" />
    </div>
  );
}

export function ViewToggleDemo() {
  const [view, setView] = useState("grid");
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        options={[
          { value: "grid", label: "Grid", icon: <LayoutGrid className="h-4 w-4" /> },
          { value: "list", label: "List", icon: <List className="h-4 w-4" /> },
        ]}
        value={view}
        onChange={setView}
      />
      <div className="rounded-lg border border-border/60 p-4">
        {view === "grid" ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-md bg-muted/50 text-xs text-muted-foreground">
                Item {i + 1}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2 text-sm">
                <div className="h-8 w-8 shrink-0 rounded bg-muted/50" />
                <div className="flex-1">
                  <div className="text-xs font-medium">Item {i + 1}</div>
                  <div className="text-xs text-muted-foreground">Description</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function BillingDemo() {
  const [period, setPeriod] = useState("monthly");
  return (
    <div className="flex flex-col items-center gap-6">
      <SegmentedControl
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", icon: <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">-20%</span> },
        ]}
        value={period}
        onChange={setPeriod}
      />
      <div className="text-center">
        <div className="text-3xl font-bold">${period === "monthly" ? "19" : "180"}</div>
        <div className="text-sm text-muted-foreground">per {period === "monthly" ? "month" : "year"}</div>
      </div>
    </div>
  );
}

export function IconOnlyDemo() {
  const [view, setView] = useState("grid");
  return (
    <SegmentedControl
      options={[
        { value: "grid", icon: <Grid className="h-4 w-4" /> },
        { value: "list", icon: <List className="h-4 w-4" /> },
        { value: "columns", icon: <LayoutGrid className="h-4 w-4" /> },
      ]}
      value={view}
      onChange={setView}
    />
  );
}
