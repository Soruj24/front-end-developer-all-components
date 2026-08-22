"use client";

import { useState } from "react";
import { Plug, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export function ConnectedVariant() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30"><Plug className="h-5 w-5 text-emerald-500" /></div>
      <div><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">GitHub</p><p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Connected</p></div>
    </div>
  );
}

export function ListVariant() {
  const [sel, setSel] = useState<string | null>(null);
  const svcs = [{ n: "GitHub", c: true }, { n: "Slack", c: true }, { n: "Jira", c: false }];
  return (
    <div className="space-y-1">{svcs.map((s) => <div key={s.n} className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800"><div className="flex items-center gap-2.5"><Plug className={`h-3.5 w-3.5 ${s.c ? "text-emerald-500" : "text-zinc-400"}`} /><span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{s.n}</span></div><div className={`h-2 w-2 rounded-full ${s.c ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} /></div>)}</div>
  );
}

export function ActionVariant() {
  const [c, setC] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5"><Plug className={`h-4 w-4 ${c ? "text-emerald-500" : "text-zinc-400"}`} /><div><p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">API</p><p className={`text-[10px] font-medium ${c ? "text-emerald-600" : "text-zinc-400"}`}>{c ? "Connected" : "Disconnected"}</p></div></div>
      <button onClick={() => setC(!c)} className={`rounded-lg px-3 py-1 text-[10px] font-medium transition-all ${c ? "border border-zinc-200 dark:border-zinc-700" : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"}`}>{c ? "Disconnect" : "Connect"}</button>
    </div>
  );
}

export function GridVariant() {
  const [svcs, setSvcs] = useState([{ id: 1, n: "GitHub", c: true }, { id: 2, n: "Slack", c: false }, { id: 3, n: "Jira", c: false }, { id: 4, n: "Notion", c: true }]);
  return (
    <div className="grid grid-cols-2 gap-1.5">{svcs.map((s) => <button key={s.id} onClick={() => setSvcs(svcs.map((x) => x.id === s.id ? { ...x, c: !x.c } : x))} className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${s.c ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"}`}>
      <Plug className={`h-3.5 w-3.5 ${s.c ? "text-emerald-500" : "text-zinc-400"}`} />
      <div className="min-w-0 flex-1"><p className="truncate text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">{s.n}</p></div>
      {s.c ? <CheckCircle className="h-3 w-3 shrink-0 text-emerald-500" /> : <XCircle className="h-3 w-3 shrink-0 text-zinc-300 dark:text-zinc-600" />}
    </button>)}</div>
  );
}

export function StatusVariant() {
  const [st, setSt] = useState<"connected" | "connecting" | "disconnected">("connected");
  const cfg = {
    connected: { color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", dot: "bg-emerald-500", label: "Connected" },
    connecting: { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", dot: "bg-amber-500 animate-pulse", label: "Connecting..." },
    disconnected: { color: "text-zinc-400", bg: "bg-zinc-100 dark:bg-zinc-800", dot: "bg-zinc-300", label: "Disconnected" },
  };
  const c = cfg[st];
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>{st === "connecting" ? <RefreshCw className={`h-3.5 w-3.5 ${c.color} animate-spin`} /> : <Plug className={`h-3.5 w-3.5 ${c.color}`} />}</div>
        <div><p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">DB</p><p className={`flex items-center gap-1 text-[10px] font-medium ${c.color}`}><span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />{c.label}</p></div>
      </div>
      <button onClick={() => setSt(st === "connected" ? "connecting" : st === "connecting" ? "disconnected" : "connected")} className="rounded-lg border border-zinc-200 p-1.5 text-zinc-400 hover:text-zinc-600 dark:border-zinc-700"><RefreshCw className="h-3 w-3" /></button>
    </div>
  );
}
