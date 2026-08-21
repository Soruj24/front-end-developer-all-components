"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ChevronRight } from "lucide-react";
import type { ListGroupProps, ListGroupItem } from "./ListGroup.types";

const BADGE_VARIANTS: Record<string, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  danger: "bg-red-500 text-white",
  success: "bg-emerald-500 text-white",
};

function BadgeValue({ item }: { item: ListGroupItem }) {
  if (item.badge === undefined || item.badge === null) return null;
  const isNumber = typeof item.badge === "number";
  if (isNumber && item.badge === 0) return null;
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums leading-none",
        BADGE_VARIANTS[item.badgeVariant ?? "default"],
      )}
      aria-label={`${item.badge} items`}
    >
      {item.badge}
    </span>
  );
}

function ItemContent({ item }: { item: ListGroupItem }) {
  return (
    <>
      {item.icon && (
        <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true">
          <item.icon className="h-4 w-4" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{item.label}</span>
        {item.description && (
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.description}</span>
        )}
      </div>
      <BadgeValue item={item} />
      {item.trailing}
    </>
  );
}

const ListGroup = forwardRef<HTMLDivElement, ListGroupProps>(
  (
    {
      items,
      onSelect,
      bordered = true,
      flush = false,
      horizontal = false,
      className,
      header,
      footer,
    },
    ref,
  ) => {
    const handleClick = useCallback(
      (item: ListGroupItem, index: number) => {
        if (item.disabled || !onSelect) return;
        onSelect(item.id, index);
      },
      [onSelect],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          horizontal && "flex-row flex-wrap gap-1",
          !flush && bordered && "overflow-hidden rounded-xl border border-border/60",
          flush && bordered && "border-y border-border/60",
          className,
        )}
        role="list"
      >
        {header && (
          <div className="border-b border-border/60 bg-muted/30 px-4 py-2.5">
            {header}
          </div>
        )}
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => handleClick(item, index)}
              className={cn(
                "group flex w-full items-center gap-3 text-left transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
                horizontal
                  ? "justify-center rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "px-4 py-3",
                !horizontal && !flush && "border-b border-border/30 last:border-b-0",
                item.active && !horizontal && "bg-primary/5",
                item.unread && !horizontal && "bg-primary/5",
                item.disabled && "cursor-not-allowed opacity-40",
                !item.disabled && !horizontal && "cursor-pointer hover:bg-muted/30",
                item.className,
              )}
              role="listitem"
              aria-disabled={item.disabled}
              aria-current={item.active ? "true" : undefined}
              tabIndex={item.disabled ? undefined : 0}
            >
              <ItemContent item={item} />
              {!horizontal && !item.trailing && !item.badge && <ChevronRight className="shrink-0 h-4 w-4 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground" aria-hidden="true" />}
            </button>
          );
        })}
        {footer && (
          <div className="border-t border-border/60 bg-muted/30 px-4 py-2.5">
            {footer}
          </div>
        )}
      </div>
    );
  },
);

ListGroup.displayName = "ListGroup";

export default ListGroup;
