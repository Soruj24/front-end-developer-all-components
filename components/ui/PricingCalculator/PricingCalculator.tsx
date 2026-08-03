"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Input } from "../Input";
import Button from "../Button";
import type { PricingCalculatorProps, PriceItem, BillingCycle, Coupon, PricingPreset } from "./PricingCalculator.types";
import { calculatePrice, formatPrice, buildQuote } from "./PricingCalculator.utils";
import { getTierContext, getChartColors } from "./PricingCalculator.helpers";
import { DonutChart } from "./PricingCalculatorChart";
import { QuoteReceipt } from "./PricingCalculatorReceipt";
import { CheckIcon, CloseIcon } from "./PricingCalculator.icons";

export function PricingCalculator({ items, currencies = [{ code: "USD", symbol: "$", name: "US Dollar" }, { code: "EUR", symbol: "€", name: "Euro" }, { code: "GBP", symbol: "£", name: "British Pound" }, { code: "JPY", symbol: "¥", name: "Japanese Yen" }], defaultCurrency, defaultCycle = "monthly", annualDiscountPercent = 20, coupons = [], presets = [], locale = "en-US", className, showChart = true, showTierHints = true, showSavingsMeter = true, showCopy = true, ctaLabel, onCtaClick, title, description }: PricingCalculatorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => Object.fromEntries(items.map((item) => [item.id, item.defaultQuantity ?? item.min ?? 1])));
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [cycle, setCycle] = useState<BillingCycle>(defaultCycle);
  const [currencyCode, setCurrencyCode] = useState<string>(defaultCurrency ?? currencies[0]?.code ?? "USD");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);

  const currency = useMemo(() => currencies.find((c) => c.code === currencyCode) ?? currencies[0] ?? null, [currencies, currencyCode]);
  const pricedItems = useMemo<PriceItem[]>(() => items.map((item) => ({ ...item, quantity: quantities[item.id] ?? item.min ?? 1 })), [items, quantities]);
  const breakdown = useMemo(() => calculatePrice({ items: pricedItems, cycle, annualDiscountPercent, coupon: appliedCoupon }), [pricedItems, cycle, annualDiscountPercent, appliedCoupon]);
  const chartColors = useMemo(() => getChartColors(), []);
  const segments = useMemo(() => breakdown.lines.filter((line) => line.amount > 0).map((line, index) => ({ id: line.id, label: line.label, value: line.amount, color: chartColors[index % chartColors.length] })), [breakdown.lines, chartColors]);

  const [displayTotal, setDisplayTotal] = useState(breakdown.total);
  const animatedValueRef = useRef(breakdown.total);
  useEffect(() => {
    const to = breakdown.total; const from = animatedValueRef.current; if (from === to) return;
    let rafId = 0; const reduced = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 400; const start = performance.now();
    const tick = (now: number) => { const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration); const eased = 1 - Math.pow(1 - t, 3); const value = from + (to - from) * eased; animatedValueRef.current = value; setDisplayTotal(value); if (t < 1) rafId = requestAnimationFrame(tick); };
    rafId = requestAnimationFrame(tick); return () => cancelAnimationFrame(rafId);
  }, [breakdown.total]);

  const updateQuantity = (id: string, value: number) => { setQuantities((prev) => ({ ...prev, [id]: value })); setActivePresetId(null); };
  const applyPreset = (preset: PricingPreset) => { setQuantities((prev) => ({ ...prev, ...preset.values })); setActivePresetId(preset.id); };
  const applyCoupon = () => { const code = couponInput.trim().toLowerCase(); if (!code) return; const match = coupons.find((c) => c.code.toLowerCase() === code); if (match) { setAppliedCoupon(match); setCouponError(null); } else setCouponError(`"${couponInput.trim()}" isn't a valid code.`); };
  const handleCopyQuote = useCallback(() => { const text = buildQuote(breakdown, currency, { locale, title }); if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current); copiedTimerRef.current = window.setTimeout(() => setCopied(false), 1600); }, [breakdown, currency, locale, title]);

  return (
    <div className={cn("w-full rounded-2xl border border-border bg-background", className)}>
      {(title || description) && <header className="border-b border-border px-5 py-4 sm:px-6">{title && <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>}{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</header>}
      <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-6">
          {presets.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Quick start</span>
              <div className="grid grid-cols-3 gap-2">
                {presets.map((preset) => <button key={preset.id} type="button" onClick={() => applyPreset(preset)} aria-pressed={activePresetId === preset.id} className={cn("flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors", activePresetId === preset.id ? "border-primary/40 bg-primary-soft text-primary" : "border-border bg-surface text-muted-foreground hover:text-foreground")}><span className="text-sm font-medium">{preset.label}</span>{preset.description && <span className="text-[11px] leading-tight opacity-80">{preset.description}</span>}</button>)}
              </div>
            </div>
          )}
          {items.map((item) => {
            const quantity = quantities[item.id] ?? item.min ?? 1; const min = item.min ?? 1; const max = item.max ?? 100;
            const line = breakdown.lines.find((l) => l.id === item.id); const tierContext = getTierContext(item.tiers ?? [], quantity);
            const fillPct = max > min ? Math.min(100, ((quantity - min) / (max - min)) * 100) : 100;
            return (
              <div key={item.id} className="flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between gap-3"><span className="text-sm font-medium text-foreground">{item.label}</span><span className="text-lg font-semibold tabular-nums text-foreground">{quantity}{item.unit && <span className="ml-1 text-xs font-normal text-muted-foreground">{item.unit}{quantity !== 1 ? "s" : ""}</span>}</span></div>
                <input type="range" min={min} max={max} step={item.step ?? 1} value={quantity} onChange={(e) => updateQuantity(item.id, Number(e.target.value))} aria-label={`${item.label} quantity`}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  style={{ background: `linear-gradient(to right, var(--primary) ${fillPct}%, var(--muted) ${fillPct}%)` }} />
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  {line && <span className="tabular-nums">{formatPrice(line.unitPrice, currency, locale)}{item.unit ? ` / ${item.unit}` : " / unit"}</span>}
                  {line && <span className="tabular-nums">{formatPrice(line.amount, currency, locale)}/mo</span>}
                </div>
                {showTierHints && tierContext && (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    {tierContext.nextTier ? <span className="text-primary">+{tierContext.gap} more {item.unit ?? "unit"}{tierContext.gap !== 1 ? "s" : ""} → {formatPrice(tierContext.nextTier.price, currency, locale)}/{item.unit ?? "unit"}</span> : <span className="text-success">Best volume rate unlocked</span>}
                    <span className="text-subtle">now {formatPrice(tierContext.unitPrice, currency, locale)}/{item.unit ?? "unit"}</span>
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex flex-col gap-4 border-t border-border pt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">Billing cycle</span>
                <div role="radiogroup" aria-label="Billing cycle" className="grid grid-cols-2 rounded-full border border-border bg-muted/40 p-1">
                  <button type="button" role="radio" aria-checked={cycle === "monthly"} onClick={() => setCycle("monthly")} className={cn("rounded-full px-3 py-1.5 text-sm font-medium transition-colors", cycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Monthly</button>
                  <button type="button" role="radio" aria-checked={cycle === "annual"} onClick={() => setCycle("annual")} className={cn("flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors", cycle === "annual" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>Annual<span className="text-xs font-semibold text-success">−{annualDiscountPercent}%</span></button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">Currency</span>
                <select value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)} aria-label="Currency" className="flex h-10 w-full cursor-pointer rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring">
                  {currencies.map((c) => <option key={c.code} value={c.code}>{c.symbol} {c.name ?? c.code}</option>)}
                </select>
              </div>
            </div>
            {coupons.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-success/30 bg-success-soft/60 px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-success"><CheckIcon className="h-4 w-4" />{appliedCoupon.code.toUpperCase()}<span className="font-normal">{appliedCoupon.percent != null ? `${appliedCoupon.percent}% off` : `${formatPrice(appliedCoupon.amount ?? 0, currency, locale)} off`}</span></span>
                    <button type="button" onClick={() => setAppliedCoupon(null)} aria-label="Remove coupon" className="rounded-md p-1 text-success transition-colors hover:text-foreground"><CloseIcon className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <div className="flex items-end gap-2">
                    <div className="flex-1"><Input value={couponInput} onChange={(e) => { setCouponInput(e.target.value); if (couponError) setCouponError(null); }} placeholder="e.g. SAVE20" label="Coupon" error={couponError ?? undefined} /></div>
                    <Button type="button" variant="outline" onClick={applyCoupon} disabled={!couponInput.trim()}>Apply</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface/60 p-5">
          {showChart && segments.length > 0 && <DonutChart segments={segments} currency={currency} locale={locale} />}
          <QuoteReceipt breakdown={breakdown} currency={currency} locale={locale} animatedTotal={displayTotal} showSavingsMeter={showSavingsMeter} showCopy={showCopy} copied={copied} onCopy={handleCopyQuote} />
          {ctaLabel && <Button type="button" className="w-full" onClick={onCtaClick}>{ctaLabel}</Button>}
        </div>
      </div>
    </div>
  );
}
