import * as React from "react";
import { cn } from "@/lib/cn";
import { FIELD_STYLES } from "./Field.constants";
import type { ReactNode } from "react";
import type { FieldProps, FieldInputProps, FieldLabelProps, FieldSize } from "./Field.types";

export function Field({ label, helperText, error, children, required, className }: FieldProps) {
  return <div className={cn(FIELD_STYLES.base, className)}>{children}</div>;
}

export function FieldLabel({ required, children, className, ...props }: FieldLabelProps) {
  return (
    <label className={cn(FIELD_STYLES.label, required && FIELD_STYLES.required, className)} {...props}>
      {children}
    </label>
  );
}

export function FieldInput({ size = "md", error: hasError, className, ...props }: FieldInputProps) {
  return (
    <input
      className={cn(
        FIELD_STYLES.input,
        FIELD_STYLES[size],
        "border-gray-300 dark:border-gray-600",
        hasError && FIELD_STYLES.errorInput,
        className,
      )}
      {...props}
    />
  );
}

export function FieldHelper({ children }: { children: ReactNode }) {
  return <p className={cn(FIELD_STYLES.helper)}>{children}</p>;
}

export function FieldError({ children }: { children: ReactNode }) {
  return <p className={cn(FIELD_STYLES.errorText)} role="alert">{children}</p>;
}
