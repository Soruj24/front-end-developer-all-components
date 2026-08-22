export const TIMELINE_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TimelineVariant = "vertical" | "horizontal";
type TimelineEventType = "work" | "personal" | "milestone" | "default";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type?: TimelineEventType;
  icon?: React.ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
  variant?: TimelineVariant;
  onEventClick?: (index: number) => void;
  expandedIndex?: number | null;
  className?: string;
}

const TYPE_STYLES = {
  work:      { dot: "bg-blue-500 text-white",     badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  personal:  { dot: "bg-emerald-500 text-white",  badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  milestone: { dot: "bg-amber-500 text-white",    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  default:   { dot: "bg-muted-foreground text-white", badge: "bg-muted text-muted-foreground" },
};

function getStyles(type?: TimelineEventType) {
  return TYPE_STYLES[type ?? "default"];
}

// Vertical layout: gradient-faded line, ring-2 ring-background nodes,
// rounded-xl cards, type badges, click + keyboard (Enter/Space) support.
// Horizontal layout: gradient connectors between nodes, scrollable row.

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ events, variant = "vertical", onEventClick, expandedIndex, className }, ref) => {
    return (
      <div ref={ref} className={cn(className)}>
        {variant === "horizontal" ? <TimelineHorizontal {...{ events, onEventClick, expandedIndex }} /> : <TimelineVertical {...{ events, onEventClick, expandedIndex }} />}
      </div>
    );
  },
);

Timeline.displayName = "Timeline";

export { Timeline };
export type { TimelineProps, TimelineEvent };`;

export const VERTICAL_EXAMPLE = `import { Timeline } from "@/components/ui/Timeline";

const events = [
  { date: "Jan 2026", title: "Kickoff", description: "Project started.", type: "work" },
  { date: "Mar 2026", title: "Beta", description: "First release.", type: "milestone" },
];

<Timeline events={events} variant="vertical" />`;

export const HORIZONTAL_EXAMPLE = `import { Timeline } from "@/components/ui/Timeline";

<Timeline events={events} variant="horizontal" />`;

export const TYPE_COLORS_EXAMPLE = `import { Timeline } from "@/components/ui/Timeline";

const events = [
  { date: "Work", title: "Sprint", description: "Backlog.", type: "work" },
  { date: "Personal", title: "Lunch", description: "Team event.", type: "personal" },
  { date: "Milestone", title: "v2.0", description: "Major release.", type: "milestone" },
];

<Timeline events={events} />`;

export const EXPANDABLE_EXAMPLE = `import { useState } from "react";
import { Timeline } from "@/components/ui/Timeline";

function ExpandableTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <Timeline
      events={events}
      expandedIndex={expanded}
      onEventClick={(i) => setExpanded(expanded === i ? null : i)}
    />
  );
}`;

export const CUSTOM_ICONS_EXAMPLE = `import { StarIcon } from "lucide-react";
import { Timeline } from "@/components/ui/Timeline";

const events = [
  { date: "Q1", title: "Launch", description: "...", type: "milestone", icon: <StarIcon className="h-4 w-4" /> },
];

<Timeline events={events} />`;
