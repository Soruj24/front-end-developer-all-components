import type { ReactNode } from "react";

export interface GestureAreaProps {
  children?: ReactNode;
  onSwipe?: (direction: "left" | "right" | "up" | "down") => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
  swipeThreshold?: number;
  longPressDelay?: number;
  className?: string;
  disabled?: boolean;
}
