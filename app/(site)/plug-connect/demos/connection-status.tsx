"use client";

import { useState } from "react";
import { Plug, RefreshCw, CheckCircle } from "lucide-react";

export function ConnectionStatus() {
  const [status, setStatus] = useState<"connected" | "connecting" | "disconnected">("connected");

  const cycle = () => {
    if (status === "connected") setStatus("connecting");
    else if (status === "connecting") setStatus("disconnected");
    else setStatus("connected");
  };

  const cfg = {
    connected: { color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", dot: "bg-emerald-500", label: "Connected" },
    connecting: { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", dot: "bg-amber-500 animate-pulse", label: "Connecting..." },
    disconnected: { color: "text-zinc-400", bg: "bg-zinc-100 dark:bg-zinc-800", dot: "bg-zinc-300 dark:bg-zinc-600", label: "Disconnected" },
  };

  const c = cfg[status];

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
            {status === "connecting" ? <RefreshCw className={`h-5 w-5 ${c.color} animate-spin`} /> : <Plug className={`h-5 w-5 ${c.color}`} />}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Database</p>
            <p className={`flex items-center gap-1.5 text-xs font-medium ${c.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
              {c.label}
            </p>
          </div>
        </div>
        <button onClick={cycle} className="rounded-lg border border-zinc-200 p-2 text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-600 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
