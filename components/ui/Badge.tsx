import { HTMLAttributes, forwardRef } from "react";

type Variant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success-soft text-success border border-success/25",
  warning: "bg-warning-soft text-warning border border-warning/25",
  error: "bg-danger-soft text-danger border border-danger/25",
  outline: "border border-border text-foreground",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", size = "md", dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export default Badge;
export { Badge };
