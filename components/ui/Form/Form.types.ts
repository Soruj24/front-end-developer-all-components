import type { ReactNode, FormEvent } from "react";

export interface FormProps {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export interface FormFieldProps {
  children: ReactNode;
  label?: string;
  error?: string;
  className?: string;
}

export interface FormLabelProps {
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export interface FormMessageProps {
  children: ReactNode;
  type?: "error" | "success" | "warning";
  className?: string;
}
