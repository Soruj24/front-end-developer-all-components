"use client";

import { useState } from "react";

export function UsageBasedPricing() {
  const [usageSlider, setUsageSlider] = useState(2);
  const usageLabels = ["100K / mo", "500K / mo", "1M / mo", "5M / mo"];
  const usageBasePrices = [29, 99, 199, 699];
  const usagePrice = usageBasePrices[usageSlider];

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Monthly requests</span>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-200">{usageLabels[usageSlider]}</span>
      </div>
      <input type="range" min={0} max={3} value={usageSlider} onChange={(e) => setUsageSlider(Number(e.target.value))} className="mt-4 w-full accent-violet-600" />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground/70">
        <span>100K</span><span>500K</span><span>1M</span><span>5M</span>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 dark:border-border">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-3xl font-bold">${usagePrice}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700">Get Started</button>
    </div>
  );
}
