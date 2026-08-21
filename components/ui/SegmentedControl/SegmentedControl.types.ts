import type { ReactNode } from "react";

export interface SegmentedControlOption {
  /** Unique value identifier. */
  value: string;
  /** Display label. */
  label?: string;
  /** Optional icon. */
  icon?: ReactNode;
}

export type SegmentedControlSize = "sm" | "md" | "lg";

export interface SegmentedControlProps {
  /** Available options. */
  options: SegmentedControlOption[];
  /** Currently selected value. */
  value: string;
  /** Callback when selection changes. */
  onChange: (value: string) => void;
  /** Control size. */
  size?: SegmentedControlSize;
  /** Additional CSS classes on the container. */
  className?: string;
}
