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

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) {
        toggle();
      }
    };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") toggle(); };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isControlled]);

  return (
    <span ref={triggerRef} className={cn(DROPDOWN_MENU_STYLES.trigger, triggerClassName)}>
      {trigger}
      {isOpen && (
        <div ref={contentRef} className={cn(DROPDOWN_MENU_STYLES.content, className)} style={{ left: 0, top: 0 }}>
          {items.map((item) => renderItem(item, toggle))}
        </div>
      )}
    </span>
  );
}

const renderItem = (item: DropdownMenuItem, close: () => void): React.ReactElement => {
  if (item.child) {
    return (
      <div key={item.key}>
        <div className={DROPDOWN_MENU_STYLES.group}>{item.label}</div>
        <div className="ml-4">
          {item.child.map((sub) => renderItem(sub, close))}
        </div>
      </div>
    );
  }

  return (
    <div
      key={item.key}
      className={cn(DROPDOWN_MENU_STYLES.item, item.disabled && DROPDOWN_MENU_STYLES.itemDisabled, item.danger && DROPDOWN_MENU_STYLES.itemDanger)}
      onClick={(e) => { e.stopPropagation(); if (!item.disabled) { item.onClick?.(); close(); } }}
      aria-disabled={item.disabled}
    >
      {item.icon && <span className={DROPDOWN_MENU_STYLES.icon}>{item.icon}</span>}
      <span>{item.label}</span>
      {item.shortcut && <span className={DROPDOWN_MENU_STYLES.shortcut}>{item.shortcut}</span>}
    </div>
  );
};
