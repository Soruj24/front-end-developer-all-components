import * as React from "react";
import { cn } from "@/lib/cn";
import { ALERT_STYLES } from "./Alert.constants";
import type { AlertProps } from "./Alert.types";

export function Alert({ variant = "default", size = "md", icon, action, children, className }: AlertProps) {
  const styleKey = variant;
  const sizeStyles = size === "sm" ? "p-3 text-xs" : size === "lg" ? "p-6 text-base" : "p-4 text-sm";

  return (
    <div
      role="alert"
      className={cn(ALERT_STYLES.base, ALERT_STYLES[styleKey], sizeStyles, className)}
    >
      {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
      <div className="flex-1">{children}</div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
