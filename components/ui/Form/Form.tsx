import { cn } from "@/lib/cn";
import type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormMessageProps,
} from "./Form.types";

export function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-5", className)}>
      {children}
    </form>
  );
}

export function FormField({
  children,
  label,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <FormMessage type="error">{error}</FormMessage>}
    </div>
  );
}

export function FormLabel({ children, required, className }: FormLabelProps) {
  return (
    <label className={cn("text-sm font-medium text-foreground", className)}>
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  );
}

export function FormMessage({
  children,
  type = "error",
  className,
}: FormMessageProps) {
  const styles = {
    error: "text-destructive",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
  };

  const icons = {
    error: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    success: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  };

  return (
    <p className={cn("flex items-center gap-1.5 text-xs", styles[type], className)}>
      {icons[type]}
      {children}
    </p>
  );
}
