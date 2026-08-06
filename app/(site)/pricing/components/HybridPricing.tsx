"use client";

import { useState } from "react";

export function HybridPricing() {
  const [overageUsage, setOverageUsage] = useState(5000);
  const overageBase = 29;
  const overageIncluded = 1000;
  const overageRate = 0.01;
  const overageCost = overageBase + Math.max(0, overageUsage - overageIncluded) * overageRate;

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">API calls / mo</span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-200">{overageUsage.toLocaleString()}</span>
      </div>
      <input type="range" min={0} max={100000} step={100} value={overageUsage} onChange={(e) => setOverageUsage(Number(e.target.value))} className="mt-4 w-full accent-amber-600" />
      <div className="mt-3 flex justify-between text-xs text-muted-foreground/70"><span>0</span><span>50K</span><span>100K</span></div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between"><span>Base price</span><span>${overageBase}.00</span></div>
        <div className="flex justify-between"><span>Included calls</span><span>{overageIncluded.toLocaleString()}</span></div>
        {overageUsage > overageIncluded && <div className="flex justify-between text-amber-600 dark:text-amber-400"><span>Overage ({(overageUsage - overageIncluded).toLocaleString()} × $0.01)</span><span>+${((overageUsage - overageIncluded) * 0.01).toFixed(2)}</span></div>}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
        <span className="text-sm font-medium">Total</span>
        <span className="text-3xl font-bold">${overageCost.toFixed(2)}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-amber-500 py-2.5 text-sm font-bold text-zinc-900 transition hover:bg-amber-400">Choose Plan</button>
    </div>
  );
}
