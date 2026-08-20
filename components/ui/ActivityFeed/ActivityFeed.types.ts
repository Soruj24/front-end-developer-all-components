import type { ReactNode } from "react";

export interface ActivityFeedItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar?: string;
  color?: string;
  icon?: ReactNode;
  details?: ReactNode;
}

export type ActivityFeedVariant = "default" | "compact" | "minimal";

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  variant?: ActivityFeedVariant;
  showAll?: boolean;
  maxItems?: number;
  className?: string;
}
