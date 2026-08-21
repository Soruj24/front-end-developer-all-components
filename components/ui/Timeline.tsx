"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type?: string;
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  variant?: "vertical" | "horizontal";
  onEventClick?: (index: number) => void;
  expandedIndex?: number | null;
}

const TYPE_STYLES: Record<string, { dot: string; badge: string }> = {
  work: {
    dot: "bg-blue-500 text-white",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  personal: {
    dot: "bg-emerald-500 text-white",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  milestone: {
    dot: "bg-amber-500 text-white",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  default: {
    dot: "bg-muted-foreground text-white",
    badge: "bg-muted text-muted-foreground",
  },
};

function getStyles(type?: string) {
  return TYPE_STYLES[type ?? "default"] ?? TYPE_STYLES.default;
}

function VerticalTimeline({ events, onEventClick, expandedIndex }: TimelineProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-[17px] top-4 bottom-4 w-px bg-gradient-to-b from-border/0 via-border to-border/0"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-8">
        {events.map((event, i) => {
          const styles = getStyles(event.type);
          const isExpanded = expandedIndex === i;
          return (
            <div key={i} className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-background shadow-sm",
                    styles.dot,
                  )}
                >
                  {event.icon || (
                    <div className="h-2 w-2 rounded-full bg-current opacity-80" />
                  )}
                </div>
              </div>
              <div
                role={onEventClick ? "button" : undefined}
                tabIndex={onEventClick ? 0 : undefined}
                onClick={() => onEventClick?.(i)}
                onKeyDown={(e) => {
                  if (onEventClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onEventClick(i);
                  }
                }}
                className={cn(
                  "flex-1 rounded-xl border border-border/60 bg-background p-4 shadow-sm",
                  "transition-all duration-200",
                  onEventClick && "cursor-pointer hover:border-border hover:shadow-md hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                      styles.badge,
                    )}
                  >
                    {event.type ?? "event"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {event.date}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-foreground">
                  {event.title}
                </h4>
                <p
                  className={cn(
                    "mt-1 text-[13px] leading-relaxed text-muted-foreground",
                    !isExpanded && "line-clamp-2",
                  )}
                >
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HorizontalTimeline({ events, onEventClick, expandedIndex }: TimelineProps) {
  return (
    <div className="overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex gap-0 min-w-max px-2">
        {events.map((event, i) => {
          const styles = getStyles(event.type);
          const isExpanded = expandedIndex === i;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 ring-background shadow-sm",
                    styles.dot,
                  )}
                >
                  {event.icon || (
                    <div className="h-2 w-2 rounded-full bg-current opacity-80" />
                  )}
                </div>
                {i < events.length - 1 && (
                  <div className="h-px w-20 bg-gradient-to-r from-border to-border/40" />
                )}
              </div>
              <div
                role={onEventClick ? "button" : undefined}
                tabIndex={onEventClick ? 0 : undefined}
                onClick={() => onEventClick?.(i)}
                onKeyDown={(e) => {
                  if (onEventClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onEventClick(i);
                  }
                }}
                className={cn(
                  "mt-3 w-52 rounded-xl border border-border/60 bg-background p-3.5 shadow-sm",
                  "transition-all duration-200",
                  onEventClick && "cursor-pointer hover:border-border hover:shadow-md hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      styles.badge,
                    )}
                  >
                    {event.type ?? "event"}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-foreground">
                  {event.title}
                </h4>
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed text-muted-foreground",
                    !isExpanded && "line-clamp-2",
                  )}
                >
                  {event.description}
                </p>
                <span className="mt-2 block text-[11px] text-muted-foreground/70">
                  {event.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Timeline({
  events,
  variant = "vertical",
  onEventClick,
  expandedIndex,
}: TimelineProps) {
  if (variant === "horizontal") {
    return (
      <HorizontalTimeline
        events={events}
        variant={variant}
        onEventClick={onEventClick}
        expandedIndex={expandedIndex}
      />
    );
  }
  return (
    <VerticalTimeline
      events={events}
      variant={variant}
      onEventClick={onEventClick}
      expandedIndex={expandedIndex}
    />
  );
}

export default Timeline;
