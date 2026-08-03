import { cn } from "@/lib/cn";
import type { FormProps, FormFieldProps, FormLabelProps, FormMessageProps } from "./Form.types";

export function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      {children}
    </form>
  );
}

export function FormField({ children, label, error, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <FormMessage type="error">{error}</FormMessage>}
    </div>
  );
}

export function FormLabel({ children, required, className }: FormLabelProps) {
  return (
    <label className={cn("text-sm font-medium leading-none", className)}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export function FormMessage({ children, type = "error", className }: FormMessageProps) {
  const colors = {
    error: "text-red-500",
    success: "text-green-500",
    warning: "text-yellow-500",
  };

  return (
    <p className={cn("text-sm", colors[type], className)}>
      {children}
    </p>
  );
}
