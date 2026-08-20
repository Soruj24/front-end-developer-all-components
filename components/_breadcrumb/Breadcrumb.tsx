import * as React from "react";
import { cn } from "@/lib/cn";
import type { BreadcrumbProps } from "./Breadcrumb.types";
import { BREADCRUMB_STYLES } from "./Breadcrumb.constants";

const ChevronSeparator = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("text-muted-foreground/40", className)}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function Breadcrumb({
  items,
  separator,
  variant = "default",
  className,
  itemClassName,
  activeIndex,
}: BreadcrumbProps) {
  const defaultSeparator = separator ?? <ChevronSeparator />;
  const isPill = variant === "pill";
  const isMuted = variant === "muted";

  return (
    <nav
      aria-label="breadcrumb"
      className={cn(
        isPill
          ? BREADCRUMB_STYLES.basePill
          : isMuted
            ? BREADCRUMB_STYLES.baseMuted
            : BREADCRUMB_STYLES.base,
        className,
      )}
    >
      <ol className="contents">
        {items.map((item, idx) => {
          const isActive =
            activeIndex !== undefined ? idx === activeIndex : idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <span
                  className={cn(
                    BREADCRUMB_STYLES.separator,
                    isPill && "px-0.5 text-muted-foreground/30",
                  )}
                  aria-hidden="true"
                >
                  {defaultSeparator}
                </span>
              )}
              <span
                className={cn(
                  BREADCRUMB_STYLES.item,
                  isActive && (isPill ? BREADCRUMB_STYLES.itemActivePill : BREADCRUMB_STYLES.itemActive),
                  !isActive && !item.onClick && !item.href && "pointer-events-none opacity-50",
                  item.onClick && BREADCRUMB_STYLES.link,
                  isMuted && "px-0",
                  itemClassName,
                )}
                onClick={item.onClick}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon && (
                  <span className={BREADCRUMB_STYLES.icon}>{item.icon}</span>
                )}
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
