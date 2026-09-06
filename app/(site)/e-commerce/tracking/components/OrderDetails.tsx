"use client";

import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { STATUS_META, type TrackingOrder } from "../tracking-data";

export function OrderDetails({ order }: { order: TrackingOrder }) {
  const meta = STATUS_META[order.status];
  const currentIndex = order.timeline.findIndex((e) => !e.completed);

  return (
    <div className="rounded-lg border border-border/60 bg-background p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex min-w-0 items-center justify-between gap-3">
        <h3 className="min-w-0 truncate font-mono text-sm font-semibold text-foreground">
          {order.orderId}
        </h3>
        <Badge variant={meta.variant} size="sm" className="shrink-0">
          {meta.label}
        </Badge>
      </div>

      {order.trackingNumber && (
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Tracking number
          </p>
          <p className="mt-1 break-all font-mono text-sm font-medium text-foreground">
            {order.trackingNumber}
          </p>
          {order.carrier && (
            <p className="mt-0.5 text-xs text-muted-foreground">{order.carrier}</p>
          )}
        </div>
      )}

      <div className="mb-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Estimated delivery
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{order.estimatedDelivery}</p>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-foreground">
          Items ({order.items.length})
        </p>
        <ul className="flex min-w-0 flex-col gap-3">
          {order.items.map((item, i) => (
            <li key={i} className="flex min-w-0 items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  {item.title}
                </span>
                <span className="block text-xs text-muted-foreground">Qty: {item.quantity}</span>
              </span>
              <span className="shrink-0 text-sm font-medium text-foreground">
                ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border/60 pt-4">
        <p className="mb-3 text-sm font-medium text-foreground">Tracking timeline</p>
        <ol className="flex min-w-0 flex-col">
          {order.timeline.map((event, i) => {
            const isCurrent = i === currentIndex;
            return (
              <li
                key={i}
                {...(isCurrent ? { "aria-current": "step" as const } : {})}
                className="flex min-w-0 gap-3"
              >
                <span className="flex flex-col items-center" aria-hidden="true">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2",
                      event.completed
                        ? "border-success bg-success text-white"
                        : isCurrent
                          ? "border-primary bg-background"
                          : "border-border bg-background",
                    )}
                  >
                    {event.completed && (
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </span>
                  {i < order.timeline.length - 1 && (
                    <span className={cn("w-0.5 min-h-6 flex-1", event.completed ? "bg-success/40" : "bg-border/60")} />
                  )}
                </span>
                <span className="min-w-0 pb-6">
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      event.completed || isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {event.status}
                    <span className="sr-only">
                      {event.completed ? " (completed)" : isCurrent ? " (current step)" : " (upcoming)"}
                    </span>
                  </span>
                  {event.date && (
                    <span className="block text-xs text-muted-foreground">{event.date}</span>
                  )}
                  {event.description && (
                    <span className="block text-xs text-muted-foreground">{event.description}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
