import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectVariant = "default" | "outline";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: SelectVariant;
  size?: SelectSize;
  label?: ReactNode;
  placeholder?: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: ReactNode;
}
