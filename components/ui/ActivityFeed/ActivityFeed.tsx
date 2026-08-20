"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/cn";
import type { ActivityFeedProps } from "./ActivityFeed.types";

const COLOR_MAP: Record<string, string> = {
  "bg-blue-500": "bg-blue-500",
  "bg-emerald-500": "bg-emerald-500",
  "bg-violet-500": "bg-violet-500",
  "bg-amber-500": "bg-amber-500",
  "bg-rose-500": "bg-rose-500",
  "bg-cyan-500": "bg-cyan-500",
  "bg-pink-500": "bg-pink-500",
  "bg-indigo-500": "bg-indigo-500",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TimelineDot({ color }: { color?: string }) {
  return (
    <span
      className={cn(
        "relative flex h-2.5 w-2.5 shrink-0 rounded-full border-2 border-background",
        color && COLOR_MAP[color] ? COLOR_MAP[color] : "bg-primary",
      )}
    >
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-30",
          color && COLOR_MAP[color] ? COLOR_MAP[color] : "bg-primary",
        )}
      />
    </span>
  );
}

export function ActivityFeed({
  items,
  variant = "default",
  showAll = true,
  maxItems = 50,
  className,
}: ActivityFeedProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const uid = useId();

  const visibleItems = showAll ? items.slice(0, maxItems) : items.slice(0, 3);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  return (
    <div className={cn("flex flex-col", className)}>
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        const isExpanded = expanded.has(item.id);
        const panelId = `${uid}-${item.id}`;
        const hasDetails = !!item.details;

        return (
          <div key={item.id} className="relative flex gap-3">
            {/* Timeline line */}
            {!isMinimal && !isLast && (
              <div className="absolute left-[5px] top-6 h-full w-px bg-border" />
            )}

            {/* Timeline dot or avatar */}
            {isMinimal ? (
              <TimelineDot color={item.color} />
            ) : (
              <div
                className={cn(
                  "relative z-10 flex shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
                  isCompact ? "h-8 w-8" : "h-10 w-10",
                  item.color && COLOR_MAP[item.color]
                    ? COLOR_MAP[item.color]
                    : "bg-primary",
                )}
              >
                {item.avatar ? (
                  getInitials(item.avatar)
                ) : item.icon ? (
                  <span className="flex h-full w-full items-center justify-center">
                    {item.icon}
                  </span>
                ) : (
                  getInitials(item.user)
                )}
              </div>
            )}

            {/* Content */}
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col",
                isCompact ? "py-1.5" : "py-2",
                !isMinimal && !isLast && "pb-4",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold text-foreground">
                      {item.user}
                    </span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-medium text-foreground">
                      {item.target}
                    </span>
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {item.time}
                </span>
              </div>

              {/* Expandable details */}
              {hasDetails && (
                <div className="mt-1.5">
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
                      "text-muted-foreground transition-colors duration-150",
                      "hover:bg-muted hover:text-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                  >
                    <svg
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        isExpanded && "rotate-90",
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {isExpanded ? "Less" : "Details"}
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-hidden={!isExpanded}
                    className={cn(
                      "overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="min-h-0 pt-1.5">
                      <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                        {item.details}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {visibleItems.length === 0 && (
        <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
          No activity yet.
        </div>
      )}
    </div>
  );
}

export type { ActivityFeedProps, ActivityFeedItem, ActivityFeedVariant };
