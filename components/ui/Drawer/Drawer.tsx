"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  setOpen: () => {},
});

export function Drawer({
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

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setOpen } = useContext(DrawerContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200",
        "hover:bg-muted hover:border-border",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        "active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}

const sideStyles = {
  left: {
    panel: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
    slide: "slide-in-from-left",
  },
  right: {
    panel: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
    slide: "slide-in-from-right",
  },
  top: {
    panel: "inset-x-0 top-0 border-b",
    slide: "slide-in-from-top",
  },
  bottom: {
    panel: "inset-x-0 bottom-0 border-t",
    slide: "slide-in-from-bottom",
  },
} as const;

export function DrawerContent({
  children,
  className,
  side = "right",
}: {
  children: ReactNode;
  className?: string;
  side?: "left" | "right" | "top" | "bottom";
}) {
  const { open, setOpen } = useContext(DrawerContext);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    },
    [setOpen],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleEscape]);

  if (!open) return null;

  const { panel, slide } = sideStyles[side];

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in-0"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed z-50 flex flex-col bg-card shadow-xl",
          "animate-in duration-300 ease-out fill-mode-forwards",
          panel,
          slide,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border px-6 py-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DrawerTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-base font-semibold text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DrawerDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-1 text-sm text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DrawerFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-border px-6 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DrawerClose({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { setOpen } = useContext(DrawerContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className={cn(
        "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        className,
      )}
      aria-label="Close drawer"
    >
      {children ?? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </button>
  );
}
