"use client";

import { ComponentPreview } from "@/components/preview";
import { PricingCalculator } from "@/components/ui";
import {
  HeadlessPricingDemo,
  saasItems,
  saasCoupons,
  saasPresets,
  storageItems,
  storageCoupons,
  storagePresets,
} from "@/components/pricing-calculator/demo";

export default function PricingCalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Pricing Calculator
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A reusable quote builder for product pages. Define line items, volume
          tiers, billing cycles, currencies, and coupon codes — the calculator
          handles the math and renders a live donut chart with an itemized
          breakdown. The same price engine is exported as pure functions, so you
          can drive quotes from your own UI or your backend.
        </p>
      </header>

      <ComponentPreview id="pricing-calculator-saas">
        <PricingCalculator
          title="SaaS billing"
          description="Slide team seats to watch volume pricing, annual billing, and coupons apply live."
          items={saasItems}
          coupons={saasCoupons}
          presets={saasPresets}
        />
      </ComponentPreview>

      <ComponentPreview id="pricing-calculator-storage">
        <PricingCalculator
          title="Usage-based pricing"
          description="Metered line items with a smaller annual incentive and one coupon."
          items={storageItems}
          coupons={storageCoupons}
          presets={storagePresets}
          annualDiscountPercent={10}
        />
      </ComponentPreview>

      <ComponentPreview id="pricing-calculator-headless">
        <HeadlessPricingDemo />
      </ComponentPreview>
    </div>
  );
}
