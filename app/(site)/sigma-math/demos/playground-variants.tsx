"use client";

import { useState } from "react";
import { Sigma, Hash, Minus, Divide, Percent, Equal } from "lucide-react";

export function FormulaVariant() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-5 dark:border-zinc-700 dark:bg-zinc-950">
      <span className="text-3xl font-serif italic text-zinc-900 dark:text-zinc-100">E = mc&sup2;</span>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Mass-energy equivalence</p>
    </div>
  );
}

export function EquationVariant() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-700 dark:bg-zinc-950">
      <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="h-10 w-14 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-xs font-semibold text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
      <span className="text-lg font-bold text-zinc-400">+</span>
      <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="h-10 w-14 rounded-xl border border-zinc-200 bg-zinc-50 text-center text-xs font-semibold text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
      <span className="text-lg font-bold text-zinc-400">=</span>
      <span className="flex h-10 w-14 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">{a + b}</span>
    </div>
  );
}

export function StatsVariant() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[{ l: "Mean", v: "20.1", c: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30", I: Sigma }, { l: "Max", v: "30", c: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", I: Hash }, { l: "Min", v: "12", c: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30", I: Minus }].map((s) => (
        <div key={s.l} className="flex flex-col items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}><s.I className={`h-4 w-4 ${s.c}`} /></div>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{s.v}</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

export function CalculatorVariant() {
  const [d, setD] = useState("0");
  const h = (n: string) => setD((v) => (v === "0" ? n : v + n));
  return (
    <div className="w-full max-w-[200px] overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="bg-zinc-100 px-3 py-3 text-right font-mono text-lg font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{d}</div>
      <div className="grid grid-cols-4 gap-1 p-2">
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((b) => (
          <button key={b} onClick={() => { if (b === "=") { try { setD(String(eval(d))); } catch { setD("Error"); } } else h(b); }} className={`flex h-8 items-center justify-center rounded-lg text-xs font-medium transition-all active:scale-95 ${b === "=" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"}`}>{b}</button>
        ))}
        <button onClick={() => setD("0")} className="col-span-4 flex h-8 items-center justify-center rounded-lg bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400">C</button>
      </div>
    </div>
  );
}

export function SumVariant() {
  const [n, setN] = useState(5);
  const sum = (n * (n + 1)) / 2;
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-5 dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-serif italic text-zinc-900 dark:text-zinc-100">&Sigma;</span>
        <div className="flex flex-col items-center"><span className="text-[9px] text-zinc-500">n={n}</span><span className="text-[10px] text-zinc-600 dark:text-zinc-300">i=1</span></div>
        <span className="text-lg font-serif italic text-zinc-700 dark:text-zinc-300">i</span>
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">= {sum}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-500">n:</span>
        <input type="range" min={1} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <span className="w-6 rounded-md bg-zinc-100 py-0.5 text-center text-[10px] font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{n}</span>
      </div>
    </div>
  );
}

export function GridVariant() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[{ I: Sigma, l: "Sum", c: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" }, { I: Minus, l: "Sub", c: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" }, { I: Divide, l: "Div", c: "text-green-500", bg: "bg-green-50 dark:bg-green-950/30" }, { I: Percent, l: "Mod", c: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30" }, { I: Equal, l: "Eq", c: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" }, { I: Hash, l: "Card", c: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/30" }].map((o) => (
        <div key={o.l} className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-950">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${o.bg}`}><o.I className={`h-4 w-4 ${o.c}`} /></div>
          <span className="text-[9px] font-medium text-zinc-500 dark:text-zinc-400">{o.l}</span>
        </div>
      ))}
    </div>
  );
}
