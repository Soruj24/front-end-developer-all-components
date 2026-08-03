import type { PricingTier, PriceItem, BillingCycle, Coupon, Currency, PriceBreakdown } from "./PricingCalculator.types";

export function round2(value: number): number { return Math.round(value * 100) / 100; }

export function priceForQuantity(tiers: PricingTier[], quantity: number): number {
  let total = 0; let remaining = Math.max(0, quantity); let previous = 0;
  for (const tier of tiers) { if (remaining <= 0) break; const count = Math.min(remaining, tier.upTo - previous); if (count > 0) total += count * tier.price; remaining -= count; previous = tier.upTo; }
  return total;
}

export function calculatePrice(input: { items: PriceItem[]; cycle: BillingCycle; annualDiscountPercent?: number; coupon?: Coupon | null }): PriceBreakdown {
  const { items, cycle, annualDiscountPercent = 0, coupon = null } = input;
  const lines = items.map((item) => { const quantity = item.quantity ?? 0; const amount = round2(item.tiers && item.tiers.length > 0 ? priceForQuantity(item.tiers, quantity) : (item.unitPrice ?? 0) * quantity); return { id: item.id, label: item.label, unit: item.unit, quantity, amount, unitPrice: quantity > 0 ? round2(amount / quantity) : 0 }; });
  const subtotal = round2(lines.reduce((sum, line) => sum + line.amount, 0));
  const periods = cycle === "annual" ? 12 : 1; const annualSubtotal = subtotal * periods;
  const cycleDiscountPercent = cycle === "annual" ? annualDiscountPercent : 0;
  const cycleDiscountAmount = round2((annualSubtotal * cycleDiscountPercent) / 100);
  const afterCycle = annualSubtotal - cycleDiscountAmount;
  let resolvedCoupon: PriceBreakdown["coupon"] = null;
  if (coupon) { const savings = coupon.percent != null ? (afterCycle * coupon.percent) / 100 : Math.min(coupon.amount ?? 0, afterCycle); resolvedCoupon = { code: coupon.code, percent: coupon.percent, amount: coupon.amount, savings: round2(savings) }; }
  const total = round2(afterCycle - (resolvedCoupon?.savings ?? 0)); const discountsTotal = round2(cycleDiscountAmount + (resolvedCoupon?.savings ?? 0));
  return { lines, subtotal, periods, cycleDiscountPercent, cycleDiscountAmount, coupon: resolvedCoupon, discountsTotal, total, monthlyTotal: round2(total / periods) };
}

export function formatPrice(value: number, currency?: Currency | null, locale = "en-US"): string {
  const code = currency?.code ?? "USD"; const fractionDigits = code === "JPY" ? 0 : 2;
  return new Intl.NumberFormat(locale, { style: "currency", currency: code, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(value);
}

export function buildQuote(breakdown: PriceBreakdown, currency?: Currency | null, options?: { locale?: string; title?: string }): string {
  const { locale = "en-US", title } = options ?? {}; const factor = breakdown.periods;
  const fmt = (value: number) => formatPrice(value, currency, locale); const out: string[] = [];
  if (title) out.push(title);
  out.push(breakdown.periods > 1 ? "QUOTE — BILLED ANNUALLY" : "QUOTE — PER MONTH");
  for (const line of breakdown.lines) out.push(`${line.label} (${line.quantity}${line.unit ? ` ${line.unit}${line.quantity !== 1 ? "s" : ""}` : ""})  ${fmt(line.amount * factor)}`);
  out.push(`Subtotal  ${fmt(breakdown.subtotal * factor)}`);
  if (breakdown.cycleDiscountAmount > 0) out.push(`Annual discount (${breakdown.cycleDiscountPercent}%)  -${fmt(breakdown.cycleDiscountAmount)}`);
  if (breakdown.coupon) out.push(`Coupon ${breakdown.coupon.code.toUpperCase()}  -${fmt(breakdown.coupon.savings)}`);
  out.push(`TOTAL (per ${factor > 1 ? "year" : "month"})  ${fmt(breakdown.total)}`);
  if (factor > 1) out.push(`~ ${fmt(breakdown.monthlyTotal)}/mo`);
  return out.join("\n");
}

export const DEFAULT_CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" }, { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" }, { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];
