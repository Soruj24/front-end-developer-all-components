import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ComponentSize } from "@/features/design/types";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: Extract<ComponentSize, "sm" | "md" | "lg" | "xl">;
  /** When true, the container spans the full viewport width without max-width. */
  fluid?: boolean;
  /** Reduces horizontal padding on mobile, adds generous gutters on desktop. */
  tight?: boolean;
}

const maxWidths: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
};

/** Premium SaaS container: centered, max-width controlled, responsive gutters. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", fluid, tight, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          fluid ? "px-4 sm:px-6" : "px-4 sm:px-6 lg:px-8",
          !fluid && !tight && "xl:px-0",
          !fluid && maxWidths[size],
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";
