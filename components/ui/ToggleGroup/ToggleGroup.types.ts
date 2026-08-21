import { type ReactNode } from "react";

export type ToggleGroupType = "single" | "multiple";
export type ToggleGroupOrientation = "horizontal" | "vertical";
export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupVariant = "default" | "outline" | "ghost";

export interface ToggleGroupProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: ToggleGroupType;
  orientation?: ToggleGroupOrientation;
  size?: ToggleGroupSize;
  variant?: ToggleGroupVariant;
  className?: string;
  children: ReactNode;
}

export interface ToggleGroupItemProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}
