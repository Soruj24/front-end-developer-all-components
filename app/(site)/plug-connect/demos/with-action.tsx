"use client";

import { useState } from "react";
import { Plug } from "lucide-react";

export function WithAction() {
  const [connected, setConnected] = useState(false);
  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${connected ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-zinc-100 dark:bg-zinc-800"}`}>
            <Plug className={`h-5 w-5 ${connected ? "text-emerald-500" : "text-zinc-400"}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">API Service</p>
            <p className={`text-xs font-medium ${connected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`}>{connected ? "Connected" : "Not connected"}</p>
          </div>
        </div>
        <button
          onClick={() => setConnected(!connected)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            connected
              ? "border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          }`}
        >
          {connected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
