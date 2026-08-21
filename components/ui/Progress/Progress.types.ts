export type ProgressVariant = "default" | "success" | "warning" | "danger" | "info";

export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  className?: string;
}
