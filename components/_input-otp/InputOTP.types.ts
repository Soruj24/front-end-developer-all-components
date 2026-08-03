import type { InputHTMLAttributes, ReactNode } from "react";

export type InputOTPSize = "sm" | "md" | "lg";

export interface InputOTPProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  length?: number;
  size?: InputOTPSize;
  variant?: "numbers" | "alpha";
  label?: ReactNode;
  error?: boolean;
}
