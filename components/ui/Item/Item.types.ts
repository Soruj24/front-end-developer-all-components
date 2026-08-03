import type { ReactNode } from "react";

export interface ItemProps {
  icon?: ReactNode;
  label: string;
  description?: string;
  actions?: ReactNode;
  onClick?: () => void;
  className?: string;
}
