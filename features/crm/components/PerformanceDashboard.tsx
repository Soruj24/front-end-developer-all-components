"use client";

import { useState } from "react";
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
          <div key={s.label} className="rounded-lg border border-zinc-200 p-4 text-center dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{s.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
