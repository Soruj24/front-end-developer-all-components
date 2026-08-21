"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { TabBarProps } from "./TabBar.types";

const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
  ({ tabs, active, onChange, variant = "default", iconOnly = false, className }, ref) => {
    const isPill = variant === "pill";
    const isFloating = variant === "floating";
    const isFilled = variant === "filled";
    const isMinimal = variant === "minimal";

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          isFloating
            ? "rounded-2xl border border-border/60 bg-background px-2 py-1 shadow-lg shadow-black/5 dark:shadow-black/20"
            : isPill
              ? "gap-1 rounded-2xl border border-border/60 bg-muted/30 p-1"
              : isMinimal
                ? "bg-background"
                : "border-t border-border/60 bg-background",
          className,
        )}
        role="tablist"
        aria-label="Tab navigation"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const idx = tabs.findIndex((t) => t.id === tab.id);
                  const next = e.key === "ArrowRight"
                    ? (idx + 1) % tabs.length
                    : (idx - 1 + tabs.length) % tabs.length;
                  onChange(tabs[next].id);
                }
              }}
              className={cn(
                "group relative flex flex-1 items-center justify-center outline-none transition-all duration-200",
                isPill
                  ? cn(
                      "flex-col gap-0.5 rounded-xl py-2.5 text-[10px] font-medium",
                      isActive
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )
                  : isFloating
                    ? cn(
                        "flex-col gap-0.5 rounded-xl px-3 py-2 text-[10px] font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )
                    : cn(
                        iconOnly ? "py-3" : "py-2.5",
                        isFilled
                          ? cn(
                              "text-xs font-medium",
                              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                            )
                          : cn(
                              "text-[10px]",
                              isActive
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground",
                            ),
                    ),
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-xl",
              )}
            >
              {!isPill && !isFloating && isActive && (
                <span
                  className="absolute inset-x-auto top-0 h-0.5 w-8 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <span className="relative">
                {tab.icon}
                {tab.badge != null && tab.badge > 0 && (
                  <span
                    className={cn(
                      "absolute -right-1.5 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white",
                      isActive && (isPill || isFloating) ? "bg-primary-foreground/80 text-primary" : "bg-rose-500",
                    )}
                  >
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </span>
                )}
              </span>
              {!iconOnly && <span>{tab.label}</span>}
            </button>
          );
        })}
      </div>
    );
  },
);

TabBar.displayName = "TabBar";

export { TabBar };
