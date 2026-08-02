import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const pricingCalculatorHeadless: RegistryEntry = entry({
    id: "pricing-calculator-headless",
    title: "Headless API",
    description:
      "The same math without the UI — drive calculatePrice, formatPrice, and buildQuote from your own controls, or your backend.",
    source: `import { useState } from "react";
import { calculatePrice, buildQuote } from "@/components/ui";

export default function PricingCalculatorHeadless() {
  const [seats, setSeats] = useState(15);
  const [cycle, setCycle] = useState("annual");

  const breakdown = calculatePrice({
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
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Seats</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease seats"
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg text-foreground transition-colors hover:bg-muted"
            >
              −
            </button>
            <span className="w-12 text-center text-lg font-semibold tabular-nums text-foreground">{seats}</span>
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
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cycle</span>
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-border">
            {["monthly", "annual"].map((c) => (
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
}`,
  });
