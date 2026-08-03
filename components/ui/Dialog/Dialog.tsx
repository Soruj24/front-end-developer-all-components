"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  setOpen: () => {},
});

export function Dialog({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(DialogContext);
  return <button type="button" onClick={() => setOpen(true)}>{children}</button>;
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className={`relative z-50 max-h-[85vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900 ${className ?? ""}`}>
        {children}
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className ?? ""}`}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold leading-none tracking-tight ${className ?? ""}`}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-zinc-500 dark:text-zinc-400 ${className ?? ""}`}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className ?? ""}`}>{children}</div>;
}
