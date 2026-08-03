import type { TextareaHTMLAttributes, ReactNode } from "react";

export type TextareaVariant = "default" | "outlined" | "filled";
export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  label?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
}
