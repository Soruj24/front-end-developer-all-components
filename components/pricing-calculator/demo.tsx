import { useState } from "react";
import {
  calculatePrice,
  buildQuote,
  type Coupon,
  type PriceItem,
  type PriceBreakdown,
  type PricingPreset,
} from "@/components/ui";

/* ------------------------------------------------------------------ */
/* SaaS seats — flat + tiered items, annual discount, coupons          */
/* ------------------------------------------------------------------ */

export const saasItems: PriceItem[] = [
  {
    id: "seats",
    label: "Team seats",
    unit: "seat",
    tiers: [
      { upTo: 10, price: 20 },
      { upTo: 50, price: 18 },
      { upTo: Infinity, price: 15 },
    ],
    min: 1,
    max: 200,
    defaultQuantity: 12,
  },
  {
    id: "support",
    label: "Priority support",
    unit: "seat",
    unitPrice: 5,
    min: 0,
    max: 200,
    defaultQuantity: 5,
  },
];

export const saasCoupons: Coupon[] = [
  { code: "LAUNCH20", percent: 20 },
  { code: "TEAM50", amount: 50 },
];

export const saasPresets: PricingPreset[] = [
  { id: "starter", label: "Starter", description: "Small team", values: { seats: 8, support: 0 } },
  { id: "growth", label: "Growth", description: "Recommended", values: { seats: 30, support: 30 } },
  { id: "scale", label: "Scale", description: "Volume tier", values: { seats: 120, support: 120 } },
];

/* ------------------------------------------------------------------ */
/* Storage & usage — metered items with a smaller annual discount      */
/* ------------------------------------------------------------------ */

export const storageItems: PriceItem[] = [
  {
    id: "storage",
    label: "Storage",
    unit: "GB",
    unitPrice: 0.5,
    min: 0,
    max: 1000,
    step: 10,
    defaultQuantity: 120,
  },
  {
    id: "bandwidth",
    label: "Bandwidth",
    unit: "GB",
    unitPrice: 0.08,
    min: 0,
    max: 5000,
    step: 100,
    defaultQuantity: 800,
  },
  {
    id: "requests",
    label: "API requests",
    unit: "M req",
    unitPrice: 2,
    min: 0,
    max: 200,
    step: 5,
    defaultQuantity: 10,
  },
];

export const storageCoupons: Coupon[] = [{ code: "BETA25", percent: 25 }];

export const storagePresets: PricingPreset[] = [
  { id: "hobby", label: "Hobby", description: "Side project", values: { storage: 50, bandwidth: 200, requests: 5 } },
  { id: "pro", label: "Pro", description: "Production", values: { storage: 250, bandwidth: 1500, requests: 25 } },
  { id: "team", label: "Team", description: "High traffic", values: { storage: 800, bandwidth: 4000, requests: 100 } },
];

/* ------------------------------------------------------------------ */
/* Headless API demo — uses calculatePrice + formatPrice directly      */
/* ------------------------------------------------------------------ */

export function HeadlessPricingDemo() {
  const [seats, setSeats] = useState(15);
  const [cycle, setCycle] = useState<"monthly" | "annual">("annual");

  const breakdown: PriceBreakdown = calculatePrice({
    items: [
      { id: "seats", label: "Team seats", unitPrice: 20, quantity: seats },
      { id: "support", label: "Support", unitPrice: 5, quantity: seats },
    ],
    cycle,
    annualDiscountPercent: 20,
    coupon: { code: "SAVE10", percent: 10 },
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Seats
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease seats"
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg text-foreground transition-colors hover:bg-muted"
            >
              −
            </button>
            <span className="w-12 text-center text-lg font-semibold tabular-nums text-foreground">
              {seats}
            </span>
            <button
              type="button"
              aria-label="Increase seats"
              onClick={() => setSeats((s) => s + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg text-foreground transition-colors hover:bg-muted"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Cycle
          </span>
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border">
            {(["monthly", "annual"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                className={
                  cycle === c
                    ? "bg-foreground px-4 py-2 text-sm font-medium text-background"
                    : "bg-background px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                }
              >
                {c[0].toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-xl border border-border bg-surface/60 p-4 text-xs leading-relaxed text-foreground">
        {buildQuote(breakdown, undefined, { title: "Acme quote" })}
      </pre>
    </div>
  );
}
