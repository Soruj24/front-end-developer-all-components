"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { ContextMenuProps, ContextMenuItem } from "./ContextMenu.types";
import { CONTEXT_MENU_STYLES } from "./ContextMenu.constants";

export function ContextMenu({ children, items, trigger = "rightClick", triggerDelay = 500, open, defaultOpen, onOpenChange, overlayClassName, itemClassName }: ContextMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const pressTimer = React.useRef<NodeJS.Timeout | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger === "rightClick") {
      e.preventDefault();
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isControlled) setInternalOpen(true);
      onOpenChange?.(true);
    }
  };

  const handleTouchStart = () => {
    if (trigger === "longPress") {
      pressTimer.current = setTimeout(() => {
        setInternalOpen(true);
        onOpenChange?.(true);
      }, triggerDelay);
    }
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node) && isOpen) {
        if (!isControlled) setInternalOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isControlled, onOpenChange]);

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {isOpen && (
        <>
          <div className={cn(CONTEXT_MENU_STYLES.overlay, overlayClassName)} />
          <div
            className={cn(CONTEXT_MENU_STYLES.content, itemClassName)}
            style={{ left: coords.x, top: coords.y }}
            role="menu"
          >
            {items.map((item, i) => renderItem(item, () => {
              if (!isControlled) setInternalOpen(false);
              onOpenChange?.(false);
            }, i))}
          </div>
        </>
      )}
    </div>
  );
}

const renderItem = (item: ContextMenuItem, close: () => void, idx: number): React.ReactElement => {
  const key = item.key ?? String(idx);
  const isDanger = item.danger || item.dangerous;

  if (item.divider) {
    return <div key={key} className={CONTEXT_MENU_STYLES.separator} />;
  }

  const children = item.child ?? item.children;
  if (children) {
    return (
      <div key={key}>
        <div className={CONTEXT_MENU_STYLES.group}>{item.label}</div>
        <div className="ml-4">
          {children.map((sub, si) => renderItem(sub, close, si))}
        </div>
      </div>
    );
  }

  return (
    <div
      key={key}
      className={cn(
        CONTEXT_MENU_STYLES.item,
        item.disabled && CONTEXT_MENU_STYLES.itemDisabled,
        isDanger && CONTEXT_MENU_STYLES.itemDangerous,
      )}
      onClick={(e) => { e.stopPropagation(); if (!item.disabled) { item.onClick?.(); close(); } }}
      aria-disabled={item.disabled}
      role="menuitem"
    >
      {item.icon && <span className={CONTEXT_MENU_STYLES.icon}>{item.icon}</span>}
      <span>{item.label}</span>
      {item.shortcut && <span className={CONTEXT_MENU_STYLES.shortcut}>{item.shortcut}</span>}
    </div>
  );
};
