import type { SelectHTMLAttributes, ReactNode } from "react";

export type NativeSelectSize = "sm" | "md" | "lg";

export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: NativeSelectSize;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
}
