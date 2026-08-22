"use client";

import { useState } from "react";
import { Shirt, Check } from "lucide-react";

export function CardVariant() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Shirt className="h-7 w-7 text-zinc-400 dark:text-zinc-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">Classic T-Shirt</p>
          <p className="mt-0.5 text-base font-bold text-zinc-900 dark:text-zinc-100">$29.99</p>
        </div>
      </div>
    </div>
  );
}

export function SizeVariant() {
  const [sel, setSel] = useState("M");
  return (
    <div className="w-full max-w-xs space-y-2.5 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Size</p>
      <div className="flex gap-1.5">{(["S", "M", "L", "XL"] as const).map((s) => <button key={s} onClick={() => setSel(s)} className={`h-9 w-9 rounded-lg text-xs font-medium transition-all ${sel === s ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"}`}>{s}</button>)}</div>
    </div>
  );
}

export function ColorVariant() {
  const [sel, setSel] = useState("#000000");
  return (
    <div className="w-full max-w-xs space-y-2.5 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Color</p>
      <div className="flex gap-2">{[{ n: "Black", v: "#000000" }, { n: "White", v: "#ffffff" }, { n: "Blue", v: "#3b82f6" }, { n: "Red", v: "#ef4444" }].map((c) => <button key={c.v} onClick={() => setSel(c.v)} className={`relative h-8 w-8 rounded-full transition-all ${sel === c.v ? "ring-2 ring-zinc-900 ring-offset-2 dark:ring-zinc-100" : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-1"} ${c.v === "#ffffff" ? "border border-zinc-200 dark:border-zinc-700" : ""}`} style={{ backgroundColor: c.v }} aria-label={c.n}>{sel === c.v && <Check className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${c.v === "#ffffff" ? "text-zinc-900" : "text-white"}`} />}</button>)}</div>
    </div>
  );
}

export function DetailVariant() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex items-center justify-center bg-zinc-100 py-6 dark:bg-zinc-800"><Shirt className="h-16 w-16 text-zinc-300 dark:text-zinc-600" /></div>
      <div className="space-y-3 p-4">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Classic T-Shirt</p>
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">$29.99</p>
        <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-900 py-2.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"><Shirt className="h-3.5 w-3.5" /> Add to Cart</button>
      </div>
    </div>
  );
}

export function StockVariant() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-white opacity-75 dark:border-zinc-700 dark:bg-zinc-950">
      <div className="relative flex items-center justify-center bg-zinc-100 py-6 dark:bg-zinc-800">
        <Shirt className="h-16 w-16 text-zinc-300 dark:text-zinc-600" />
        <span className="absolute rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Out of Stock</span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Classic T-Shirt</p>
        <p className="text-lg font-bold text-zinc-400 line-through dark:text-zinc-500">$29.99</p>
        <button disabled className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-xs font-medium text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">Sold Out</button>
      </div>
    </div>
  );
}
