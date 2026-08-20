import type { ReactNode } from "react";

export interface ComboboxOption {
  value: string;
  label: ReactNode;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: ReactNode;
  maxSelected?: number;
  disabled?: boolean;
  className?: string;
}
