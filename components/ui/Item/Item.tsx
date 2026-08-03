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
        "flex items-center gap-3 rounded-md px-3 py-2",
        onClick && "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className,
      )}
    >
      {icon && <div className="flex-shrink-0 text-muted-foreground">{icon}</div>}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none truncate">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 truncate">{description}</p>
        )}
      </div>

      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
}
