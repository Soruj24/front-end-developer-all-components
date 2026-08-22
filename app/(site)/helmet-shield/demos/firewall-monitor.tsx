"use client";

import { useState } from "react";
import { Shield, Server } from "lucide-react";

export function FirewallMonitorDemo() {
  const [active, setActive] = useState(true);
  const stats = [
    { label: "Blocked Today", value: "1,247", change: "+12%" },
    { label: "Active Rules", value: "89", change: "" },
    { label: "Uptime", value: "99.9%", change: "" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Firewall Monitor</h3>
            <button
              onClick={() => setActive(!active)}
              className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                active
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
              }`}
            >
              {active ? "Active" : "Disabled"}
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900">
                <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{s.value}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{s.label}</p>
                {s.change && <p className="text-[10px] text-red-500">{s.change}</p>}
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            {[
              { ip: "192.168.1.45", action: "Blocked", threat: "Port Scan" },
              { ip: "10.0.0.123", action: "Allowed", threat: "None" },
              { ip: "172.16.0.89", action: "Blocked", threat: "Brute Force" },
            ].map((r) => (
              <div key={r.ip} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
                <Server className="h-3 w-3 shrink-0 text-zinc-400" />
                <span className="font-mono text-[10px] text-zinc-700 dark:text-zinc-300">{r.ip}</span>
                <span className={`text-[10px] font-medium ${r.action === "Blocked" ? "text-red-500" : "text-emerald-500"}`}>{r.action}</span>
                <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">{r.threat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
