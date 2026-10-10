export const cardSource: string = `import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardVariant = "default" | "elevated" | "outline" | "ghost";

export interface CardProps {
  children: ReactNode;
  padding?: CardPadding;
  variant?: CardVariant;
  className?: string;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

const variantClasses: Record<string, string> = {
  default:
    "border border-border/60 bg-surface text-card-foreground shadow-sm",
  elevated:
    "border border-border/60 bg-surface text-card-foreground shadow-card",
  outline:
    "border-2 border-border bg-transparent text-card-foreground",
  ghost:
    "border border-transparent bg-muted/40 text-card-foreground",
};

export function Card({ children, padding = "md", variant = "default", className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg transition-colors",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-foreground sm:text-xl", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-4 pt-0 sm:p-6", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-4 pt-0 sm:p-6", className)}>
      {children}
    </div>
  );
}
// Requires the cn() utility from "@/lib/cn" (clsx + tailwind-merge).`;
