import type { TimelineEventType } from "./Timeline.types";

export const TYPE_STYLES: Record<TimelineEventType, { dot: string; badge: string }> = {
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

export function getEventStyles(type?: TimelineEventType) {
  return TYPE_STYLES[type ?? "default"] ?? TYPE_STYLES.default;
}
