import { InputHTMLAttributes, ReactNode, forwardRef, useId, useState } from "react";

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

    const leftPad = icon && iconPosition === "left" ? "pl-10" : "";
    const rightPad = (icon && iconPosition === "right") || clearable ? "pr-10" : "";

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
            className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 ${
              error
                ? "border-danger focus:border-danger focus:ring-danger"
                : "border-input focus:border-ring focus:ring-ring"
            } ${leftPad} ${rightPad} ${className}`}
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
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              tabIndex={-1}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
export { Input };
