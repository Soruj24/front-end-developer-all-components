"use client";

interface CartFreeShippingBarProps {
  hasFreeShipping: boolean;
  amountToFreeShipping: number;
  threshold: number;
}

export function CartFreeShippingBar({
  hasFreeShipping,
  amountToFreeShipping,
  threshold,
}: CartFreeShippingBarProps) {
  const progress = hasFreeShipping
    ? 100
    : Math.min(100, Math.max(0, ((threshold - amountToFreeShipping) / threshold) * 100));

  return (
    <div className="rounded-lg bg-muted/50 px-4 py-3">
      {hasFreeShipping ? (
        <p role="status" className="flex items-center gap-2 text-sm font-medium text-success">
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          You qualify for free shipping!
        </p>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Add <span className="font-semibold text-foreground">${amountToFreeShipping.toFixed(2)}</span> more for free shipping
          </p>
          <div
            role="progressbar"
            aria-label="Progress to free shipping"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
