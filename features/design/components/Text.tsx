import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "blockquote";
  variant?: "body" | "muted" | "large" | "small" | "caption";
  truncate?: boolean;
  balance?: boolean;
}

const variantClasses = {
  body: "text-base leading-7 text-foreground",
  muted: "text-sm leading-6 text-muted-foreground",
  large: "text-lg leading-relaxed text-foreground",
  small: "text-sm leading-6 text-foreground",
  caption: "text-xs font-medium text-muted-foreground",
};

export const Text = forwardRef<HTMLDivElement, TextProps>(
  ({ className, as: Tag = "p", variant = "body", truncate, balance, ...props }, ref) => {
    return (
      <Tag
        ref={ref as any}
        className={cn(
          variantClasses[variant],
          truncate && "truncate",
          balance && "text-balance",
          className
        )}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";
