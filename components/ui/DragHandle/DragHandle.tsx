"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { DragHandleProps, DragItemProps, DragHandleVariant, DragHandleSize } from "./DragHandle.types";

const VARIANT_ICONS: Record<DragHandleVariant, (props: { className?: string }) => ReactNode> = {
  vertical: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
      <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
      <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
    </svg>
  ),
  horizontal: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="5" cy="9" r="1" /><circle cx="5" cy="15" r="1" />
      <circle cx="12" cy="9" r="1" /><circle cx="12" cy="15" r="1" />
      <circle cx="19" cy="9" r="1" /><circle cx="19" cy="15" r="1" />
    </svg>
  ),
  dots: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  arrows: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12l7-7 7 7" />
    </svg>
  ),
  grid: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
};

const SIZE_CLASSES: Record<DragHandleSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const DragHandle = forwardRef<HTMLButtonElement, DragHandleProps>(
  ({ variant = "vertical", size = "md", label = "Drag handle", className, disabled, ...props }, ref) => {
    const Icon = VARIANT_ICONS[variant];
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-disabled={disabled}
        disabled={disabled}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-all duration-150",
          "hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "active:bg-muted/80 active:scale-95",
          "cursor-grab active:cursor-grabbing",
          "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
          size === "sm" && "p-0.5",
          size === "md" && "p-1",
          size === "lg" && "p-1.5",
          className,
        )}
        {...props}
      >
        <Icon className={cn(SIZE_CLASSES[size], "shrink-0")} />
      </button>
    );
  },
);

DragHandle.displayName = "DragHandle";

function DragItem({
  children,
  variant = "vertical",
  size = "md",
  disabled = false,
  className,
}: DragItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border/60 bg-background px-3 py-2.5 shadow-sm transition-all duration-150",
        "hover:border-border hover:shadow-md",
        disabled && "opacity-50",
        className,
      )}
    >
      <DragHandle variant={variant} size={size} disabled={disabled} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export { DragHandle, DragItem };
