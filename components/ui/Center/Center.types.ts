import type { ReactNode } from "react";

export type CenterAxis = "both" | "x" | "y";

export interface CenterProps {
  /** Centering axis. "both" centers both axes, "x" horizontal only, "y" vertical only. */
  axis?: CenterAxis;
  /** Use absolute positioning (fills parent). */
  inset?: boolean;
  /** Add responsive padding. */
  padding?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Child elements. */
  children?: ReactNode;
}
