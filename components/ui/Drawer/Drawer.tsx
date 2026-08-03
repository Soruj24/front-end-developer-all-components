"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  setOpen: () => {},
});

export function Drawer({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(DrawerContext);
  return <button type="button" onClick={() => setOpen(true)}>{children}</button>;
}

const sideClasses: Record<string, string> = {
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
  right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
  top: "inset-x-0 top-0 border-b",
  bottom: "inset-x-0 bottom-0 border-t",
};

export function DrawerContent({ children, className, side = "right" }: { children: ReactNode; className?: string; side?: "left" | "right" | "top" | "bottom" }) {
  const { open, setOpen } = useContext(DrawerContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className={`fixed z-50 bg-white dark:bg-zinc-900 shadow-lg transition-transform ${sideClasses[side]} ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 ${className ?? ""}`}>{children}</div>;
}

export function DrawerTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold ${className ?? ""}`}>{children}</h2>;
}

export function DrawerDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${className ?? ""}`}>{children}</p>;
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex gap-2 p-6 ${className ?? ""}`}>{children}</div>;
}
