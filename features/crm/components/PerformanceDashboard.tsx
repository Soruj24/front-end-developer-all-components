"use client";

import { useState } from "react";
import { SectionCard } from "./SectionCard";

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
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="revenue">Revenue</option>
            <option value="deals">Deals</option>
            <option value="calls">Calls</option>
            <option value="emails">Emails</option>
          </select>
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
