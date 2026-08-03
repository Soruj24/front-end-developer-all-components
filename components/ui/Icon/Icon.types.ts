import type { ReactNode } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  children: ReactNode;
  size?: IconSize;
  className?: string;
}
