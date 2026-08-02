import { InputHTMLAttributes, forwardRef } from "react";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, description, ...props }, ref) => {
    return (
      <label className={`flex items-start gap-3 ${className}`}>
        <div className="relative mt-0.5 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-ring-offset">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            {...props}
          />
          <span className="absolute inset-0 rounded-full bg-muted peer-checked:bg-foreground" />
          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Switch.displayName = "Switch";

export default Switch;
export { Switch };
