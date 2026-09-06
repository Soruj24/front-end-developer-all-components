"use client";

import { type ReactNode, forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

const EXIT_MS = 200;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  fullscreen: "h-dvh max-h-none w-full max-w-full rounded-none sm:h-[95vh] sm:max-h-[95vh] sm:max-w-[95vw] sm:rounded-lg",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children?: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, size = "md", children }, ref) => {
    const [visible, setVisible] = useState(open);
    const [mounted, setMounted] = useState(false);
    const [closing, setClosing] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const onCloseRef = useRef(onClose);

    useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (open) {
        const rafId = requestAnimationFrame(() => {
          setVisible(true);
          setClosing(false);
        });
        return () => cancelAnimationFrame(rafId);
      }
      const closeId = requestAnimationFrame(() => setClosing(true));
      const hideId = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, EXIT_MS);
      return () => {
        cancelAnimationFrame(closeId);
        clearTimeout(hideId);
      };
    }, [open]);

    useEffect(() => {
      if (!visible) return;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }, [visible]);

    useEffect(() => {
      if (!open) return;
      const previouslyFocused = document.activeElement as HTMLElement | null;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onCloseRef.current();
          return;
        }
        if (event.key !== "Tab") return;
        const panel = panelRef.current;
        if (!panel) return;
        const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus?.();
      };
    }, [open]);

    useEffect(() => {
      if (!visible) return;
      const rafId = requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel || panel.contains(document.activeElement)) return;
        const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        (firstFocusable ?? panel).focus();
      });
      return () => cancelAnimationFrame(rafId);
    }, [visible]);

    if (!visible || !mounted) return null;

    const isFullscreen = size === "fullscreen";

    return createPortal(
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      >
        <div
          onClick={onClose}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-overlay backdrop-blur-[4px]",
            "transition-opacity duration-200 ease-out motion-reduce:transition-none",
            closing ? "opacity-0" : "animate-fade-in-fast opacity-100",
          )}
        />

        <div
          ref={panelRef}
          tabIndex={-1}
          className={cn(
            "relative z-10 flex w-full flex-col outline-none border border-border/60 bg-surface shadow-modal",
            "transition-[opacity,transform] duration-200 ease-out will-change-transform motion-reduce:transition-none",
            isFullscreen ? SIZE_CLASSES.fullscreen : cn("max-h-[calc(100dvh-1.5rem)] rounded-t-lg sm:max-h-[88vh] sm:rounded-lg", SIZE_CLASSES[size]),
            closing ? "translate-y-3 scale-[0.98] opacity-0 sm:translate-y-0" : "animate-scale-in-fast",
          )}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 z-20 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {title && (
            <header className="flex shrink-0 flex-col gap-1 pl-5 pr-12 pt-5 sm:pl-6 sm:pr-16 sm:pt-6">
              <h2 id={titleId} className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {title}
              </h2>
            </header>
          )}

          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin",
              title ? "px-5 pb-5 pt-3 sm:px-6 sm:pb-6" : "px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6",
            )}
          >
            {children}
          </div>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
