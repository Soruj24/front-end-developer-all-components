import type { ReactNode } from "react";

export type TimelineVariant = "vertical" | "horizontal";

export type TimelineEventType = "work" | "personal" | "milestone" | "default";

export interface TimelineEvent {
  /** Date or period label shown next to the badge. */
  date: string;
  /** Event title. */
  title: string;
  /** Event description, clamped to two lines until expanded. */
  description: string;
  /** Color coding type for the node dot and badge. */
  type?: TimelineEventType;
  /** Custom icon override rendered inside the node. */
  icon?: ReactNode;
}

export interface TimelineProps {
  /** Chronologically ordered events to display. */
  events: TimelineEvent[];
  /** Layout direction. */
  variant?: TimelineVariant;
  /** Makes events clickable; receives the clicked index. */
  onEventClick?: (index: number) => void;
  /** Index of the event whose description is fully expanded. */
  expandedIndex?: number | null;
  /** Additional CSS classes. */
  className?: string;
}
