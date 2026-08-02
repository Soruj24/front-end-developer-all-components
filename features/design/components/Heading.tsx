import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  balance?: boolean;
}

const sizeClasses = {
  1: "text-3xl sm:text-4xl lg:text-5xl",
  2: "text-2xl sm:text-3xl lg:text-4xl",
  3: "text-xl sm:text-2xl lg:text-2.5xl",
  4: "text-lg sm:text-xl",
  5: "text-base sm:text-lg",
  6: "text-sm sm:text-base",
};

const weightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const HeadingMap = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

/**
 * Premium SaaS heading with consistent hierarchy and perfect spacing.
 * Default weight is semibold for a clean, confident typographic voice.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Level = 2, size, weight = "semibold", balance, children, ...props }, ref) => {
    const visualSize = size ?? Level;
    const Tag = HeadingMap[Level];
    return (
      <Tag
        ref={ref}
        className={cn(
          "text-foreground font-semibold tracking-tight",
          sizeClasses[visualSize],
          weightClasses[weight !== "semibold" ? weight : "semibold"],
          balance && "text-balance",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
Heading.displayName = "Heading";
