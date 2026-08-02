"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Input } from "./Input";
import Button from "./Button";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type BillingCycle = "monthly" | "annual";

/** A volume-pricing tier. `upTo` is the exclusive upper quantity bound. */
export interface PricingTier {
  upTo: number;
  price: number;
}

/** One priced line item, optionally with volume (tiered) pricing. */
export interface PriceItem {
  id: string;
  label: string;
  /** Short unit label, e.g. "seat" or "GB". */
  unit?: string;
  /** Flat price per unit; ignored when `tiers` is provided. */
  unitPrice?: number;
  /** Automatic per-item volume discount as quantity grows. */
  tiers?: PricingTier[];
  /** Required by `calculatePrice`; injected automatically by the UI component. */
  quantity?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultQuantity?: number;
}

/** A redeemable coupon — either a percentage or a fixed amount off. */
export interface Coupon {
  code: string;
  /** Percentage off the pre-coupon amount (0–100). */
  percent?: number;
  /** Fixed amount off (in the selected currency). */
  amount?: number;
}

export interface Currency {
  code: string;
  symbol: string;
  name?: string;
}

/** A one-tap configuration that jumps every slider to a saved quantity set. */
export interface PricingPreset {
  id: string;
  label: string;
  description?: string;
  values: Record<string, number>;
}

/** One computed line in the price breakdown. */
export interface BreakdownLine {
  id: string;
  label: string;
  unit?: string;
  quantity: number;
  /** Monthly-equivalent amount for this line. */
  amount: number;
  /** Effective unit price (average when tiered). */
  unitPrice: number;
}

export interface PriceBreakdown {
  lines: BreakdownLine[];
  /** Sum of monthly line amounts. */
  subtotal: number;
  /** 12 for annual billing, 1 for monthly. */
  periods: number;
  cycleDiscountPercent: number;
  cycleDiscountAmount: number;
  coupon: { code: string; percent?: number; amount?: number; savings: number } | null;
  /** Total saved across all discounts (cycle + coupon). */
  discountsTotal: number;
  /** Final amount in the billing period's terms. */
  total: number;
  /** `total` expressed as a monthly equivalent. */
  monthlyTotal: number;
}

export interface PricingCalculatorProps {
  /** Line items rendered as quantity sliders. */
  items: PriceItem[];
  currencies?: Currency[];
  defaultCurrency?: string;
  defaultCycle?: BillingCycle;
  /** Discount applied when the annual cycle is selected. Default 20. */
  annualDiscountPercent?: number;
  /** Valid coupon codes accepted by the coupon field. */
  coupons?: Coupon[];
  /** One-tap configurations that set every slider at once. */
  presets?: PricingPreset[];
  /** Locale passed to the price formatter. Default "en-US". */
  locale?: string;
  className?: string;
  /** Toggles the breakdown donut chart. Default `true`. */
  showChart?: boolean;
  /** Toggles the tier-guidance hints under each slider. Default `true`. */
  showTierHints?: boolean;
  /** Toggles the savings meter in the quote. Default `true`. */
  showSavingsMeter?: boolean;
  /** Toggles the "copy quote" action. Default `true`. */
  showCopy?: boolean;
  /** Optional full-width call-to-action under the total. */
  ctaLabel?: string;
  onCtaClick?: () => void;
  title?: string;
  description?: string;
}

/* ------------------------------------------------------------------ */
/* Pure pricing API — usable without the UI component                   */
/* ------------------------------------------------------------------ */

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Compute the cost of `quantity` units across volume `tiers`. */
export function priceForQuantity(tiers: PricingTier[], quantity: number): number {
  let total = 0;
  let remaining = Math.max(0, quantity);
  let previous = 0;
  for (const tier of tiers) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, tier.upTo - previous);
    if (count > 0) total += count * tier.price;
    remaining -= count;
    previous = tier.upTo;
  }
  return total;
}

/** Calculate the full price breakdown for a set of items, cycle, and coupon. */
export function calculatePrice(input: {
  items: PriceItem[];
  cycle: BillingCycle;
  annualDiscountPercent?: number;
  coupon?: Coupon | null;
}): PriceBreakdown {
  const { items, cycle, annualDiscountPercent = 0, coupon = null } = input;

  const lines: BreakdownLine[] = items.map((item) => {
    const quantity = item.quantity ?? 0;
    const amount = round2(
      item.tiers && item.tiers.length > 0
        ? priceForQuantity(item.tiers, quantity)
        : (item.unitPrice ?? 0) * quantity
    );
    return {
      id: item.id,
      label: item.label,
      unit: item.unit,
      quantity,
      amount,
      unitPrice: quantity > 0 ? round2(amount / quantity) : 0,
    };
  });

  const subtotal = round2(lines.reduce((sum, line) => sum + line.amount, 0));
  const periods = cycle === "annual" ? 12 : 1;
  const annualSubtotal = subtotal * periods;
  const cycleDiscountPercent = cycle === "annual" ? annualDiscountPercent : 0;
  const cycleDiscountAmount = round2((annualSubtotal * cycleDiscountPercent) / 100);
  const afterCycle = annualSubtotal - cycleDiscountAmount;

  let resolvedCoupon: PriceBreakdown["coupon"] = null;
  if (coupon) {
    const savings =
      coupon.percent != null
        ? (afterCycle * coupon.percent) / 100
        : Math.min(coupon.amount ?? 0, afterCycle);
    resolvedCoupon = {
      code: coupon.code,
      percent: coupon.percent,
      amount: coupon.amount,
      savings: round2(savings),
    };
  }

  const total = round2(afterCycle - (resolvedCoupon?.savings ?? 0));
  const discountsTotal = round2(cycleDiscountAmount + (resolvedCoupon?.savings ?? 0));

  return {
    lines,
    subtotal,
    periods,
    cycleDiscountPercent,
    cycleDiscountAmount,
    coupon: resolvedCoupon,
    discountsTotal,
    total,
    monthlyTotal: round2(total / periods),
  };
}

/** Format a number as a price for the given currency and locale. */
export function formatPrice(
  value: number,
  currency?: Currency | null,
  locale = "en-US"
): string {
  const code = currency?.code ?? "USD";
  const fractionDigits = code === "JPY" ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** Build a portable plain-text quote from a breakdown (clipboard, email, CRM). */
export function buildQuote(
  breakdown: PriceBreakdown,
  currency?: Currency | null,
  options?: { locale?: string; title?: string }
): string {
  const { locale = "en-US", title } = options ?? {};
  const factor = breakdown.periods;
  const fmt = (value: number) => formatPrice(value, currency, locale);
  const out: string[] = [];
  if (title) out.push(title);
  out.push(breakdown.periods > 1 ? "QUOTE — BILLED ANNUALLY" : "QUOTE — PER MONTH");
  for (const line of breakdown.lines) {
    out.push(
      `${line.label} (${line.quantity}${line.unit ? ` ${line.unit}${line.quantity !== 1 ? "s" : ""}` : ""})  ${fmt(line.amount * factor)}`
    );
  }
  out.push(`Subtotal  ${fmt(breakdown.subtotal * factor)}`);
  if (breakdown.cycleDiscountAmount > 0) {
    out.push(`Annual discount (${breakdown.cycleDiscountPercent}%)  -${fmt(breakdown.cycleDiscountAmount)}`);
  }
  if (breakdown.coupon) {
    out.push(`Coupon ${breakdown.coupon.code.toUpperCase()}  -${fmt(breakdown.coupon.savings)}`);
  }
  out.push(`TOTAL (per ${factor > 1 ? "year" : "month"})  ${fmt(breakdown.total)}`);
  if (factor > 1) out.push(`~ ${fmt(breakdown.monthlyTotal)}/mo`);
  return out.join("\n");
}

export const DEFAULT_CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

interface TierContext {
  unitPrice: number;
  nextTier: { upTo: number; price: number } | null;
  gap: number;
}

function getTierContext(tiers: PricingTier[], quantity: number): TierContext | null {
  if (!tiers || tiers.length === 0) return null;
  for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];
    if (quantity < tier.upTo) {
      const next = tiers[i + 1];
      return {
        unitPrice: tier.price,
        nextTier: next ? { upTo: next.upTo, price: next.price } : null,
        gap: tier.upTo - quantity,
      };
    }
  }
  const last = tiers[tiers.length - 1];
  return { unitPrice: last.price, nextTier: null, gap: 0 };
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25l-2.25 2.25m5.25 0l-5.25-5.25M5.25 15.75l-2.25-2.25m0 0l2.25-2.25M3 20.25h7.5" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h6m-6-4h6M4.5 21V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25V21l-2.625-1.5-2.625 1.5-2.625-1.5L9.75 21 7.125 19.5 4.5 21z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Donut chart                                                         */
/* ------------------------------------------------------------------ */

const CHART_COLORS = [
  "var(--primary)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
  "color-mix(in oklab, var(--primary) 55%, var(--background))",
  "color-mix(in oklab, var(--success) 55%, var(--background))",
];

interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
}

const DonutChart = memo(function DonutChart({
  segments,
  currency,
  locale,
}: {
  segments: DonutSegment[];
  currency: Currency | null;
  locale: string;
}) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  const size = 148;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative h-[148px] w-[148px] shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Monthly cost split by line item"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={strokeWidth}
          />
          {total > 0 &&
            segments.map((seg) => {
              const fraction = seg.value / total;
              const dash = fraction * circumference;
              const segment = (
                <circle
                  key={seg.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  style={{ stroke: seg.color }}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
              offset += dash;
              return segment;
            })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {formatPrice(total, currency, locale)}
          </span>
          <span className="text-[11px] text-muted-foreground">/ month</span>
        </div>
      </div>

      <ul className="flex w-full flex-col gap-2 sm:w-auto">
        {segments.map((seg) => (
          <li key={seg.id} className="flex items-center justify-between gap-4 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
              {seg.label}
            </span>
            <span className="tabular-nums text-foreground">
              {formatPrice(seg.value, currency, locale)}
              <span className="ml-1 text-xs text-muted-foreground">
                {Math.round((seg.value / total) * 100)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Quote receipt                                                       */
/* ------------------------------------------------------------------ */

function ReceiptRow({
  label,
  note,
  value,
  tone = "default",
}: {
  label: React.ReactNode;
  note?: string;
  value: string;
  tone?: "default" | "muted" | "discount";
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-2 text-sm",
        tone === "muted" && "text-muted-foreground",
        tone === "discount" && "text-success"
      )}
    >
      <span className="shrink-0">
        {label}
        {note && <span className="ml-1 text-xs text-subtle">{note}</span>}
      </span>
      <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-border" />
      <span className={cn("tabular-nums", tone === "default" && "text-foreground")}>{value}</span>
    </div>
  );
}

const QuoteReceipt = memo(function QuoteReceipt({
  breakdown,
  currency,
  locale,
  animatedTotal,
  showSavingsMeter,
  showCopy,
  copied,
  onCopy,
}: {
  breakdown: PriceBreakdown;
  currency: Currency | null;
  locale: string;
  animatedTotal: number;
  showSavingsMeter: boolean;
  showCopy: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  const factor = breakdown.periods;
  const subtotal = round2(breakdown.subtotal * factor);
  const listPrice = round2(breakdown.total + breakdown.discountsTotal);
  const savingsPct = listPrice > 0 ? Math.round((breakdown.discountsTotal / listPrice) * 100) : 0;
  const monthsFree =
    listPrice > 0 ? Math.round((breakdown.discountsTotal / (listPrice / factor)) * 10) / 10 : 0;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <ReceiptIcon className="h-3.5 w-3.5" />
          Your quote
        </span>
        <span className="text-xs text-subtle">
          {factor > 1 ? "billed annually" : "per month"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {breakdown.lines.map((line) => (
          <ReceiptRow
            key={line.id}
            label={line.label}
            note={`× ${line.quantity}${line.unit ? ` ${line.unit}${line.quantity !== 1 ? "s" : ""}` : ""}`}
            value={formatPrice(line.amount * factor, currency, locale)}
          />
        ))}

        <ReceiptRow
          label="Subtotal"
          tone="muted"
          value={formatPrice(subtotal, currency, locale)}
        />

        {breakdown.cycleDiscountAmount > 0 && (
          <ReceiptRow
            label={
              <span className="inline-flex items-center gap-1.5">
                <ArrowDownIcon className="h-3.5 w-3.5" />
                Annual discount ({breakdown.cycleDiscountPercent}%)
              </span>
            }
            tone="discount"
            value={`−${formatPrice(breakdown.cycleDiscountAmount, currency, locale)}`}
          />
        )}

        {breakdown.coupon && (
          <ReceiptRow
            label={
              <span className="inline-flex items-center gap-1.5">
                <TagIcon className="h-3.5 w-3.5" />
                Coupon {breakdown.coupon.code.toUpperCase()}
                {breakdown.coupon.percent != null ? ` (${breakdown.coupon.percent}%)` : ""}
              </span>
            }
            tone="discount"
            value={`−${formatPrice(breakdown.coupon.savings, currency, locale)}`}
          />
        )}
      </div>

      {showSavingsMeter && breakdown.discountsTotal > 0 && (
        <div className="mt-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Savings</span>
            <span className="font-medium text-success">
              {formatPrice(breakdown.discountsTotal, currency, locale)}
              <span className="ml-1 text-subtle">({savingsPct}%)</span>
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-success transition-[width] duration-500 ease-out"
              style={{ width: `${savingsPct}%` }}
            />
          </div>
          {factor > 1 && (
            <p className="text-[11px] text-subtle">
              That&apos;s like getting {monthsFree} months of list price free.
            </p>
          )}
        </div>
      )}

      <div className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Total · {factor > 1 ? "per year" : "per month"}
            </span>
            {factor > 1 && (
              <span className="text-[11px] text-subtle">
                ≈ {formatPrice(breakdown.monthlyTotal, currency, locale)}/mo
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            {listPrice > breakdown.total && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(listPrice, currency, locale)}
              </span>
            )}
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
              {formatPrice(animatedTotal, currency, locale)}
            </span>
          </div>
        </div>

        {showCopy && (
          <button
            type="button"
            onClick={onCopy}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              copied
                ? "border-success/30 bg-success-soft/60 text-success"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            )}
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            {copied ? "Quote copied" : "Copy quote"}
          </button>
        )}
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function PricingCalculator({
  items,
  currencies = DEFAULT_CURRENCIES,
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
    Object.fromEntries(items.map((item) => [item.id, item.defaultQuantity ?? item.min ?? 1]))
  );
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [cycle, setCycle] = useState<BillingCycle>(defaultCycle);
  const [currencyCode, setCurrencyCode] = useState<string>(
    defaultCurrency ?? currencies[0]?.code ?? "USD"
  );
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);

  const currency = useMemo(
    () => currencies.find((c) => c.code === currencyCode) ?? currencies[0] ?? null,
    [currencies, currencyCode]
  );

  const pricedItems = useMemo<PriceItem[]>(
    () =>
      items.map((item) => ({
        ...item,
        quantity: quantities[item.id] ?? item.min ?? 1,
      })),
    [items, quantities]
  );

  const breakdown = useMemo(
    () => calculatePrice({ items: pricedItems, cycle, annualDiscountPercent, coupon: appliedCoupon }),
    [pricedItems, cycle, annualDiscountPercent, appliedCoupon]
  );

  const segments = useMemo(
    () =>
      breakdown.lines
        .filter((line) => line.amount > 0)
        .map((line, index) => ({
          id: line.id,
          label: line.label,
          value: line.amount,
          color: CHART_COLORS[index % CHART_COLORS.length],
        })),
    [breakdown.lines]
  );

  const [displayTotal, setDisplayTotal] = useState(breakdown.total);
  const animatedValueRef = useRef(breakdown.total);

  useEffect(() => {
    const to = breakdown.total;
    const from = animatedValueRef.current;
    if (from === to) return;
    let rafId = 0;
    const reduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (to - from) * eased;
      animatedValueRef.current = value;
      setDisplayTotal(value);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [breakdown.total]);

  const updateQuantity = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
    setActivePresetId(null);
  };

  const applyPreset = (preset: PricingPreset) => {
    setQuantities((prev) => ({ ...prev, ...preset.values }));
    setActivePresetId(preset.id);
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toLowerCase();
    if (!code) return;
    const match = coupons.find((c) => c.code.toLowerCase() === code);
    if (match) {
      setAppliedCoupon(match);
      setCouponError(null);
    } else {
      setCouponError(`"${couponInput.trim()}" isn't a valid code.`);
    }
  };

  const handleCopyQuote = useCallback(() => {
    const text = buildQuote(breakdown, currency, { locale, title });
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = window.setTimeout(() => setCopied(false), 1600);
  }, [breakdown, currency, locale, title]);

  return (
    <div className={cn("w-full rounded-2xl border border-border bg-background", className)}>
      {(title || description) && (
        <header className="border-b border-border px-5 py-4 sm:px-6">
          {title && (
            <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
          )}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </header>
      )}

      <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-8">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          {presets.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Quick start
              </span>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    aria-pressed={activePresetId === preset.id}
                    className={cn(
                      "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors",
                      activePresetId === preset.id
                        ? "border-primary/40 bg-primary-soft text-primary"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="text-sm font-medium">{preset.label}</span>
                    {preset.description && (
                      <span className="text-[11px] leading-tight opacity-80">
                        {preset.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {items.map((item) => {
            const quantity = quantities[item.id] ?? item.min ?? 1;
            const min = item.min ?? 1;
            const max = item.max ?? 100;
            const line = breakdown.lines.find((l) => l.id === item.id);
            const tierContext = getTierContext(item.tiers ?? [], quantity);
            const fillPct = max > min ? Math.min(100, ((quantity - min) / (max - min)) * 100) : 100;

            return (
              <div key={item.id} className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-lg font-semibold tabular-nums text-foreground">
                    {quantity}
                    {item.unit && (
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        {item.unit}
                        {quantity !== 1 ? "s" : ""}
                      </span>
                    )}
                  </span>
                </div>

                <input
                  type="range"
                  min={min}
                  max={max}
                  step={item.step ?? 1}
                  value={quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  aria-label={`${item.label} quantity`}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  style={{
                    background: `linear-gradient(to right, var(--primary) ${fillPct}%, var(--muted) ${fillPct}%)`,
                  }}
                />

                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  {line && (
                    <span className="tabular-nums">
                      {formatPrice(line.unitPrice, currency, locale)}
                      {item.unit ? ` / ${item.unit}` : " / unit"}
                    </span>
                  )}
                  {line && (
                    <span className="tabular-nums">
                      {formatPrice(line.amount, currency, locale)}/mo
                    </span>
                  )}
                </div>

                {showTierHints && tierContext && (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    {tierContext.nextTier ? (
                      <span className="text-primary">
                        +{tierContext.gap} more {item.unit ?? "unit"}
                        {tierContext.gap !== 1 ? "s" : ""} → {formatPrice(tierContext.nextTier.price, currency, locale)}/
                        {item.unit ?? "unit"}
                      </span>
                    ) : (
                      <span className="text-success">Best volume rate unlocked</span>
                    )}
                    <span className="text-subtle">
                      now {formatPrice(tierContext.unitPrice, currency, locale)}/
                      {item.unit ?? "unit"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-col gap-4 border-t border-border pt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">Billing cycle</span>
                <div
                  role="radiogroup"
                  aria-label="Billing cycle"
                  className="grid grid-cols-2 rounded-full border border-border bg-muted/40 p-1"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={cycle === "monthly"}
                    onClick={() => setCycle("monthly")}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      cycle === "monthly"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={cycle === "annual"}
                    onClick={() => setCycle("annual")}
                    className={cn(
                      "flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      cycle === "annual"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Annual
                    <span className="text-xs font-semibold text-success">
                      −{annualDiscountPercent}%
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">Currency</span>
                <select
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  aria-label="Currency"
                  className="flex h-10 w-full cursor-pointer rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.symbol} {c.name ?? c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {coupons.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-success/30 bg-success-soft/60 px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                      <CheckIcon className="h-4 w-4" />
                      {appliedCoupon.code.toUpperCase()}
                      <span className="font-normal">
                        {appliedCoupon.percent != null
                          ? `${appliedCoupon.percent}% off`
                          : `${formatPrice(appliedCoupon.amount ?? 0, currency, locale)} off`}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      aria-label="Remove coupon"
                      className="rounded-md p-1 text-success transition-colors hover:text-foreground"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          if (couponError) setCouponError(null);
                        }}
                        placeholder="e.g. SAVE20"
                        label="Coupon"
                        error={couponError ?? undefined}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={applyCoupon}
                      disabled={!couponInput.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quote */}
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface/60 p-5">
          {showChart && segments.length > 0 && (
            <DonutChart segments={segments} currency={currency} locale={locale} />
          )}

          <QuoteReceipt
            breakdown={breakdown}
            currency={currency}
            locale={locale}
            animatedTotal={displayTotal}
            showSavingsMeter={showSavingsMeter}
            showCopy={showCopy}
            copied={copied}
            onCopy={handleCopyQuote}
          />

          {ctaLabel && (
            <Button type="button" className="w-full" onClick={onCtaClick}>
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
