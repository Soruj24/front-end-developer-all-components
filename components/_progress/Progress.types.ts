import type { ReactNode } from "react";

export type ProgressVariant = "default" | "success" | "warning" | "danger";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: ReactNode;
  animated?: boolean;
  className?: string;
}
