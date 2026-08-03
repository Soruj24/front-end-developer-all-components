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
            <div className={cn("absolute left-0 top-full mt-1", MENUBAR_STYLES.base.replace("bg-gray-100 dark:bg-gray-800", "border border-border bg-popover"))}>
              {item.submenu?.map((sub: MenubarItem) => (
                <div
                  key={sub.key}
                  className={cn(MENUBAR_STYLES.item, itemClassName)}
                  onClick={() => { if (!sub.disabled) sub.onSelect?.(); }}
                >
                  {sub.label}
                  {sub.checked && <span>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
