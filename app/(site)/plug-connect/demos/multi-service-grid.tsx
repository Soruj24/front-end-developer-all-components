"use client";

import { useState } from "react";
import { Plug, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export function MultiServiceGrid() {
  const [services, setServices] = useState([
    { id: 1, name: "GitHub", desc: "Code repository", connected: true },
    { id: 2, name: "Slack", desc: "Team messaging", connected: true },
    { id: 3, name: "Jira", desc: "Issue tracking", connected: false },
    { id: 4, name: "Notion", desc: "Documentation", connected: false },
    { id: 5, name: "Figma", desc: "Design files", connected: true },
    { id: 6, name: "Vercel", desc: "Deployment", connected: false },
  ]);

  const toggle = (id: number) => setServices(services.map((s) => (s.id === id ? { ...s, connected: !s.connected } : s)));

  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-2">
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => toggle(s.id)}
          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
            s.connected
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
              : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          }`}
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.connected ? "bg-emerald-100 dark:bg-emerald-900/50" : "bg-zinc-100 dark:bg-zinc-800"}`}>
            <Plug className={`h-4 w-4 ${s.connected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">{s.name}</p>
            <p className="truncate text-[10px] text-zinc-400 dark:text-zinc-500">{s.desc}</p>
          </div>
          {s.connected ? <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" /> : <XCircle className="h-3.5 w-3.5 shrink-0 text-zinc-300 dark:text-zinc-600" />}
        </button>
      ))}
    </div>
  );
}
