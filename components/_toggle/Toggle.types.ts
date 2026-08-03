import type { ButtonHTMLAttributes } from "react";

export type ToggleVariant = "default" | "outline" | "ghost";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}
