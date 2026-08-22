"use client";

import { cn } from "@/lib/cn";
import { getEventStyles } from "./Timeline.constants";
import type { TimelineEvent, TimelineProps } from "./Timeline.types";

type TimelineVerticalProps = Omit<TimelineProps, "variant" | "className">;

function EventNode({ event }: { event: TimelineEvent }) {
  const styles = getEventStyles(event.type);
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-background shadow-sm",
        styles.dot,
      )}
    >
      {event.icon || <div className="h-2 w-2 rounded-full bg-current opacity-80" />}
    </div>
  );
}

export function TimelineVertical({
  events,
  onEventClick,
  expandedIndex,
}: TimelineVerticalProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-[17px] top-4 bottom-4 w-px bg-gradient-to-b from-border/0 via-border to-border/0"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-8">
        {events.map((event, i) => {
          const styles = getEventStyles(event.type);
          const isExpanded = expandedIndex === i;
          return (
            <div key={i} className="relative flex items-start gap-4">
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <EventNode event={event} />
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
                  onEventClick &&
                    "cursor-pointer hover:border-border hover:shadow-md hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
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
                  <span className="text-[11px] text-muted-foreground">{event.date}</span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-foreground">{event.title}</h4>
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
