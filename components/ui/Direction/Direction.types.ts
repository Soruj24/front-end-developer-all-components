import type { ReactNode } from "react";

export type Direction = "ltr" | "rtl";

export interface DirectionProviderProps {
  dir?: Direction;
  children: ReactNode;
  className?: string;
}
