import { CSSProperties, HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between children. Defaults to 4 (1rem). */
  gap?: number | string;
  /** Alignment along the cross axis (default: stretch). */
  align?: CSSProperties["alignItems"];
  /** Alignment along the main axis (default: start). */
  justify?: CSSProperties["justifyContent"];
  /** Reverses the visual order of children. */
  reverse?: boolean;
}

/**
 * Premium SaaS stack: flexbox column with consistent, configurable gaps.
 * The foundational layout primitive — use everywhere instead of manual flex columns.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 4, align, justify, reverse, style, children, ...props }, ref) => {
    const gapValue = typeof gap === "number" ? `${gap * 0.25}rem` : gap;
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          reverse && "flex-row-reverse",
          className
        )}
        style={{ ...style, gap: gapValue }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Stack.displayName = "Stack";

export interface HStackProps extends StackProps {}

export const HStack = forwardRef<HTMLDivElement, HStackProps>(
  ({ className, gap = 2, align = "center", justify, reverse, ...props }, ref) => {
    const gapValue = typeof gap === "number" ? `${gap * 0.25}rem` : gap;
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          className
        )}
        style={{ gap: gapValue }}
        {...props}
      />
    );
  }
);
HStack.displayName = "HStack";

export interface VStackProps extends Omit<StackProps, "gap"> {
  gap?: number | string;
}

/** VStack — vertical stack with explicit alignment helpers. */
export const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ className, gap = 2, align = "stretch", justify = "flex-start", ...props }, ref) => {
    const gapValue = typeof gap === "number" ? `${gap * 0.25}rem` : gap;
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          align === "stretch" ? "items-stretch" : `items-${align}`,
          `justify-${justify}`,
          className
        )}
        style={{ gap: gapValue }}
        {...props}
      />
    );
  }
);
VStack.displayName = "VStack";
