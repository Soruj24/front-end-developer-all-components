import * as React from "react";
import { cn } from "@/lib/cn";
import type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb.types";
import { BREADCRUMB_STYLES } from "./Breadcrumb.constants";

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function Breadcrumb({ items, separator, className, itemClassName, activeIndex }: BreadcrumbProps) {
  const defaultSeparator = separator ?? <ChevronIcon />;

  return (
    <nav aria-label="breadcrumb" className={cn(BREADCRUMB_STYLES.base, className)}>
      {items.map((item, idx) => {
        const isActive = activeIndex !== undefined ? idx === activeIndex : idx === items.length - 1;
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            <span
              className={cn(
                BREADCRUMB_STYLES.item,
                isActive && BREADCRUMB_STYLES.itemActive,
                item.onClick && BREADCRUMB_STYLES.link,
                itemClassName,
              )}
              onClick={item.onClick}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon && <span className={BREADCRUMB_STYLES.icon}>{item.icon}</span>}
              {item.label}
            </span>
            {!isLast && <span className={BREADCRUMB_STYLES.separator}>{defaultSeparator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
