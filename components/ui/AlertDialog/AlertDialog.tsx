"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { AlertDialogProps } from "./AlertDialog.types";

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

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50"
        onClick={close}
      />
      <div
        role="alertdialog"
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg border bg-white p-6 shadow-lg dark:bg-zinc-900",
          className
        )}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              close();
            }}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium text-white",
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
