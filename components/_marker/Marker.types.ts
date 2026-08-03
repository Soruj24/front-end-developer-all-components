import type { ReactNode, HTMLAttributes } from "react";

export type MarkerVariant = "default" | "primary" | "secondary" | "danger";
export type MarkerShape = "circle" | "square" | "dot";

export interface MarkerProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: MarkerVariant;
  shape?: MarkerShape;
  size?: number;
}
