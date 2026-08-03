import type { ReactNode } from "react";

export type SliderVariant = "default" | "accent";
export type SliderSize = "sm" | "md" | "lg";

export interface SliderProps {
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
  variant?: SliderVariant;
  size?: SliderSize;
  disabled?: boolean;
  label?: ReactNode;
  onChange?: (value: number[]) => void;
  className?: string;
}
