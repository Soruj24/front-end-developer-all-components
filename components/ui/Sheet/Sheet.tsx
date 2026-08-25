"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { SheetProps, SheetSide, SheetSize } from "./Sheet.types";

const SIDE_CLASSES: Record<SheetSide, string> = {
  left: "inset-y-0 left-0 h-full w-80 max-w-[85vw] border-r rounded-r-2xl",
  right: "inset-y-0 right-0 h-full w-80 max-w-[85vw] border-l rounded-l-2xl",
  top: "inset-x-0 top-0 w-full max-h-[85vh] border-b rounded-b-2xl",
  bottom: "inset-x-0 bottom-0 w-full max-h-[85vh] border-t rounded-t-2xl",
};

const SIZE_CLASSES: Record<SheetSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "inset-0 h-full w-full max-w-none rounded-none",
};

const SLIDE_CLASSES: Record<SheetSide, string> = {
  left: "-translate-x-full data-[state=open]:translate-x-0",
  right: "translate-x-full data-[state=open]:translate-x-0",
  top: "-translate-y-full data-[state=open]:translate-y-0",
  bottom: "translate-y-full data-[state=open]:translate-y-0",
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  size = "md",
  trigger,
  children,
  title,
  description,
  closable = true,
  className,
  overlayClassName,
}: SheetProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const triggerNode = trigger ? (
    <div
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setOpen(true);
      }}
      role="button"
      tabIndex={0}
      className="inline-block cursor-pointer"
    >
      {trigger}
    </div>
  ) : null;

  if (!isOpen || !mounted) return triggerNode;

  const sheetContent = (
    <div className="fixed inset-0 z-50">
      <div
        className={cn(
          "fixed inset-0 bg-overlay backdrop-blur-sm",
          isOpen ? "animate-in fade-in-0" : "animate-out fade-out-0",
          overlayClassName,
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        data-state={isOpen ? "open" : "closed"}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={cn(
          "fixed z-50 flex flex-col bg-card shadow-xl ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          "border-border/60",
          "duration-300 ease-out",
          isOpen ? "data-[state=open]:animate-in" : "data-[state=closed]:animate-out",
          SIDE_CLASSES[side],
          size !== "full" && side !== "full" ? SIZE_CLASSES[size] : "",
          SLIDE_CLASSES[side],
          side === "left" && "slide-in-from-left",
          side === "right" && "slide-in-from-right",
          side === "top" && "slide-in-from-top",
          side === "bottom" && "slide-in-from-bottom",
          side === "left" && "slide-out-to-left",
          side === "right" && "slide-out-to-right",
          side === "top" && "slide-out-to-top",
          side === "bottom" && "slide-out-to-bottom",
          size === "full" && SIZE_CLASSES.full,
          className,
        )}
      >
        {(title || description || closable) && (
          <div className="flex flex-col gap-1 border-b border-border/60 px-6 pt-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              {title && (
                <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              {closable && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    "text-muted-foreground transition-all duration-150 ease-out",
                    "hover:bg-muted hover:text-foreground active:scale-90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "disabled:pointer-events-none disabled:opacity-50",
                  )}
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );

  return (
    <>
      {triggerNode}
      {createPortal(sheetContent, document.body)}
    </>
  );
}
