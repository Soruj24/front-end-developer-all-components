export const pricingCalculatorSource: string = `"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

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

function tierUnitPrice(item: PriceItem, qty: number): number {
  if (!item.tiers || item.tiers.length === 0) return item.unitPrice ?? 0;
  const sorted = [...item.tiers].sort((a, b) => a.upTo - b.upTo);
  let remaining = qty;
  let total = 0;
  let prev = 0;
  for (const tier of sorted) {
    const take = Math.min(remaining, tier.upTo - prev);
    if (take > 0) {
      total += take * tier.price;
      remaining -= take;
      prev = tier.upTo;
    }
    if (remaining <= 0) break;
  }
  if (remaining > 0) total += remaining * sorted[sorted.length - 1].price;
  return qty > 0 ? total / qty : 0;
}

function money(value: number, currency: Currency | null, locale: string): string {
  if (!currency) return String(Math.round(value * 100) / 100);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency.code,
    }).format(value);
  } catch {
    return currency.symbol + (Math.round(value * 100) / 100).toFixed(2);
  }
}

export function PricingCalculator({
  items,
  currencies = [{ code: "USD", symbol: "$", name: "US Dollar" }],
  defaultCurrency,
  defaultCycle = "monthly",
  annualDiscountPercent = 20,
  coupons = [],
  presets = [],
  locale = "en-US",
  className,
  showChart = true,
  showTierHints = true,
  showSavingsMeter = true,
  showCopy = true,
  ctaLabel,
  onCtaClick,
  title,
  description,
}: PricingCalculatorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(items.map((i) => [i.id, i.defaultQuantity ?? i.min ?? 1]))
  );
  const [cycle, setCycle] = useState<BillingCycle>(defaultCycle);
  const [currencyCode, setCurrencyCode] = useState(
    defaultCurrency ?? currencies[0]?.code ?? "USD"
  );
  const [couponInput, setCouponInput] = useState("");
  const [applied, setApplied] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const currency = useMemo(
    () => currencies.find((c) => c.code === currencyCode) ?? currencies[0] ?? null,
    [currencies, currencyCode]
  );

  const lines = useMemo(
    () =>
      items.map((item) => {
        const qty = quantities[item.id] ?? item.min ?? 1;
        const unit = tierUnitPrice(item, qty);
        return { id: item.id, label: item.label, qty, unit, amount: unit * qty };
      }),
    [items, quantities]
  );

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const cycleDiscount =
    cycle === "annual" ? (subtotal * annualDiscountPercent) / 100 : 0;
  const afterCycle = subtotal - cycleDiscount;
  const couponSavings = applied
    ? applied.percent != null
      ? (afterCycle * applied.percent) / 100
      : Math.min(afterCycle, applied.amount ?? 0)
    : 0;
  const total = Math.max(0, afterCycle - couponSavings);
  const maxLine = Math.max(1, ...lines.map((l) => l.amount));

  const applyCoupon = () => {
    const code = couponInput.trim().toLowerCase();
    if (!code) return;
    const match = coupons.find((c) => c.code.toLowerCase() === code);
    if (match) {
      setApplied(match);
      setCouponError(null);
    } else {
      setCouponError("”" + couponInput.trim() + "” is not a valid code.");
    }
  };

  const copyQuote = async () => {
    const text = lines
      .map((l) => l.label + " x" + l.qty + " = " + money(l.amount, currency, locale))
      .join("\\n") + "\\nTotal: " + money(total, currency, locale) + "/" + cycle;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  if (items.length === 0) {
    return (
      <div className={cn("rounded-2xl border border-border bg-background p-10 text-center text-sm text-muted-foreground", className)}>
        No pricing items configured.
      </div>
    );
  }

  return (
    <div className={cn("w-full rounded-2xl border border-border bg-background", className)}>
      {(title || description) && (
        <header className="border-b border-border px-5 py-4">
          {title && <h3 className="text-base font-semibold tracking-tight">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </header>
      )}
      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          {presets.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Quick start
              </span>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={activePreset === p.id}
                    onClick={() => {
                      setQuantities((prev) => ({ ...prev, ...p.values }));
                      setActivePreset(p.id);
                    }}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors",
                      activePreset === p.id
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {p.label}
                    {p.description && (
                      <span className="block text-[11px] font-normal opacity-80">{p.description}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          {items.map((item) => {
            const qty = quantities[item.id] ?? item.min ?? 1;
            const min = item.min ?? 1;
            const max = item.max ?? 100;
            const line = lines.find((l) => l.id === item.id);
            const fill = max > min ? Math.min(100, ((qty - min) / (max - min)) * 100) : 100;
            const nextTier = [...(item.tiers ?? [])]
              .sort((a, b) => a.upTo - b.upTo)
              .find((t) => qty < t.upTo);
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-lg font-semibold tabular-nums">
                    {qty}
                    {item.unit && (
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        {item.unit}{qty !== 1 ? "s" : ""}
                      </span>
                    )}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={item.step ?? 1}
                  value={qty}
                  aria-label={item.label + " quantity"}
                  onChange={(e) => {
                    setQuantities((prev) => ({ ...prev, [item.id]: Number(e.target.value) }));
                    setActivePreset(null);
                  }}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none"
                  style={{
                    background:
                      "linear-gradient(to right, var(--primary) " + fill + "%, var(--muted) " + fill + "%)",
                  }}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="tabular-nums">
                    {line ? money(line.unit, currency, locale) : ""}{item.unit ? " / " + item.unit : " / unit"}
                  </span>
                  <span className="tabular-nums">{line ? money(line.amount, currency, locale) : ""}/mo</span>
                </div>
                {showTierHints && nextTier && (
                  <p className="text-xs text-primary">
                    +{nextTier.upTo - qty} more {item.unit ?? "units"} unlock {money(nextTier.price, currency, locale)}/
                    {item.unit ?? "unit"}
                  </p>
                )}
              </div>
            );
          })}
          <div className="flex flex-col gap-4 border-t border-border pt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Billing cycle</span>
                <div role="radiogroup" aria-label="Billing cycle" className="grid grid-cols-2 rounded-full border border-border bg-muted/40 p-1">
                  {(["monthly", "annual"] as BillingCycle[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={cycle === c}
                      onClick={() => setCycle(c)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                        cycle === c ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c}
                      {c === "annual" && (
                        <span className="ml-1 text-xs font-semibold text-success">−{annualDiscountPercent}%</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Currency</span>
                <select
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  aria-label="Currency"
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.symbol} {c.name ?? c.code}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {coupons.length > 0 && (
              applied ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-success/30 bg-success-soft/60 px-3 py-2">
                  <span className="text-sm font-medium text-success">
                    {applied.code.toUpperCase()}{" "}
                    <span className="font-normal">
                      {applied.percent != null ? applied.percent + "% off" : money(applied.amount ?? 0, currency, locale) + " off"}
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label="Remove coupon"
                    onClick={() => setApplied(null)}
                    className="rounded-md p-1 text-success hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <label className="flex-1 text-sm font-medium">
                    Coupon
                    <input
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        if (couponError) setCouponError(null);
                      }}
                      placeholder="e.g. SAVE20"
                      className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none placeholder:text-muted-foreground focus:border-ring"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={!couponInput.trim()}
                    className="h-10 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
                  >
                    Apply
                  </button>
                </div>
              )
            )}
            {couponError && <p className="text-xs text-danger">{couponError}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/40 p-5">
          {showChart && (
            <div className="flex flex-col gap-2" aria-hidden={false}>
              {lines.map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <span className="w-24 truncate text-xs text-muted-foreground">{l.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-[width]"
                      style={{ width: (l.amount / maxLine) * 100 + "%" }}
                    />
                  </div>
                  <span className="w-20 text-right text-xs tabular-nums">{money(l.amount, currency, locale)}</span>
                </div>
              ))}
            </div>
          )}
          <dl className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{money(subtotal, currency, locale)}</dd>
            </div>
            {cycleDiscount > 0 && (
              <div className="flex justify-between text-success">
                <dt>Annual discount ({annualDiscountPercent}%)</dt>
                <dd className="tabular-nums">−{money(cycleDiscount, currency, locale)}</dd>
              </div>
            )}
            {couponSavings > 0 && (
              <div className="flex justify-between text-success">
                <dt>Coupon {applied ? "(" + applied.code.toUpperCase() + ")" : ""}</dt>
                <dd className="tabular-nums">−{money(couponSavings, currency, locale)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">
                {money(total, currency, locale)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/{cycle === "annual" ? "yr" : "mo"}</span>
              </dd>
            </div>
          </dl>
          {showSavingsMeter && subtotal > 0 && (
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-success"
                  style={{ width: Math.min(100, ((subtotal - total) / subtotal) * 100) + "%" }}
                />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                Save {money(subtotal - total, currency, locale)}
              </span>
            </div>
          )}
          <div className="flex gap-2">
            {showCopy && (
              <button
                type="button"
                onClick={() => void copyQuote()}
                className="h-10 flex-1 rounded-lg border border-border text-sm font-medium transition-colors hover:bg-muted"
              >
                {copied ? "Copied" : "Copy quote"}
              </button>
            )}
            {ctaLabel && (
              <button
                type="button"
                onClick={onCtaClick}
                className="h-10 flex-1 rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {ctaLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
