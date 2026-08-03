import type { ReactNode } from "react";

export type KbdVariant = "default" | "outline" | "ghost";
export type KbdSize = "sm" | "md" | "lg";

export interface KbdProps {
  children: ReactNode;
  variant?: KbdVariant;
  size?: KbdSize;
  className?: string;
}
