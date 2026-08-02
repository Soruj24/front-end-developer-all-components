import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const pricingCalculatorStorage: RegistryEntry = entry({
    id: "pricing-calculator-storage",
    title: "Usage-Based Pricing",
    description:
      "Metered storage, bandwidth, and API requests on a smaller annual incentive — the slider steps match how usage actually moves.",
    source: `import { PricingCalculator } from "@/components/ui";

const items = [
  { id: "storage", label: "Storage", unit: "GB", unitPrice: 0.5, min: 0, max: 1000, step: 10, defaultQuantity: 120 },
  { id: "bandwidth", label: "Bandwidth", unit: "GB", unitPrice: 0.08, min: 0, max: 5000, step: 100, defaultQuantity: 800 },
  { id: "requests", label: "API requests", unit: "M req", unitPrice: 2, min: 0, max: 200, step: 5, defaultQuantity: 10 },
];

const coupons = [{ code: "BETA25", percent: 25 }];

const presets = [
  { id: "hobby", label: "Hobby", description: "Side project", values: { storage: 50, bandwidth: 200, requests: 5 } },
  { id: "pro", label: "Pro", description: "Production", values: { storage: 250, bandwidth: 1500, requests: 25 } },
  { id: "team", label: "Team", description: "High traffic", values: { storage: 800, bandwidth: 4000, requests: 100 } },
];

export default function PricingCalculatorStorage() {
  return (
    <PricingCalculator
      title="Usage-based pricing"
      description="Metered line items with a smaller annual incentive and one coupon."
      items={items}
      coupons={coupons}
      presets={presets}
      annualDiscountPercent={10}
    />
  );
}`,
  });
