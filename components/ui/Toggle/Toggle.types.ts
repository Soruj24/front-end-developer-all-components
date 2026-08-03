import { ReactNode } from "react";

type ToggleSize = "default" | "sm" | "lg";

export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  className?: string;
  children: ReactNode;
}
