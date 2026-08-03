import type { ReactNode, LabelHTMLAttributes } from "react";

export type LabelVariant = "default" | "secondary";
export type LabelSize = "sm" | "md" | "lg";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  variant?: LabelVariant;
  size?: LabelSize;
  required?: boolean;
  disabled?: boolean;
}
