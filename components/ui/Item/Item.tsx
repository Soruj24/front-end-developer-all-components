"use client";

import { cn } from "@/lib/cn";
import type { ItemProps } from "./Item.types";

export function Item({ icon, label, description, actions, onClick, className }: ItemProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5",
        "transition-colors duration-200",
        onClick && "cursor-pointer hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none active:bg-muted/80",
        className,
      )}
    >
      {icon && <div className="flex shrink-0 text-muted-foreground">{icon}</div>}

      <div className="flex min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-none text-foreground">{label}</p>
        {description && (
          <p className="mt-1 truncate text-xs leading-none text-muted-foreground">{description}</p>
        )}
      </div>

      {actions && <div className="flex shrink-0">{actions}</div>}
    </div>
  );
}
