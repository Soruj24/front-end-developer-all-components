import type { ReactNode } from "react";

/** Configuration shape for EmptyCard demo helpers across empty-state registry entries. */
export interface EmptyStateConfig {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
  cta: string;
  color: string;
  accent: string;
  animated?: boolean;
  interactive?: boolean;
  illustration?: boolean;
  uploadZone?: boolean;
  buttonVariant?: "outline" | "ghost";
}
