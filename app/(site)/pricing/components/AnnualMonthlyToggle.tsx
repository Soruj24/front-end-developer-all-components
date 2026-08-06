"use client";

import { useState } from "react";
import { standardPlans, CheckIcon } from "../data";

export function AnnualMonthlyToggle() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-4 rounded-full border border-border bg-muted p-1.5 dark:border-border dark:bg-muted">
          <button onClick={() => setBilling("monthly")} className={`rounded-full px-5 py-2 text-sm font-medium transition ${billing === "monthly" ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground hover:text-zinc-800 dark:text-muted-foreground/70"}`}>Monthly</button>
          <button onClick={() => setBilling("annual")} className={`rounded-full px-5 py-2 text-sm font-medium transition ${billing === "annual" ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground hover:text-zinc-800 dark:text-muted-foreground/70"}`}>
            Annual <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">Save 20%</span>
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {standardPlans.map((plan) => {
          const raw = parseFloat(plan.price.replace("$", ""));
          const adjusted = billing === "annual" ? (raw * 0.8).toFixed(0) : plan.price.replace("$", "");
          return (
            <div key={plan.name} className={`relative rounded-2xl border p-6 shadow-sm transition-all hover:shadow-lg ${plan.popular ? "border-blue-500 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40" : "border-border bg-white dark:border-border dark:bg-zinc-900"}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</span>}
              {billing === "annual" && raw > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">Save 20%</span>}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">${adjusted}</span>
                <span className="text-sm text-muted-foreground">{billing === "annual" ? "/mo, billed annually" : plan.period}</span>
              </div>
              {billing === "annual" && raw > 0 && <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">${(raw * 12).toFixed(0)}/yr — was ${(raw * 12 * 1.25).toFixed(0)}</p>}
              <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-foreground text-background hover:bg-muted dark:bg-foreground dark:text-background dark:hover:bg-muted"}`}>{plan.cta}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
