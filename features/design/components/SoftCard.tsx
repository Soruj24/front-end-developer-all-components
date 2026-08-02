import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface SoftCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Interaction variant. */
  interactive?: boolean;
  /** Padding scale. */
  p?: "sm" | "md" | "lg" | "xl";
  /** Border variant. */
  border?: "default" | "none";
}

const paddingClasses = {
  sm: "p-3",
  md: "p-4 sm:p-5",
  lg: "p-5 sm:p-6",
  xl: "p-6 sm:p-8",
};

/**
 * Premium SaaS card with minimal shadow, soft border, and subtle hover lift.
 *
 * Combines the design system's card shadow with smooth transitions.
 * Use for content grouping, feature highlights, and data displays.
 */
export const SoftCard = forwardRef<HTMLDivElement, SoftCardProps>(
  ({ className, interactive = false, p = "md", border = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-surface",
          border !== "none" && "border border-border",
          border === "none" && "border border-transparent",
          paddingClasses[p],
          "shadow-xs",
          interactive &&
            "cursor-pointer transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-md active:scale-[0.99]",
          className
        )}
        {...props}
      />
    );
  }
);
SoftCard.displayName = "SoftCard";
