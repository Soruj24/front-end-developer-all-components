import type { ReactNode } from "react";

export interface TabBarTab {
  /** Unique tab identifier. */
  id: string;
  /** Icon element. */
  icon: ReactNode;
  /** Display label. */
  label: string;
  /** Optional badge count. */
  badge?: number;
}

export type TabBarVariant = "default" | "filled" | "pill" | "minimal" | "floating";

export interface TabBarProps {
  /** Array of tab items. */
  tabs: TabBarTab[];
  /** Currently active tab ID. */
  active: string;
  /** Callback when a tab is selected. */
  onChange: (id: string) => void;
  /** Layout variant. */
  variant?: TabBarVariant;
  /** Hide labels (icon-only mode). */
  iconOnly?: boolean;
  /** Additional CSS classes on the container. */
  className?: string;
}
