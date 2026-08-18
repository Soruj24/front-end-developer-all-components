"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
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

const installCommand = `npx component-library@latest add pricing-calculator`;

const usageCode = `import { PricingCalculator } from "@/components/ui";

<PricingCalculator
  title="SaaS billing"
  items={saasItems}
  coupons={saasCoupons}
  presets={saasPresets}
/>`;

export default function PricingCalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Pricing Calculator
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A reusable quote builder for product pages. Define line items, volume
          tiers, billing cycles, currencies, and coupon codes — the calculator
          handles the math and renders a live donut chart with an itemized
          breakdown. The same price engine is exported as pure functions, so you
          can drive quotes from your own UI or your backend.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">SaaS Billing</h3>
            <p className="text-sm text-muted-foreground">Slide team seats to watch volume pricing, annual billing, and coupons apply live.</p>
          </div>
          <ComponentPreview id="pricing-calculator-saas">
            <PricingCalculator
              title="SaaS billing"
              description="Slide team seats to watch volume pricing, annual billing, and coupons apply live."
              items={saasItems}
              coupons={saasCoupons}
              presets={saasPresets}
            />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Usage-Based Pricing</h3>
            <p className="text-sm text-muted-foreground">Metered line items with a smaller annual incentive and one coupon.</p>
          </div>
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
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Headless Mode</h3>
            <p className="text-sm text-muted-foreground">Use the price engine as pure functions with your own UI.</p>
          </div>
          <ComponentPreview id="pricing-calculator-headless">
            <HeadlessPricingDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">PricingItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">coupons</td>
                <td className="px-4 py-3 text-muted-foreground">Coupon[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">presets</td>
                <td className="px-4 py-3 text-muted-foreground">Preset[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">annualDiscountPercent</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
