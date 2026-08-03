import type { ReactNode } from "react";

export type ButtonGroupVariant = "default" | "outline" | "ghost";
export type ButtonGroupSize = "sm" | "md" | "lg";
export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  orientation?: ButtonGroupOrientation;
  rounded?: boolean;
  gap?: "none" | "xs" | "sm" | "md";
  children: ReactNode;
  className?: string;
}
