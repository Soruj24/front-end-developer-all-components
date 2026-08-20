import { cn } from "@/lib/cn";
import type { CardProps } from "./Card.types";

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

const variantClasses: Record<string, string> = {
  default:
    "border border-border bg-card text-card-foreground shadow-sm",
  elevated:
    "border border-border/60 bg-card text-card-foreground shadow-md shadow-black/[.03] dark:shadow-black/[.08]",
  outline:
    "border-2 border-border bg-transparent text-card-foreground",
  ghost:
    "border border-transparent bg-muted/40 text-card-foreground",
};

export function Card({ children, padding = "md", variant = "default", className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-colors",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
