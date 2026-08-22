"use client";

import { useState } from "react";
import { Plug, CheckCircle, XCircle } from "lucide-react";

export function ConfigurableService() {
  const [name, setName] = useState("My API");
  const [connected, setConnected] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Service name..."
          className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
        <button onClick={() => setConnected(!connected)} className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${connected ? "border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300" : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"}`}>
          {connected ? "Disconnect" : "Connect"}
        </button>
      </div>
      <div className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${connected ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"}`}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${connected ? "bg-emerald-100 dark:bg-emerald-900/50" : "bg-zinc-100 dark:bg-zinc-800"}`}>
          <Plug className={`h-5 w-5 ${connected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name || "Service"}</p>
          <p className={`text-xs font-medium ${connected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}>{connected ? "Connected" : "Not connected"}</p>
        </div>
        {connected ? <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" /> : <XCircle className="h-5 w-5 shrink-0 text-zinc-300 dark:text-zinc-600" />}
      </div>
    </div>
  );
}
