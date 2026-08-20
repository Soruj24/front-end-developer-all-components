import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonSpotlightVariant = "default" | "outline" | "ghost";

export interface ButtonSpotlightProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonSpotlightVariant;
  spotlightSize?: number;
  spotlightBlur?: number;
}
