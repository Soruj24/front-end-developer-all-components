export type BillingCycle = "monthly" | "annual";

export interface PricingTier {
  upTo: number;
  price: number;
}

export interface PriceItem {
  id: string;
  label: string;
  unit?: string;
  unitPrice?: number;
  tiers?: PricingTier[];
  quantity?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultQuantity?: number;
}

export interface Coupon {
  code: string;
  percent?: number;
  amount?: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name?: string;
}

export interface PricingPreset {
  id: string;
  label: string;
  description?: string;
  values: Record<string, number>;
}

export interface BreakdownLine {
  id: string;
  label: string;
  unit?: string;
  quantity: number;
  amount: number;
  unitPrice: number;
}

export interface PriceBreakdown {
  lines: BreakdownLine[];
  subtotal: number;
  periods: number;
  cycleDiscountPercent: number;
  cycleDiscountAmount: number;
  coupon: { code: string; percent?: number; amount?: number; savings: number } | null;
  discountsTotal: number;
  total: number;
  monthlyTotal: number;
}

export interface PricingCalculatorProps {
  items: PriceItem[];
  currencies?: Currency[];
  defaultCurrency?: string;
  defaultCycle?: BillingCycle;
  annualDiscountPercent?: number;
  coupons?: Coupon[];
  presets?: PricingPreset[];
  locale?: string;
  className?: string;
  showChart?: boolean;
  showTierHints?: boolean;
  showSavingsMeter?: boolean;
  showCopy?: boolean;
  ctaLabel?: string;
  onCtaClick?: () => void;
  title?: string;
  description?: string;
}
