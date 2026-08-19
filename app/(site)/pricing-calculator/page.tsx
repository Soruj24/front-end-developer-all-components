"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { PricingCalculator } from "@/components/ui";
import {
  saasItems,
  saasCoupons,
  saasPresets,
  storageItems,
  storageCoupons,
  storagePresets,
} from "@/components/pricing-calculator/demo";

const PRICING_CALCULATOR_SOURCE = `"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { PriceItem, BillingCycle, Coupon, PricingPreset } from "./PricingCalculator.types";

export interface PricingCalculatorProps {
  items: PriceItem[];
  defaultCycle?: BillingCycle;
  annualDiscountPercent?: number;
  coupons?: Coupon[];
  presets?: PricingPreset[];
  title?: string;
  description?: string;
}

export function PricingCalculator({
  items,
  defaultCycle = "monthly",
  annualDiscountPercent = 20,
  coupons = [],
  presets = [],
  title,
  description,
}: PricingCalculatorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.defaultQuantity ?? item.min ?? 1]))
  );
  const [cycle, setCycle] = useState<BillingCycle>(defaultCycle);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const discount = appliedCoupon?.percent ?? 0;
  const subtotal = useMemo(() => {
    const base = items.reduce((sum, item) => {
      const qty = quantities[item.id] ?? item.min ?? 1;
      const unit = item.tiers?.find((t) => qty <= t.upTo)?.price ?? item.unitPrice ?? 0;
      return sum + unit * qty;
    }, 0);
    const annualized = cycle === "annual" ? base * (1 - annualDiscountPercent / 100) : base;
    return annualized * (1 - discount / 100);
  }, [items, quantities, cycle, annualDiscountPercent, discount]);

  return (
    <div className="w-full rounded-2xl border border-border bg-background">
      {(title || description) && (
        <header className="border-b border-border px-5 py-4 sm:px-6">
          {title && <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </header>
      )}
      <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-6">
          {presets.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Quick start</span>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((preset) => (
                  <button key={preset.id} type="button" onClick={() => setQuantities((prev) => ({ ...prev, ...preset.values }))} className="flex flex-col items-start gap-0.5 rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-colors hover:text-foreground">
                    <span className="text-sm font-medium">{preset.label}</span>
                    {preset.description && <span className="text-[11px] leading-tight opacity-80">{preset.description}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {items.map((item) => {
            const qty = quantities[item.id] ?? item.min ?? 1;
            const min = item.min ?? 1;
            const max = item.max ?? 100;
            const fillPct = max > min ? Math.min(100, ((qty - min) / (max - min)) * 100) : 100;
            const unit = item.tiers?.find((t) => qty <= t.upTo)?.price ?? item.unitPrice ?? 0;
            return (
              <div key={item.id} className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-lg font-semibold tabular-nums text-foreground">
                    {qty}{item.unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{item.unit}{qty !== 1 ? "s" : ""}</span>}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={item.step ?? 1}
                  value={qty}
                  onChange={(e) => setQuantities((prev) => ({ ...prev, [item.id]: Number(e.target.value) }))}
                  aria-label={\`\${item.label} quantity\`}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none"
                  style={{ background: \`linear-gradient(to right, var(--primary) \${fillPct}%, var(--muted) \${fillPct}%)\` }}
                />
              </div>
            );
          })}
          <div className="flex flex-col gap-4 border-t border-border pt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">Billing cycle</span>
                <div className="grid grid-cols-2 rounded-full border border-border bg-muted/40 p-1">
                  {(["monthly", "annual"] as const).map((c) => (
                    <button key={c} type="button" onClick={() => setCycle(c)} className={cn("rounded-full px-3 py-1.5 text-sm font-medium transition-colors", cycle === c ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                      {c[0].toUpperCase() + c.slice(1)}{c === "annual" && <span className="ml-1 text-xs font-semibold text-success">−{annualDiscountPercent}%</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {coupons.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-end gap-2">
                  <input placeholder="e.g. SAVE20" className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1" />
                  <button type="button" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface/60 p-5">
          <div className="flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-3xl font-semibold tabular-nums text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          {cycle === "annual" && (
            <p className="text-xs text-success">You save {annualDiscountPercent}% with annual billing.</p>
          )}
        </div>
      </div>
    </div>
  );
}`;

export default function PricingCalculatorPage() {
  return (
    <ComponentDocPage
      name="Pricing Calculator"
      category="Commerce"
      description="A reusable quote builder with volume tiers, billing cycles, presets, and coupons. The same price engine is exported as pure functions for headless use."
    >
      <PreviewPanel filename="pricing-calculator.tsx">
        <PricingCalculator
          title="SaaS billing"
          items={saasItems}
          coupons={saasCoupons}
          presets={saasPresets}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={PRICING_CALCULATOR_SOURCE}
        filename="components/ui/PricingCalculator/PricingCalculator.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="SaaS Seats"
          description="Tiered seat pricing with presets and coupons."
          code={PRICING_CALCULATOR_SOURCE}
        >
          <PricingCalculator
            title="SaaS billing"
            items={saasItems}
            coupons={saasCoupons}
            presets={saasPresets}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Storage & Usage"
          description="Metered items with fine-grained sliders."
          code={PRICING_CALCULATOR_SOURCE}
        >
          <PricingCalculator
            title="Storage plan"
            items={storageItems}
            coupons={storageCoupons}
            presets={storagePresets}
            annualDiscountPercent={10}
          />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}