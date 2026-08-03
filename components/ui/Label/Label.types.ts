import type { ReactNode } from "react";

export interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
