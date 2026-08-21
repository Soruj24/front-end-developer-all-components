import { ReactNode } from "react";

export type MarkerVariant = "yellow" | "green" | "blue" | "pink" | "red" | "purple";

export interface MarkerProps {
  children: ReactNode;
  active?: boolean;
  variant?: MarkerVariant;
  className?: string;
}
