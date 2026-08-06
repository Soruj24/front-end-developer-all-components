"use client";

import { useState } from "react";

export function PerSeatPricing() {
  const [seatCount, setSeatCount] = useState(5);
  const seatPrice = 19;
  const seatTotal = seatCount * seatPrice;

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Number of users</span>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-lg font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">{seatCount}</span>
      </div>
      <input type="range" min={1} max={100} value={seatCount} onChange={(e) => setSeatCount(Number(e.target.value))} className="mt-4 w-full accent-blue-600" />
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 dark:border-border">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-3xl font-bold">${seatTotal.toFixed(0)}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <p className="mt-1 text-right text-xs text-muted-foreground/70">${seatPrice}/user × {seatCount} user{seatCount > 1 ? "s" : ""}</p>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">Get Started</button>
    </div>
  );
}
