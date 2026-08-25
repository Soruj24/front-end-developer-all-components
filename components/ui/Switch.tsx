import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: SwitchSize;
  label?: string;
  description?: string;
  error?: boolean | string;
}

const TRACK_SIZES: Record<SwitchSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-13",
};

const THUMB_SIZES: Record<SwitchSize, string> = {
  sm: "h-4 w-4 peer-checked:translate-x-4",
  md: "h-5 w-5 peer-checked:translate-x-5",
  lg: "h-6 w-6 peer-checked:translate-x-6",
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = "md", label, description, error, disabled, id, ...props }, ref) => {
    const switchId = id ?? (label ? `switch-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "flex items-start gap-3",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className,
        )}
      >
        <div
          className={cn(
            "relative mt-0.5 inline-flex shrink-0 items-center rounded-full border-2 transition-all duration-200 ease-in-out",
            TRACK_SIZES[size],
            error
              ? "border-danger/40 bg-danger/10 peer-checked:bg-danger"
              : "border-transparent bg-muted peer-checked:bg-primary",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background",
          )}
        >
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            aria-invalid={!!error || undefined}
            className="peer sr-only"
            disabled={disabled}
            {...props}
          />
          <span
            className={cn(
              "absolute inset-0 rounded-full transition-colors duration-200",
              error
                ? "bg-danger/10 peer-checked:bg-danger"
                : "bg-muted peer-checked:bg-primary",
            )}
          />
          <span
            className={cn(
              "absolute left-0.5 rounded-full bg-background shadow-sm transition-all duration-200 ease-in-out",
              "peer-checked:shadow-md",
              THUMB_SIZES[size],
              !disabled && "group-hover:shadow-md",
            )}
          />
        </div>
        {(label || description || error) && (
          <div className="flex flex-1 flex-col gap-0.5">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
            {typeof error === "string" && (
              <span className="text-xs text-danger">{error}</span>
            )}
          </div>
        )}
      </label>
    );
  },
);
Switch.displayName = "Switch";

export { Switch };
