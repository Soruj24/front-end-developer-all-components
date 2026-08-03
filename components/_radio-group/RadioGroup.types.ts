import type { ReactNode } from "react";

export type RadioGroupValue = string | number | boolean;

export interface RadioGroupOption {
  value: RadioGroupValue;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value?: RadioGroupValue;
  defaultValue?: RadioGroupValue;
  onValueChange?: (value: RadioGroupValue) => void;
  label?: ReactNode;
  orientation?: "horizontal" | "vertical";
  error?: boolean;
  className?: string;
}
