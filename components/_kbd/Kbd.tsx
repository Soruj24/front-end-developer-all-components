import * as React from "react";
import { cn } from "@/lib/cn";
import type { KbdProps } from "./Kbd.types";
import { KBD_STYLES, KBD_VARIANT_STYLES } from "./Kbd.constants";

export function Kbd({ children, variant = "default", size = "md", className }: KbdProps) {
  return (
    <kbd
      className={cn(
        KBD_STYLES.base,
        KBD_STYLES[size],
        KBD_VARIANT_STYLES[variant],
        "rounded",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
