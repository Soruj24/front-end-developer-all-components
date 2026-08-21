export type ProgressBarVariant = "default" | "success" | "warning" | "error";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}
