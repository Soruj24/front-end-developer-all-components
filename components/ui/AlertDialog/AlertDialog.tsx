"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { AlertDialogProps } from "./AlertDialog.types";

const ANIM_MS = 200;

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  variant = "default",
  className,
}: AlertDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Mount / unmount lifecycle with animated transitions
  /* eslint-disable react-hooks/set-state-in-effect -- animation lifecycle: mount/unmount timed to CSS transitions */
  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(raf);
    }
    if (mounted) {
      setEntered(false);
      timerRef.current = setTimeout(() => setMounted(false), ANIM_MS);
      return () => clearTimeout(timerRef.current);
    }
  }, [open, mounted]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Escape key
  useEffect(() => {
    if (!open || !mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, mounted, close]);

  // Body scroll lock
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      data-state={entered ? "open" : "closed"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-dialog-title"
      aria-describedby={description ? "alert-dialog-desc" : undefined}
    >
      <div
        ref={overlayRef}
        onClick={close}
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-200",
          entered ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cn(
          "relative z-10 w-full max-w-lg",
          "rounded-xl border border-border bg-background p-6 shadow-xl",
          "transition-all duration-200 ease-out",
          entered
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2",
          "sm:rounded-2xl",
          className,
        )}
      >
        <div className="flex flex-col gap-2">
          <h2
            id="alert-dialog-title"
            className="text-lg font-semibold leading-none tracking-tight text-foreground"
          >
            {title}
          </h2>
          {description && (
            <p
              id="alert-dialog-desc"
              className="text-sm text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={close}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md px-4",
              "border border-border bg-background text-sm font-medium text-foreground",
              "transition-colors hover:bg-muted active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "sm:h-10",
            )}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              close();
            }}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md px-4",
              "text-sm font-medium text-primary-foreground",
              "transition-colors active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "sm:h-10",
              variant === "destructive"
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90",
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
