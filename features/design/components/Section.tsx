import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section padding scale. Defaults to "lg". */
  padding?: "sm" | "md" | "lg" | "xl" | "none";
  /** Constrains content to the container max-width. */
  container?: boolean;
  /** Container size when `container` is used. */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  /** Soft background tint — use for distinct visual sections. */
  tinted?: boolean;
}

const paddingClasses: Record<NonNullable<SectionProps["padding"]>, string> = {
  none: "py-0",
  sm: "py-8 sm:py-10",
  md: "py-10 sm:py-14",
  lg: "py-14 sm:py-20",
  xl: "py-20 sm:py-28",
};

const maxWidths = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "3xl": "max-w-[1200px]",
  "4xl": "max-w-[1400px]",
  "5xl": "max-w-[1600px]",
  "6xl": "max-w-[1800px]",
};

/** Premium SaaS section: responsive padding, optional container constraint, soft divider. */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, padding = "lg", container = true, size = "6xl", tinted, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full",
          paddingClasses[padding],
          container && "mx-auto",
          container && maxWidths[size],
          "px-4 sm:px-6 lg:px-8",
          tinted && "bg-muted/30",
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";
