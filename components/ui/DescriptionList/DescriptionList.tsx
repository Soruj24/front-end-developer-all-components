"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { DescriptionListProps } from "./DescriptionList.types";

const VARIANT_STYLES = {
  default: {
    container: "",
    item: "py-4 first:pt-0 last:pb-0",
    term: "text-sm font-semibold text-foreground",
    desc: "mt-1.5 text-sm text-muted-foreground leading-relaxed",
    divider: "border-b border-border/40",
    gap: "space-y-0",
  },
  card: {
    container: "rounded-xl border border-border/60 bg-background divide-y divide-border/40",
    item: "px-5 py-4",
    term: "text-sm font-semibold text-foreground",
    desc: "mt-1.5 text-sm text-muted-foreground leading-relaxed",
    divider: "",
    gap: "",
  },
  inline: {
    container: "",
    item: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3",
    term: "shrink-0 text-sm font-medium text-muted-foreground sm:w-40",
    desc: "text-sm text-foreground",
    divider: "border-b border-border/30",
    gap: "space-y-0",
  },
  stacked: {
    container: "space-y-6",
    item: "",
    term: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
    desc: "mt-2 text-sm text-foreground leading-relaxed",
    divider: "",
    gap: "",
  },
} as const;

const DescriptionList = forwardRef<HTMLElement, DescriptionListProps>(
  (
    {
      items,
      variant = "default",
      dividers = true,
      className,
      header,
      footer,
    },
    ref,
  ) => {
    const styles = VARIANT_STYLES[variant];
    return (
      <div className={cn("w-full", className)}>
        {header && (
          <div className="mb-4 border-b border-border/40 pb-3">
            {header}
          </div>
        )}
        <dl
          ref={ref}
          className={cn(styles.container, !dividers && variant !== "card" && "divide-transparent")}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.term}
                className={cn(
                  styles.item,
                  dividers && variant !== "card" && idx < items.length - 1 && styles.divider,
                  item.highlighted && "rounded-lg bg-primary/5 px-4 -mx-4",
                  item.className,
                )}
              >
                <dt className={cn(styles.term, "flex items-center gap-2")}>
                  {Icon && (
                    <span className="shrink-0 text-muted-foreground" aria-hidden="true">
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  <span>{item.term}</span>
                </dt>
                <dd className={cn(styles.desc)}>
                  {item.description}
                  {item.trailing && (
                    <span className="ml-2 inline-flex items-center align-middle">
                      {item.trailing}
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
        {footer && (
          <div className="mt-4 border-t border-border/40 pt-3">
            {footer}
          </div>
        )}
      </div>
    );
  },
);

DescriptionList.displayName = "DescriptionList";

export default DescriptionList;
