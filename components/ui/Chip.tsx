import { ButtonHTMLAttributes, forwardRef } from "react";

type ChipVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type ChipSize = "sm" | "md" | "lg";

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-info-soft text-info",
  secondary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-danger-soft text-danger",
  outline: "border border-current bg-transparent text-foreground",
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className = "", variant = "default", size = "md", removable, onRemove, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
        {removable && (
          <span
            onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
            className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100"
          >
            ✕
          </span>
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export default Chip;
export { Chip };
