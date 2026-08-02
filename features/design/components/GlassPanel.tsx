import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Intensity of the blur effect. */
  blur?: "sm" | "md" | "lg";
  /** Whether the panel has a border. */
  bordered?: boolean;
  /** Subtle hover lift on interactive panels. */
  interactive?: boolean;
  /** Shadow preset. */
  shadow?: "sm" | "md" | "card" | "none";
}

const blurClasses = {
  sm: "backdrop-blur",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-xl",
};

/**
 * Premium SaaS floating panel with glassmorphism.
 *
 * Perfect for cards, modals, popovers, and settings panels.
 * Subtly elevated with soft borders and theme-aware transparency.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, blur = "md", bordered = true, interactive, shadow = "card", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-background/70",
          bordered && "border border-border",
          blur && blurClasses[blur],
          shadow !== "none" && `shadow-${shadow}`,
          interactive &&
            "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-md",
          className
        )}
        {...props}
      />
    );
  }
);
GlassPanel.displayName = "GlassPanel";
