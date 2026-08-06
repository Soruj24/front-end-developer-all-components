"use client";

import { useState } from "react";
import { standardPlans, CheckIcon } from "../data";

export function MultiCurrency() {
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 };
  const convert = (amount: number) => (amount * currencyRates[currency]).toFixed(2);

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-muted p-1 dark:border-border dark:bg-muted">
          {(["USD", "EUR", "GBP"] as const).map((c) => (
            <button key={c} onClick={() => setCurrency(c)} className={`rounded-full px-5 py-2 text-sm font-medium transition ${currency === c ? "bg-white text-zinc-900 shadow-sm dark:bg-muted dark:text-white" : "text-muted-foreground hover:text-zinc-800"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {standardPlans.map((plan) => {
          const raw = parseFloat(plan.price.replace("$", ""));
          return (
            <div key={plan.name} className={`rounded-2xl border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900 ${plan.popular ? "ring-2 ring-blue-500" : ""}`}>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{currency === "USD" ? "$" : currency === "EUR" ? "\u20AC" : "\u00A3"}{convert(raw)}</span>
                <span className="text-sm text-muted-foreground">/{currency.toLowerCase()}/mo</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><CheckIcon />{f}</li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-xl py-2.5 text-sm font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-border text-zinc-800 hover:bg-muted/40 dark:border-border dark:text-zinc-200"}`}>{plan.cta}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
