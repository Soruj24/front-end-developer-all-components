"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { DrawerProps } from "./Drawer.types";
import { DRAWER_STYLES } from "./Drawer.constants";

export function Drawer({ open, defaultOpen, onOpenChange, side = "right", trigger, children, title, description, closable = true, dismissible = true }: DrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); e.stopPropagation(); } };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isControlled, setInternalOpen]);

  const content = (
    <>
      {dismissible && <div className={DRAWER_STYLES.overlay} onClick={() => setOpen(false)} />}
      <div className={cn(DRAWER_STYLES.content, DRAWER_STYLES[side])} role="dialog" aria-modal="true">
        {closable && <button onClick={() => setOpen(false)} className={DRAWER_STYLES.close} aria-label="Close">×</button>}
        {title && <h2 className={DRAWER_STYLES.title}>{title}</h2>}
        {description && <p className={DRAWER_STYLES.description}>{description}</p>}
        {children}
      </div>
    </>
  );

  if (!isOpen) return trigger ? <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{trigger}</div> : null;

  return trigger ? (
    <div><div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{trigger}</div>{content}</div>
  ) : content;
}
