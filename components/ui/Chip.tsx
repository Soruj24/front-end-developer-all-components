import { ButtonHTMLAttributes, forwardRef, useCallback } from "react";
import { cn } from "@/lib/cn";

type ChipVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type ChipSize = "sm" | "md" | "lg";

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  primary: "bg-primary/10 text-primary hover:bg-primary/20",
  secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900",
  error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-7 px-2.5 text-xs gap-1.5",
  lg: "h-8 px-3 text-sm gap-2",
};

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      removable,
      onRemove,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const handleRemove = useCallback(
      (e: React.SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onRemove?.();
      },
      [onRemove],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          onRemove?.();
        }
      },
      [onRemove],
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex shrink-0 items-center rounded-full font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.97]",
          disabled && "pointer-events-none opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        onKeyDown={removable ? handleKeyDown : undefined}
        {...props}
      >
        {children}
        {removable && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Remove"
            onClick={handleRemove}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRemove(e);
              }
            }}
            className={cn(
              "ml-0.5 -mr-1 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150",
              "hover:bg-black/10 dark:hover:bg-white/15",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            )}
          >
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        )}
      </button>
    );
  },
);
Chip.displayName = "Chip";

export default Chip;
export { Chip };
