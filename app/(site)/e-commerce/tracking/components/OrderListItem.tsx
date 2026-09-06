"use client";

import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { Badge } from "@/components/ui/Badge";
import { STATUS_META, type TrackingOrder } from "../tracking-data";

interface OrderListItemProps {
  order: TrackingOrder;
  selected: boolean;
  onSelect: (orderId: string) => void;
}

export function OrderListItem({ order, selected, onSelect }: OrderListItemProps) {
  const meta = STATUS_META[order.status];
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(order.orderId)}
        aria-pressed={selected}
        aria-label={`Order ${order.orderId}, ${meta.label}, ${order.items.length} items, $${order.total.toFixed(2)}`}
        className={cn(
          "w-full rounded-lg border p-4 text-left transition-colors",
          FOCUS.ring,
          selected
            ? "border-primary/40 bg-primary-soft shadow-sm"
            : "border-border/60 bg-background hover:border-ring/40 hover:bg-muted/40",
        )}
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-mono text-sm font-medium text-foreground">{order.orderId}</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""} · ${order.total.toFixed(2)}
            </p>
          </div>
          <Badge variant={meta.variant} size="sm" className="shrink-0">
            {meta.label}
          </Badge>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {order.items.slice(0, 3).map((item, i) => (
            <span
              key={i}
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
            </span>
          ))}
          {order.items.length > 3 && (
            <span className="text-xs text-muted-foreground">+{order.items.length - 3} more</span>
          )}
        </div>
      </button>
    </li>
  );
}
