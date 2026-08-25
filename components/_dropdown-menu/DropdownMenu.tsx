"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { DropdownMenuProps, DropdownMenuItem } from "./DropdownMenu.types";
import { DROPDOWN_MENU_STYLES } from "./DropdownMenu.constants";

export function DropdownMenu({ trigger, items, open, defaultOpen, onOpenChange, align = "end", triggerClassName, className }: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const close = React.useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current && !contentRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isControlled, close]);

  const alignClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";

  return (
    <span ref={triggerRef} className={cn(DROPDOWN_MENU_STYLES.trigger, triggerClassName)}>
      {trigger}
      <div
        ref={contentRef}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          DROPDOWN_MENU_STYLES.content,
          "pointer-events-none absolute z-50 mt-1.5",
          "data-[state=open]:pointer-events-auto",
          alignClass,
          className,
        )}
        style={{ left: align === "end" ? undefined : 0, top: "100%" }}
      >
        {items.map((item) => renderItem(item, close))}
      </div>
    </span>
  );
}

const renderItem = (item: DropdownMenuItem, close: () => void): React.ReactElement => {
  if (item.child) {
    return (
      <div key={item.key}>
        <div className={DROPDOWN_MENU_STYLES.group}>{item.label}</div>
        <div className="ml-2">
          {item.child.map((sub) => renderItem(sub, close))}
        </div>
      </div>
    );
  }

  return (
    <div
      key={item.key}
      className={cn(
        DROPDOWN_MENU_STYLES.item,
        item.disabled && DROPDOWN_MENU_STYLES.itemDisabled,
        item.danger && DROPDOWN_MENU_STYLES.itemDanger,
      )}
      onClick={(e) => { e.stopPropagation(); if (!item.disabled) { item.onClick?.(); close(); } }}
      role="menuitem"
      aria-disabled={item.disabled}
    >
      {item.icon && <span className={DROPDOWN_MENU_STYLES.icon}>{item.icon}</span>}
      <span className="flex-1">{item.label}</span>
      {item.shortcut && <span className={DROPDOWN_MENU_STYLES.shortcut}>{item.shortcut}</span>}
    </div>
  );
};
