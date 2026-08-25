"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { SectionCard } from "./SectionCard";
import { InlineSelect } from "@/components/ui/InlineSelect";

export function PerformanceDashboard() {
  const [metric, setMetric] = useState("revenue");

  const stats = [
    { label: "Daily Average", value: metric === "revenue" ? "$42K" : "18" },
    { label: "Weekly Total", value: metric === "revenue" ? "$294K" : "126" },
    { label: "Monthly Target", value: metric === "revenue" ? "$1.2M" : "500" },
    { label: "vs Last Month", value: metric === "revenue" ? "+12.4%" : "+8.2%" },
  ];

  return (
    <SectionCard title="Performance Dashboard" description="Key sales metrics at a glance">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <InlineSelect
            options={[
              { value: "revenue", label: "Revenue" },
              { value: "deals", label: "Deals" },
              { value: "calls", label: "Calls" },
              { value: "emails", label: "Emails" },
            ]}
            value={metric}
            onChange={(val) => setMetric(val)}
            size="sm"
          />
        </div>
        {stats.map((s) => (
          <div
            key={s.label}
            className={cn(
              "rounded-lg border border-border/60 p-4 text-center",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}