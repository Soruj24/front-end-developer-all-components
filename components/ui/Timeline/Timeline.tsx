"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { TimelineHorizontal } from "./TimelineHorizontal";
import { TimelineVertical } from "./TimelineVertical";
import type { TimelineProps } from "./Timeline.types";

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    { events, variant = "vertical", onEventClick, expandedIndex, className },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(className)}>
        {variant === "horizontal" ? (
          <TimelineHorizontal
            events={events}
            onEventClick={onEventClick}
            expandedIndex={expandedIndex}
          />
        ) : (
          <TimelineVertical
            events={events}
            onEventClick={onEventClick}
            expandedIndex={expandedIndex}
          />
        )}
      </div>
    );
  },
);

Timeline.displayName = "Timeline";

export default Timeline;
