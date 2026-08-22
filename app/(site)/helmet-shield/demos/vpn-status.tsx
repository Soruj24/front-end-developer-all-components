"use client";

import { useState } from "react";
import { Wifi, ShieldCheck, ShieldOff } from "lucide-react";

export function VpnStatusDemo() {
  const [connected, setConnected] = useState(false);
  const [server] = useState("US-East");

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">VPN Status</h3>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full transition-colors ${connected ? "bg-emerald-100 dark:bg-emerald-950/30" : "bg-zinc-100 dark:bg-zinc-800"}`}>
            {connected ? <ShieldCheck className="h-10 w-10 text-emerald-500" /> : <ShieldOff className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />}
          </div>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{connected ? "Connected" : "Disconnected"}</p>
          <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">{connected ? `Server: ${server}` : "Not protected"}</p>
          {connected && (
            <div className="mt-3 flex justify-center gap-4 text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>IP: 198.51.100.42</span>
              <span>Ping: 24ms</span>
            </div>
          )}
          <button onClick={() => setConnected(!connected)} className={`mt-4 w-full rounded-lg px-4 py-2 text-xs font-medium transition-all ${connected ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50" : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"}`}>
            {connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}
