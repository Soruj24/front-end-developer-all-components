import * as React from "react";
import { cn } from "@/lib/cn";
import type { BubbleProps } from "./Bubble.types";
import { BUBBLE_STYLES } from "./Bubble.constants";

export function Bubble({
  children,
  variant = "default",
  size = "md",
  icon,
  tail = true,
  className,
  ...props
}: BubbleProps) {
  return (
    <div
      className={cn(
        BUBBLE_STYLES.base,
        BUBBLE_STYLES[size],
        BUBBLE_STYLES[variant],
        tail && "rounded-bl-md",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex-shrink-0 text-current/70">{icon}</span>
      )}
      <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}
