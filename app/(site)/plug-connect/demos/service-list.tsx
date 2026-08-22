"use client";

import { Plug } from "lucide-react";

export function ServiceList() {
  const services = [
    { name: "GitHub", connected: true },
    { name: "Slack", connected: true },
    { name: "Jira", connected: false },
  ];

  return (
    <div className="w-full max-w-sm space-y-1.5">
      {services.map((service) => (
        <div key={service.name} className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2.5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${service.connected ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-zinc-100 dark:bg-zinc-800"}`}>
              <Plug className={`h-4 w-4 ${service.connected ? "text-emerald-500" : "text-zinc-400"}`} />
            </div>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{service.name}</span>
          </div>
          <div className={`h-2 w-2 rounded-full ${service.connected ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
        </div>
      ))}
    </div>
  );
}
