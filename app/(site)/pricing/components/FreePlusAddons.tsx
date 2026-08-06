"use client";

import { useState } from "react";

export function FreePlusAddons() {
  const [addonStorage, setAddonStorage] = useState(false);
  const [addonSupport, setAddonSupport] = useState(false);
  const [addonDomain, setAddonDomain] = useState(false);
  const addonTotal = (addonStorage ? 5 : 0) + (addonSupport ? 10 : 0) + (addonDomain ? 3 : 0);

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="text-center">
        <h3 className="text-lg font-bold">Free Plan</h3>
        <div className="mt-2 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">$0</span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {[
          { label: "Extra Storage (5 GB)", price: 5, state: addonStorage, set: setAddonStorage },
          { label: "Priority Support", price: 10, state: addonSupport, set: setAddonSupport },
          { label: "Custom Domain", price: 3, state: addonDomain, set: setAddonDomain },
        ].map((a, i) => (
          <label key={i} className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={a.state} onChange={() => a.set(!a.state)} className="h-4 w-4 accent-blue-600" />
              <span className="text-sm font-medium">{a.label}</span>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">${a.price}/mo</span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 dark:border-border">
        <span className="text-sm text-muted-foreground">Monthly total</span>
        <span className="text-2xl font-bold">${addonTotal}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-muted dark:bg-foreground dark:text-background">Get Started Free</button>
    </div>
  );
}
