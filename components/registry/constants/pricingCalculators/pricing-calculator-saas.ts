import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const pricingCalculatorSaas: RegistryEntry = entry({
    id: "pricing-calculator-saas",
    title: "SaaS Billing",
    description:
      "Tiered team seats and flat-rate support sliders with automatic volume pricing, a monthly/annual billing toggle, currency switch, and working coupon codes.",
    source: `import { PricingCalculator } from "@/components/ui";

const items = [
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

const coupons = [
  { code: "LAUNCH20", percent: 20 },
  { code: "TEAM50", amount: 50 },
];

const presets = [
  { id: "starter", label: "Starter", description: "Small team", values: { seats: 8, support: 0 } },
  { id: "growth", label: "Growth", description: "Recommended", values: { seats: 30, support: 30 } },
  { id: "scale", label: "Scale", description: "Volume tier", values: { seats: 120, support: 120 } },
];

export default function PricingCalculatorSaaS() {
  return (
    <PricingCalculator
      title="SaaS billing"
      description="Slide team seats to watch volume pricing, annual billing, and coupons apply live."
      items={items}
      coupons={coupons}
      presets={presets}
    />
  );
}`,
  });
