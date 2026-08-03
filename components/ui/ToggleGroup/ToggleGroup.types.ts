import { ReactNode } from "react";

type ToggleGroupType = "single" | "multiple";
type ToggleGroupOrientation = "horizontal" | "vertical";

export interface ToggleGroupProps {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: ToggleGroupType;
  orientation?: ToggleGroupOrientation;
  className?: string;
  children: ReactNode;
}
