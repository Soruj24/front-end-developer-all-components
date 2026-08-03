import type { ReactNode, InputHTMLAttributes, LabelHTMLAttributes } from "react";

export type FieldSize = "sm" | "md" | "lg";

export interface FieldProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  size?: FieldSize;
  required?: boolean;
  className?: string;
}

export interface FieldInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: FieldSize;
  error?: boolean;
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}
