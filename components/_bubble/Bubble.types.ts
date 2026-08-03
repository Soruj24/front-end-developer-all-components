import type { ReactNode, HTMLAttributes } from "react";

export type BubbleVariant = "default" | "primary" | "secondary" | "muted";
export type BubbleSize = "sm" | "md" | "lg";

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: BubbleVariant;
  size?: BubbleSize;
  icon?: ReactNode;
  tail?: boolean;
}
