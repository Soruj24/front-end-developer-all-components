import type { ReactNode } from "react";

export type ToggleGroupType = "single" | "multiple";
export type ToggleGroupVariant = "default" | "outline" | "ghost";
export type ToggleGroupSize = "sm" | "md" | "lg";

export interface ToggleGroupProps {
  type?: ToggleGroupType;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: ReactNode;
  className?: string;
}

export interface ToggleGroupItemProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}
