import * as React from "react";
import { cn } from "@/lib/cn";
import type { ItemProps } from "./Item.types";
import { ITEM_STYLES } from "./Item.constants";

export function Item({ children, variant = "default", icon, inset, disabled, selected, className, ...props }: ItemProps) {
  return (
    <div
      role={disabled ? undefined : "option"}
      aria-selected={selected}
      aria-disabled={disabled}
      className={cn(
        ITEM_STYLES.base,
        selected ? ITEM_STYLES.selected : ITEM_STYLES.default,
        disabled && ITEM_STYLES.disabled,
        inset && ITEM_STYLES.inset,
        className,
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
