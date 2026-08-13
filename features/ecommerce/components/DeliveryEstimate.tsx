import { cn } from "@/lib/cn";

interface DeliveryEstimateProps {
  estimatedDays?: number;
  freeShipping?: boolean;
  expressAvailable?: boolean;
  className?: string;
}

export function DeliveryEstimate({
  estimatedDays = 5,
  freeShipping,
  expressAvailable,
  className,
}: DeliveryEstimateProps) {
  const now = new Date();
  const deliveryStart = new Date(now);
  deliveryStart.setDate(deliveryStart.getDate() + estimatedDays);
  const deliveryEnd = new Date(now);
  deliveryEnd.setDate(deliveryEnd.getDate() + estimatedDays + 2);

  const format = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className={cn("rounded-xl border border-border/50 bg-background p-4", className)}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {format(deliveryStart)} - {format(deliveryEnd)}
            </span>
            {freeShipping && (
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                FREE
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Order within{" "}
            <span className="font-medium text-foreground">
              {Math.max(0, 23 - now.getHours())}h {Math.max(0, 59 - now.getMinutes())}m
            </span>{" "}
            for estimated delivery
          </p>
          {expressAvailable && (
            <p className="mt-1 text-xs text-primary">
              Express shipping available at checkout
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
