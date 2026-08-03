import * as React from "react";
import { cn } from "@/lib/cn";
import type { LabelProps } from "./Label.types";
import { LABEL_STYLES } from "./Label.constants";

export function Label({ children, variant = "default", size = "md", required, disabled, className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        LABEL_STYLES.base,
        LABEL_STYLES[size],
        LABEL_STYLES[variant],
        required && LABEL_STYLES.required,
        disabled && LABEL_STYLES.disabled,
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
