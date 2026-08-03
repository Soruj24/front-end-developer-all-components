import type { ReactNode } from "react";

export interface FieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}
