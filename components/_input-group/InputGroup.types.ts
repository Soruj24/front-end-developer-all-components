import type { ReactNode } from "react";

export type InputGroupVariant = "default" | "outline";

export interface InputGroupProps {
  children: ReactNode;
  variant?: InputGroupVariant;
  className?: string;
}
