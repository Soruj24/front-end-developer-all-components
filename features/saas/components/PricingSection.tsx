"use client";

import { useState } from "react";
import { pricingPlans } from "../constants/saas-data";

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Simple, transparent pricing</h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">No hidden fees. No surprises.</p>
        <div className="mt-6 inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-800">
          <button onClick={() => setBilling("monthly")} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${billing === "monthly" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}>Monthly</button>
          <button onClick={() => setBilling("annual")} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${billing === "annual" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}>Annual <span className="text-xs text-green-600 dark:text-green-400">Save 20%</span></button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className={`relative rounded-xl border p-6 ${plan.popular ? "border-blue-500 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5" : "border-zinc-200 dark:border-zinc-800"}`}>
            {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">Most Popular</span>}
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{plan.description}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{billing === "monthly" ? plan.price : plan.annualPrice}</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">/{billing === "monthly" ? "mo" : "yr"}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800/50"}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
