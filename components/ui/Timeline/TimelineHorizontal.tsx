"use client";

import { cn } from "@/lib/cn";
import { getEventStyles } from "./Timeline.constants";
import type { TimelineProps } from "./Timeline.types";

type TimelineHorizontalProps = Omit<TimelineProps, "variant" | "className">;

export function TimelineHorizontal({
  events,
  onEventClick,
  expandedIndex,
}: TimelineHorizontalProps) {
  return (
    <div className="overflow-x-auto pb-4 scrollbar-thin">
      <div className="flex gap-0 min-w-max px-2">
        {events.map((event, i) => {
          const styles = getEventStyles(event.type);
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
                  {event.icon || <div className="h-2 w-2 rounded-full bg-current opacity-80" />}
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
                  onEventClick &&
                    "cursor-pointer hover:border-border hover:shadow-md hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                )}
              >
                <span
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    styles.badge,
                  )}
                >
                  {event.type ?? "event"}
                </span>
                <h4 className="mt-2 text-sm font-semibold text-foreground">{event.title}</h4>
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed text-muted-foreground",
                    !isExpanded && "line-clamp-2",
                  )}
                >
                  {event.description}
                </p>
                <span className="mt-2 block text-[11px] text-muted-foreground/70">{event.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
