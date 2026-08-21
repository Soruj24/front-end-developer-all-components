import type { ReactNode } from "react";

export type StatusVariant = "active" | "warning" | "error" | "info" | "neutral";

export type StatusSize = "sm" | "md" | "lg";

export interface StatusBadgeProps {
  /** Status variant. */
  status: StatusVariant;
  /** Display label text. */
  label: string;
  /** Show animated ping dot. */
  animated?: boolean;
  /** Badge size. */
  size?: StatusSize;
  /** Custom icon element (overrides default icon). */
  icon?: ReactNode;
  /** Hide the label text, show only the dot/icon. */
  dotOnly?: boolean;
  /** Additional CSS classes. */
  className?: string;
}
