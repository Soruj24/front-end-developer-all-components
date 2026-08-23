"use client";

import { useState } from "react";
import { SortAsc, ArrowUp, ArrowDown, Filter, BarChart3, List } from "lucide-react";

export function ListVariant() {
  const [sortKey, setSortKey] = useState<"name" | "price">("name");
  const items = [{ n: "Banana", p: 2.99 }, { n: "Apple", p: 1.49 }, { n: "Cherry", p: 4.99 }];
  const sorted = [...items].sort((a, b) => (sortKey === "name" ? (a.n > b.n ? 1 : -1) : a.p - b.p));
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex gap-1 border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">{(["name", "price"] as const).map((k) => <button key={k} onClick={() => setSortKey(k)} className={`rounded-lg px-3 py-1 text-[10px] font-medium transition-all active:scale-95 ${sortKey === k ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>{k}</button>)}</div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">{sorted.map((i) => <li key={i.n} className="flex items-center justify-between px-4 py-2 text-xs"><span className="font-medium text-zinc-900 dark:text-zinc-100">{i.n}</span><span className="text-zinc-500">${i.p.toFixed(2)}</span></li>)}</ul>
    </div>
  );
}

export function DropdownVariant() {
  const [s, setS] = useState("name-asc");
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="px-4 py-2"><select value={s} onChange={(e) => setS(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
        <option value="name-asc">Name (A-Z)</option><option value="name-desc">Name (Z-A)</option><option value="category">Category</option>
      </select></div>
      <ul className="divide-y divide-zinc-100 border-t border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">{[{ n: "Widget", c: "Tools" }, { n: "Gadget", c: "Electronics" }].map((i) => <li key={i.n} className="flex items-center justify-between px-4 py-2 text-xs"><span className="font-medium text-zinc-900 dark:text-zinc-100">{i.n}</span><span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{i.c}</span></li>)}</ul>
    </div>
  );
}

export function TableVariant() {
  const [f, setF] = useState<"name" | "status">("name");
  const [d, setD] = useState<"asc" | "desc">("asc");
  const h = (field: typeof f) => { if (f === field) setD(d === "asc" ? "desc" : "asc"); else { setF(field); setD("asc"); } };
  const tasks = [{ n: "Design", s: "Done" }, { n: "Tests", s: "In Progress" }, { n: "Deploy", s: "Todo" }];
  const sorted = [...tasks].sort((a, b) => { const v = a[f] > b[f] ? 1 : -1; return d === "asc" ? v : -v; });
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <table className="w-full"><thead><tr className="border-b border-zinc-100 dark:border-zinc-800">
        {([["name", "Name"], ["status", "Status"]] as const).map(([field, label]) => <th key={field} onClick={() => h(field)} className="cursor-pointer px-4 py-2 text-left text-[10px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"><span className="flex items-center gap-1">{label} {f === field ? (d === "asc" ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />) : ""}</span></th>)}
      </tr></thead><tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">{sorted.map((t) => <tr key={t.n} className="hover:bg-zinc-50 dark:hover:bg-zinc-900"><td className="px-4 py-2 text-xs font-medium text-zinc-900 dark:text-zinc-100">{t.n}</td><td className="px-4 py-2"><span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{t.s}</span></td></tr>)}</tbody></table>
    </div>
  );
}

export function GridVariant() {
  const [f, setF] = useState("all");
  const items = [{ n: "Laptop", c: "Electronics", p: 999 }, { n: "Chair", c: "Furniture", p: 299 }];
  const filtered = f === "all" ? items : items.filter((i) => i.c === f);
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex gap-1 border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">{["all", "Electronics", "Furniture"].map((c) => <button key={c} onClick={() => setF(c)} className={`rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all active:scale-95 ${f === c ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>{c}</button>)}</div>
      <div className="grid grid-cols-2 gap-1.5 p-3">{filtered.map((i) => <div key={i.n} className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-900"><p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{i.n}</p><p className="text-[9px] text-zinc-500 dark:text-zinc-400">${i.p}</p></div>)}</div>
    </div>
  );
}

export function PriorityVariant() {
  const tasks = [{ l: "Bug", p: 1 }, { l: "Feature", p: 3 }, { l: "Docs", p: 5 }];
  const c: Record<number, string> = { 1: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400", 3: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400", 5: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" };
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">{tasks.sort((a, b) => a.p - b.p).map((t) => <li key={t.l} className="flex items-center justify-between px-4 py-2"><span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{t.l}</span><span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${c[t.p]}`}>P{t.p}</span></li>)}</ul>
    </div>
  );
}

export function RankedVariant() {
  const items = [{ n: "TypeScript", s: 95 }, { n: "JavaScript", s: 90 }, { n: "Python", s: 88 }];
  const sorted = [...items].sort((a, b) => b.s - a.s);
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <ol className="divide-y divide-zinc-100 dark:divide-zinc-800">{sorted.map((i, idx) => <li key={i.n} className="flex items-center gap-2 px-4 py-2"><span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${idx === 0 ? "bg-amber-400 text-amber-900" : idx === 1 ? "bg-zinc-300 text-zinc-700" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>{idx + 1}</span><span className="flex-1 text-xs font-medium text-zinc-900 dark:text-zinc-100">{i.n}</span><span className="text-[10px] font-bold text-zinc-500">{i.s}%</span></li>)}</ol>
    </div>
  );
}

export function ScoreVariant() {
  const players = [{ n: "Alice", s: 1250 }, { n: "Bob", s: 980 }, { n: "Charlie", s: 1420 }];
  const sorted = [...players].sort((a, b) => b.s - a.s);
  const max = sorted[0]?.s ?? 1;
  const colors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500"];
  return (
    <div className="w-full max-w-xs space-y-3 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950">
      {sorted.map((p, i) => <div key={p.n} className="space-y-1"><div className="flex items-center justify-between"><span className="text-[11px] font-medium text-zinc-900 dark:text-zinc-100">{p.n}</span><span className="text-[10px] font-bold text-zinc-500">{p.s.toLocaleString()}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"><div className={`h-full rounded-full ${colors[i % colors.length]}`} style={{ width: `${(p.s / max) * 100}%` }} /></div></div>)}
    </div>
  );
}
