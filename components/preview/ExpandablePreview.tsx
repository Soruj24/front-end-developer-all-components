"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "./icons";

interface ExpandablePreviewProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Fullscreen overlay preview. Portaled to <body>, locks scroll while open,
 * traps focus inside the dialog, and closes on Escape.
 */
export function ExpandablePreview({ open, title, onClose, children }: ExpandablePreviewProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;
      const els = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} preview`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Preview
          </span>
          <span className="font-medium">{title}</span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-6 sm:p-10">
        <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center justify-center">
          <div
            className="absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-card sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
