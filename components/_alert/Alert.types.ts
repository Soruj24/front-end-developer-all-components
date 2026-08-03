import type { ReactNode } from "react";

export type AlertVariant = "default" | "destructive" | "success" | "warning" | "info";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}
