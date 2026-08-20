import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "destructive-outline"
  | "link"
  | "soft";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";

const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-primary text-primary-foreground",
    "shadow-sm",
    "hover:bg-primary/90 hover:shadow-md hover:shadow-primary/10",
    "focus-visible:ring-primary/50",
  ].join(" "),
  secondary: [
    "bg-secondary text-secondary-foreground",
    "shadow-xs",
    "hover:bg-secondary/80 hover:shadow-sm",
    "focus-visible:ring-secondary/50",
  ].join(" "),
  outline: [
    "border border-border bg-background text-foreground",
    "shadow-xs",
    "hover:bg-muted hover:border-border/80 hover:shadow-sm",
    "focus-visible:ring-ring/50",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-muted",
    "focus-visible:ring-ring/50",
  ].join(" "),
  destructive: [
    "bg-destructive text-destructive-foreground",
    "shadow-sm",
    "hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/10",
    "focus-visible:ring-destructive/50",
  ].join(" "),
  "destructive-outline": [
    "border border-destructive/30 bg-transparent text-destructive",
    "shadow-xs",
    "hover:bg-destructive/5 hover:border-destructive/50 hover:shadow-sm",
    "focus-visible:ring-destructive/50",
  ].join(" "),
  link: [
    "bg-transparent text-primary underline-offset-4",
    "hover:underline",
    "focus-visible:ring-primary/50",
    "p-0 h-auto",
  ].join(" "),
  soft: [
    "bg-primary/10 text-primary",
    "shadow-xs",
    "hover:bg-primary/15 hover:shadow-sm",
    "focus-visible:ring-primary/50",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  xs: "h-7 px-2 text-xs rounded-md gap-1",
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-9 px-4 text-sm rounded-lg gap-2",
  lg: "h-10 px-5 text-sm rounded-lg gap-2",
  xl: "h-11 px-6 text-base rounded-xl gap-2.5",
  "icon-sm": "h-8 w-8 p-0 rounded-lg",
  icon: "h-9 w-9 p-0 rounded-lg",
  "icon-lg": "h-10 w-10 p-0 rounded-lg",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium whitespace-nowrap",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.98]",
          "disabled:pointer-events-none disabled:opacity-50",
          "select-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, type Variant as ButtonVariant, type Size as ButtonSize };
export default Button;
