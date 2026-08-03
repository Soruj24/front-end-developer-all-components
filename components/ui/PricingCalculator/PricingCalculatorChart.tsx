import { memo } from "react";
import type { Currency } from "./PricingCalculator.types";
import { formatPrice } from "./PricingCalculator.utils";

interface DonutSegment { id: string; label: string; value: number; color: string; }

export const DonutChart = memo(function DonutChart({ segments, currency, locale }: { segments: DonutSegment[]; currency: Currency | null; locale: string }) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  const size = 148; const strokeWidth = 22; const radius = (size - strokeWidth) / 2; const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative h-[148px] w-[148px] shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Monthly cost split by line item">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--muted)" strokeWidth={strokeWidth} />
          {total > 0 && segments.map((seg) => { const fraction = seg.value / total; const dash = fraction * circumference; const segment = <circle key={seg.id} cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} style={{ stroke: seg.color }} strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} transform={`rotate(-90 ${size / 2} ${size / 2})`} />; offset += dash; return segment; })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold tabular-nums text-foreground">{formatPrice(total, currency, locale)}</span>
          <span className="text-[11px] text-muted-foreground">/ month</span>
        </div>
      </div>
      <ul className="flex w-full flex-col gap-2 sm:w-auto">
        {segments.map((seg) => (
          <li key={seg.id} className="flex items-center justify-between gap-4 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />{seg.label}</span>
            <span className="tabular-nums text-foreground">{formatPrice(seg.value, currency, locale)}<span className="ml-1 text-xs text-muted-foreground">{Math.round((seg.value / total) * 100)}%</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
});
