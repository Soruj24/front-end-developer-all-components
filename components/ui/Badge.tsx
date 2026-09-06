import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success/10 text-success ring-1 ring-success/20",
  warning: "bg-warning/10 text-warning ring-1 ring-warning/20",
  error: "bg-danger/10 text-danger ring-1 ring-danger/20",
  info: "bg-info/10 text-info ring-1 ring-info/20",
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
  (
    {
      className,
      variant = "default",
      size = "md",
      dot,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
          "transition-all duration-150 ease-out",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export default Badge;
export { Badge };
