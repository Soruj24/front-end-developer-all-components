import type { ReactNode } from "react";

export type NotificationVariant = "info" | "success" | "warning" | "error";

export interface NotificationProps {
  children: ReactNode;
  variant?: NotificationVariant;
  title?: string;
  onClose?: () => void;
  className?: string;
}

export interface NotificationTitleProps {
  children: ReactNode;
  className?: string;
}

export interface NotificationDescriptionProps {
  children: ReactNode;
  className?: string;
}
