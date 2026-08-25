"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { MenubarProps, MenubarItem } from "./Menubar.types";
import { MENUBAR_STYLES } from "./Menubar.constants";

export function Menubar({ items, placeholder = "Menu", className, itemClassName }: MenubarProps) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  return (
    <div className={cn("relative inline-flex", MENUBAR_STYLES.base, className)}>
      {items.map((item, idx) => (
        <div
          key={item.key}
          className="relative"
          onMouseEnter={() => setOpenIdx(idx)}
          onMouseLeave={() => setOpenIdx(null)}
        >
          <div
            className={cn(
              MENUBAR_STYLES.item,
              openIdx === idx && MENUBAR_STYLES.itemSelected,
              item.disabled && MENUBAR_STYLES.itemDisabled,
              itemClassName,
            )}
            onClick={() => { if (!item.disabled) { item.onSelect?.(); setOpenIdx(null); } }}
            aria-disabled={item.disabled}
          >
            {item.icon && <span className={MENUBAR_STYLES.icon}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.shortcut && <span className={MENUBAR_STYLES.shortcut}>{item.shortcut}</span>}
          </div>
          {openIdx === idx && (
            <div className={cn("absolute left-0 top-full z-50 mt-1 min-w-[14rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50")}>
              {item.submenu?.map((sub: MenubarItem) => (
                <div
                  key={sub.key}
                  className={cn(
                    "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-100 ease-out hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
                    sub.disabled && "pointer-events-none opacity-40",
                    itemClassName,
                  )}
                  onClick={() => { if (!sub.disabled) sub.onSelect?.(); }}
                >
                  <span className="flex-1 text-left">{sub.label}</span>
                  {sub.checked && <span className="text-primary">✓</span>}
                  {sub.shortcut && <span className={MENUBAR_STYLES.shortcut}>{sub.shortcut}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
