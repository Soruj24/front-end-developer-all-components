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
    "hover:bg-primary/90 hover:shadow-md",
    "focus-visible:ring-primary/50",
    "dark:bg-primary dark:text-primary-foreground",
    "dark:hover:bg-primary/90",
  ].join(" "),
  secondary: [
    "bg-secondary text-secondary-foreground",
    "shadow-sm",
    "hover:bg-secondary/80 hover:shadow-md",
    "focus-visible:ring-secondary/50",
    "dark:bg-secondary dark:text-secondary-foreground",
    "dark:hover:bg-secondary/80",
  ].join(" "),
  outline: [
    "border border-input bg-background text-foreground",
    "shadow-sm",
    "hover:bg-accent hover:text-accent-foreground",
    "hover:shadow-md",
    "focus-visible:ring-ring/50",
    "dark:border-input dark:bg-background",
    "dark:hover:bg-accent dark:hover:text-accent-foreground",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:ring-ring/50",
    "dark:text-foreground",
    "dark:hover:bg-accent dark:hover:text-accent-foreground",
  ].join(" "),
  destructive: [
    "bg-destructive text-destructive-foreground",
    "shadow-sm",
    "hover:bg-destructive/90 hover:shadow-md",
    "focus-visible:ring-destructive/50",
    "dark:bg-destructive dark:text-destructive-foreground",
    "dark:hover:bg-destructive/90",
  ].join(" "),
  "destructive-outline": [
    "border border-destructive/30 bg-transparent text-destructive",
    "shadow-sm",
    "hover:bg-destructive/10 hover:border-destructive/50",
    "hover:shadow-md",
    "focus-visible:ring-destructive/50",
    "dark:border-destructive/40 dark:text-destructive",
    "dark:hover:bg-destructive/15",
  ].join(" "),
  link: [
    "bg-transparent text-primary underline-offset-4",
    "hover:underline",
    "focus-visible:ring-primary/50",
    "p-0 h-auto",
    "dark:text-primary",
  ].join(" "),
  soft: [
    "bg-primary/10 text-primary",
    "shadow-sm",
    "hover:bg-primary/15 hover:shadow-md",
    "focus-visible:ring-primary/50",
    "dark:bg-primary/15 dark:text-primary",
    "dark:hover:bg-primary/20",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  xs: "h-7 px-2.5 text-xs rounded-md gap-1 font-medium",
  sm: "h-8 px-3 text-sm rounded-md gap-1.5 font-medium",
  md: "h-9 px-4 text-sm rounded-md gap-2 font-medium",
  lg: "h-10 px-5 text-sm rounded-md gap-2 font-medium",
  xl: "h-11 px-6 text-base rounded-lg gap-2.5 font-semibold",
  "icon-sm": "h-8 w-8 p-0 rounded-md",
  icon: "h-9 w-9 p-0 rounded-md",
  "icon-lg": "h-10 w-10 p-0 rounded-md",
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
          "transition-all duration-200 ease-out",
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
