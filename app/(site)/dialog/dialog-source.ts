// Auto-generated from components/ui/Dialog.tsx — keep in sync.
export const DIALOG_SOURCE = `"use client";

import { type ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  setOpen: () => {},
});

const EXIT_MS = 200;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen } = useContext(DialogContext);
  return (
    <button type="button" className={className} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1.5 text-left", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-base font-semibold tracking-tight sm:text-lg", className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mt-2 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen } = useContext(DialogContext);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Portals need a real document; also keeps SSR output stable. */
  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* Enter/exit lifecycle: deferred callbacks let the exit animation play. */
  useEffect(() => {
    if (!open) {
      const hideId = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, EXIT_MS);
      return () => clearTimeout(hideId);
    }
    const showId = requestAnimationFrame(() => setVisible(true));
    const resetId = requestAnimationFrame(() => setClosing(false));
    return () => {
      cancelAnimationFrame(showId);
      cancelAnimationFrame(resetId);
    };
  }, [open]);

  /* Lock background scroll while the dialog is shown. */
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  /* Close on Escape while open; restore focus on close. */
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, setOpen]);

  /* Move focus into the panel once it has actually mounted. */
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

  /* Portal to <body>: transformed ancestors would otherwise break fixed positioning. */
  return createPortal(
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-overlay backdrop-blur-[4px]",
          "transition-opacity duration-200 ease-out motion-reduce:transition-none",
          closing ? "opacity-0" : "animate-fade-in-fast opacity-100",
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col outline-none",
          "rounded-xl border border-border bg-surface shadow-modal",
          "ring-1 ring-black/[0.02] dark:ring-white/[0.04]",
          "transition-[opacity,transform] duration-200 ease-out will-change-transform motion-reduce:transition-none",
          closing ? "scale-[0.98] opacity-0" : "animate-scale-in-fast",
          className,
        )}
      >
        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 scrollbar-thin sm:p-6">{children}</div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}
`;
