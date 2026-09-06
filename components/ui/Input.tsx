import { InputHTMLAttributes, ReactNode, forwardRef, useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  clearable?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, icon, iconPosition = "left", clearable, ...props }, ref) => {
    const uid = useId();
    const inputId = props.id ?? uid;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const [internalHasValue, setInternalHasValue] = useState(
      props.defaultValue !== undefined && props.defaultValue !== ""
    );

    const hasValue = props.value !== undefined ? props.value !== "" : internalHasValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setInternalHasValue(false);
      if (ref && typeof ref === "object" && ref.current) {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        setter?.call(ref.current, "");
        ref.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground",
              "placeholder:text-muted-foreground",
              "transition-colors duration-200",
              "hover:border-muted-foreground/30",
              "focus:outline-none focus:border-ring/60 focus:ring-2 focus:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                : "",
              icon && iconPosition === "left" ? "pl-10" : "",
              (icon && iconPosition === "right") || clearable ? "pr-10" : "",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            onChange={handleChange}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
              {icon}
            </div>
          )}
          {clearable && hasValue && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-xs text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
export { Input };
