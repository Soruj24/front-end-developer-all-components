import type { ReactNode, InputHTMLAttributes } from "react";

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxVariant = "default" | "outline" | "ghost";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  label?: ReactNode;
  error?: boolean;
}
