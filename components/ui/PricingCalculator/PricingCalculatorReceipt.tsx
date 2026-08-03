import { memo } from "react";
import { cn } from "@/lib/cn";
import type { Currency, PriceBreakdown } from "./PricingCalculator.types";
import { formatPrice, round2 } from "./PricingCalculator.utils";
import { CheckIcon, ArrowDownIcon, TagIcon, CopyIcon, ReceiptIcon } from "./PricingCalculator.icons";

function ReceiptRow({ label, note, value, tone = "default" }: { label: React.ReactNode; note?: string; value: string; tone?: "default" | "muted" | "discount" }) {
  return (
    <div className={cn("flex items-baseline gap-2 text-sm", tone === "muted" && "text-muted-foreground", tone === "discount" && "text-success")}>
      <span className="shrink-0">{label}{note && <span className="ml-1 text-xs text-subtle">{note}</span>}</span>
      <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-border" />
      <span className={cn("tabular-nums", tone === "default" && "text-foreground")}>{value}</span>
    </div>
  );
}

export const QuoteReceipt = memo(function QuoteReceipt({ breakdown, currency, locale, animatedTotal, showSavingsMeter, showCopy, copied, onCopy }: {
  breakdown: PriceBreakdown; currency: Currency | null; locale: string; animatedTotal: number;
  showSavingsMeter: boolean; showCopy: boolean; copied: boolean; onCopy: () => void;
}) {
  const factor = breakdown.periods; const subtotal = round2(breakdown.subtotal * factor);
  const listPrice = round2(breakdown.total + breakdown.discountsTotal);
  const savingsPct = listPrice > 0 ? Math.round((breakdown.discountsTotal / listPrice) * 100) : 0;
  const monthsFree = listPrice > 0 ? Math.round((breakdown.discountsTotal / (listPrice / factor)) * 10) / 10 : 0;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"><ReceiptIcon className="h-3.5 w-3.5" />Your quote</span>
        <span className="text-xs text-subtle">{factor > 1 ? "billed annually" : "per month"}</span>
      </div>
      <div className="flex flex-col gap-2">
        {breakdown.lines.map((line) => <ReceiptRow key={line.id} label={line.label} note={`× ${line.quantity}${line.unit ? ` ${line.unit}${line.quantity !== 1 ? "s" : ""}` : ""}`} value={formatPrice(line.amount * factor, currency, locale)} />)}
        <ReceiptRow label="Subtotal" tone="muted" value={formatPrice(subtotal, currency, locale)} />
        {breakdown.cycleDiscountAmount > 0 && <ReceiptRow label={<span className="inline-flex items-center gap-1.5"><ArrowDownIcon className="h-3.5 w-3.5" />Annual discount ({breakdown.cycleDiscountPercent}%)</span>} tone="discount" value={`−${formatPrice(breakdown.cycleDiscountAmount, currency, locale)}`} />}
        {breakdown.coupon && <ReceiptRow label={<span className="inline-flex items-center gap-1.5"><TagIcon className="h-3.5 w-3.5" />Coupon {breakdown.coupon.code.toUpperCase()}{breakdown.coupon.percent != null ? ` (${breakdown.coupon.percent}%)` : ""}</span>} tone="discount" value={`−${formatPrice(breakdown.coupon.savings, currency, locale)}`} />}
      </div>
      {showSavingsMeter && breakdown.discountsTotal > 0 && (
        <div className="mt-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Savings</span><span className="font-medium text-success">{formatPrice(breakdown.discountsTotal, currency, locale)}<span className="ml-1 text-subtle">({savingsPct}%)</span></span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-success transition-[width] duration-500 ease-out" style={{ width: `${savingsPct}%` }} /></div>
          {factor > 1 && <p className="text-[11px] text-subtle">That&apos;s like getting {monthsFree} months of list price free.</p>}
        </div>
      )}
      <div className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total · {factor > 1 ? "per year" : "per month"}</span>
            {factor > 1 && <span className="text-[11px] text-subtle">≈ {formatPrice(breakdown.monthlyTotal, currency, locale)}/mo</span>}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            {listPrice > breakdown.total && <span className="text-sm text-muted-foreground line-through">{formatPrice(listPrice, currency, locale)}</span>}
            <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">{formatPrice(animatedTotal, currency, locale)}</span>
          </div>
        </div>
        {showCopy && (
          <button type="button" onClick={onCopy} className={cn("inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors", copied ? "border-success/30 bg-success-soft/60 text-success" : "border-border bg-background text-muted-foreground hover:text-foreground")}>
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}{copied ? "Quote copied" : "Copy quote"}
          </button>
        )}
      </div>
    </div>
  );
});
