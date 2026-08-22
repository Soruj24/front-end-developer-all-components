"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, Copy, Check } from "lucide-react";

export function BasicVariant() {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-zinc-400">/</span>
        <span className="flex-1 font-mono text-xs text-zinc-900 dark:text-zinc-100">^[a-z]+$</span>
        <span className="text-zinc-400">/</span>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">hello</div>
      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /><span className="text-[10px] font-medium">Match found</span></div>
    </div>
  );
}

export function ResultsVariant() {
  const tests = [{ i: "hello", m: true }, { i: "HELLO", m: false }, { i: "hello123", m: false }];
  return (
    <div className="space-y-1 w-full">{tests.map((t) => <div key={t.i} className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-xs ${t.m ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"}`}>
      <span className="font-mono text-zinc-900 dark:text-zinc-100">{t.i}</span>
      <span className={`font-medium ${t.m ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>{t.m ? "Match" : "No match"}</span>
    </div>)}</div>
  );
}

export function InteractiveVariant() {
  const [p, setP] = useState("^[a-z]+$");
  const [s, setS] = useState("hello");
  let match = false;
  let err = "";
  try { match = new RegExp(p).test(s); } catch { err = "Invalid"; }
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
        <span className="text-zinc-400">/</span>
        <input value={p} onChange={(e) => setP(e.target.value)} className="flex-1 bg-transparent font-mono text-xs text-zinc-900 outline-none dark:text-zinc-100" />
        <span className="text-zinc-400">/</span>
      </div>
      <input value={s} onChange={(e) => setS(e.target.value)} className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" placeholder="Test string..." />
      {err ? <div className="flex items-center gap-1 text-[10px] text-red-500"><XCircle className="h-3 w-3" />{err}</div> : <div className={`flex items-center gap-1 text-[10px] font-medium ${match ? "text-emerald-600" : "text-zinc-400"}`}>{match ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{match ? "Match" : "No match"}</div>}
    </div>
  );
}

export function FlagVariant() {
  const [f, setF] = useState({ g: true, i: false, m: false, s: false });
  return (
    <div className="space-y-2 w-full">
      <div className="flex gap-1">{(["g", "i", "m", "s"] as const).map((k) => <button key={k} onClick={() => setF({ ...f, [k]: !f[k] })} className={`h-7 w-7 rounded-lg font-mono text-[10px] font-bold transition-all ${f[k] ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"}`}>{k}</button>)}</div>
      <div className="rounded-lg bg-zinc-50 px-2.5 py-1.5 dark:bg-zinc-900"><p className="font-mono text-[10px] text-zinc-500">/pattern/{Object.entries(f).filter(([, v]) => v).map(([k]) => k).join("") || "-"}</p></div>
    </div>
  );
}

export function HighlightVariant() {
  const [copied, setCopied] = useState(false);
  const text = "Contact support@example.com or sales@company.org";
  const emails = ["support@example.com", "sales@company.org"];
  const parts = text.split(/(support@example\.com|sales@company\.org)/i);
  return (
    <div className="space-y-2 w-full">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">{parts.map((part, i) => emails.some((e) => e.toLowerCase() === part.toLowerCase()) ? <span key={i} className="rounded-md bg-amber-100 px-0.5 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">{part}</span> : <span key={i}>{part}</span>)}</p>
      </div>
      <div className="flex items-center justify-between"><span className="text-[10px] text-zinc-400">{emails.length} matches</span><button onClick={() => { navigator.clipboard.writeText(emails.join("\n")); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1 rounded-lg bg-zinc-900 px-2 py-1 text-[9px] font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">{copied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}{copied ? "Copied" : "Copy"}</button></div>
    </div>
  );
}
