"use client";

import { useState } from "react";

export function BasicCard() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Production Zone</h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">US East Region</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Active</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">128</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Instances</p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">99.9%</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Uptime</p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">42ms</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Latency</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardStatuses() {
  const statuses = [
    { name: "Production", region: "US East", status: "Active", color: "emerald", instances: 128, uptime: "99.9%", latency: "42ms" },
    { name: "Staging", region: "EU West", status: "Standby", color: "amber", instances: 32, uptime: "99.5%", latency: "78ms" },
    { name: "Development", region: "AP South", status: "Inactive", color: "zinc", instances: 0, uptime: "-", latency: "-" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {statuses.map((z) => (
        <div key={z.name} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full bg-${z.color}-500`} />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{z.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{z.region}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{z.instances} instances</span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${z.color === "emerald" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : z.color === "amber" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>{z.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardWithActions() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">API Gateway</h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Global Edge Network</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Healthy</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">2.4k</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Requests</p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">12ms</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Avg Time</p>
          </div>
          <div className="rounded-lg bg-zinc-100 p-2.5 text-center dark:bg-zinc-800">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">0.1%</p>
            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Error Rate</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Configure</button>
          <button className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">View Logs</button>
        </div>
      </div>
    </div>
  );
}

export function CardCompact() {
  return (
    <div className="mx-auto max-w-sm space-y-2">
      {["Web Server", "Database", "Cache Layer"].map((name, i) => (
        <div key={name} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${i === 0 ? "bg-emerald-500" : i === 1 ? "bg-blue-500" : "bg-amber-500"}`} />
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
          </div>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Running</span>
        </div>
      ))}
    </div>
  );
}

export function CardWithProgress() {
  const [usage, setUsage] = useState(67);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Compute Zone</h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">CPU & Memory Usage</p>
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{usage}%</span>
        </div>
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500" style={{ width: `${usage}%` }} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => setUsage(Math.max(0, usage - 10))} className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Decrease</button>
          <button onClick={() => setUsage(Math.min(100, usage + 10))} className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Increase</button>
        </div>
      </div>
    </div>
  );
}

export function CardGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: "Alpha", status: "Active", color: "emerald" },
        { name: "Beta", status: "Active", color: "emerald" },
        { name: "Gamma", status: "Standby", color: "amber" },
        { name: "Delta", status: "Active", color: "emerald" },
      ].map((z) => (
        <div key={z.name} className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className={`h-1 bg-${z.color}-500`} />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{z.name}</span>
              <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${z.color === "emerald" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>{z.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
