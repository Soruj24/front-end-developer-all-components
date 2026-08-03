import * as React from "react";
import { cn } from "@/lib/cn";
import type { DialogProps } from "./Dialog.types";
import { DIALOG_STYLES } from "./Dialog.constants";

const DialogContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
}>({ open: false, setOpen: () => {} });

export function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("useDialogContext must be used within Dialog");
  return ctx;
}

export function Dialog({ open, defaultOpen, onOpenChange, trigger, content: contentProp, title, description, size = "md", closable = true, overlayClassName }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  React.useEffect(() => { onOpenChange?.(isOpen); }, [isOpen, onOpenChange]);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  if (trigger) {
    return (
      <DialogContext.Provider value={{ open: isOpen, setOpen, title, description, closable }}>
        <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
          {trigger}
        </div>
        {renderContent(isOpen, contentProp, title, description, size, closable, setOpen, overlayClassName)}
      </DialogContext.Provider>
    );
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen, title, description, closable }}>
      {renderContent(isOpen, contentProp, title, description, size, closable, setOpen, overlayClassName)}
    </DialogContext.Provider>
  );
}

function renderContent(
  isOpen: boolean,
  contentProp: React.ReactNode,
  title: React.ReactNode,
  description: React.ReactNode,
  size: string,
  closable: boolean,
  setOpen: (open: boolean) => void,
  overlayClassName?: string,
) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn(DIALOG_STYLES.overlay, overlayClassName)}
        onClick={(e) => { e.stopPropagation(); }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(DIALOG_STYLES.content, DIALOG_STYLES[size], "animate-in fade-in-0 zoom-in-95")}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-50 hover:opacity-100 focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        {contentProp}
      </div>
    </>
  );
}
