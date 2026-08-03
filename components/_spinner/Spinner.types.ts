import type { HTMLAttributes } from "react";

export type SpinnerVariant = "default" | "primary" | "secondary";
export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  label?: string;
}
