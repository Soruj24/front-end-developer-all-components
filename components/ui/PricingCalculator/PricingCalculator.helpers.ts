import type { PricingTier } from "./PricingCalculator.types";

export interface TierContext {
  unitPrice: number;
  nextTier: { upTo: number; price: number } | null;
  gap: number;
}

export function getTierContext(tiers: PricingTier[], quantity: number): TierContext | null {
  if (!tiers || tiers.length === 0) return null;
  for (let i = 0; i < tiers.length; i++) { const tier = tiers[i]; if (quantity < tier.upTo) { const next = tiers[i + 1]; return { unitPrice: tier.price, nextTier: next ? { upTo: next.upTo, price: next.price } : null, gap: tier.upTo - quantity }; } }
  const last = tiers[tiers.length - 1]; return { unitPrice: last.price, nextTier: null, gap: 0 };
}

export function getChartColors(): string[] {
  return ["var(--primary)", "var(--success)", "var(--warning)", "var(--danger)", "color-mix(in oklab, var(--primary) 55%, var(--background))", "color-mix(in oklab, var(--success) 55%, var(--background))"];
}
