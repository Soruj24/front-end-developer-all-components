"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { SheetProps } from "./Sheet.types";
import { SHEET_STYLES } from "./Sheet.constants";

export function Sheet({ open, defaultOpen, onOpenChange, side = "right", size = "md", trigger, children, title, description, closable = true, overlayClassName }: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        e.stopPropagation();
      }
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isControlled, setInternalOpen]);

  const content = (
    <>
      <div className={cn(SHEET_STYLES.overlay, overlayClassName)} onClick={() => setOpen(false)} />
      <div
        ref={panelRef}
        className={cn(
          SHEET_STYLES.content,
          SHEET_STYLES[side],
          SHEET_STYLES[size] !== SHEET_STYLES.full ? SHEET_STYLES[size] : "",
        )}
        role="dialog"
        aria-modal="true"
      >
        {closable && (
          <button onClick={() => setOpen(false)} className={SHEET_STYLES.close} aria-label="Close">
            ×
          </button>
        )}
        {title && <h2 className={SHEET_STYLES.title}>{title}</h2>}
        {description && <p className={SHEET_STYLES.description}>{description}</p>}
        {children}
      </div>
    </>
  );

  if (!isOpen) return trigger ? <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{trigger}</div> : null;

  return trigger ? (
    <div>
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">{trigger}</div>
      {content}
    </div>
  ) : content;
}
