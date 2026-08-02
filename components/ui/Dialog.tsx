import { forwardRef, ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Variant = "alert" | "confirm" | "danger";

const variantIcons: Record<Variant, string> = {
  alert: "⚠️",
  confirm: "ℹ️",
  danger: "🚫",
};

const variantButtonClasses: Record<Variant, string> = {
  alert:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  confirm:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90",
};

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  variant?: Variant;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  icon?: ReactNode;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      variant = "alert",
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      onConfirm,
      icon,
    },
    ref
  ) => {
    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    const [visible, setVisible] = useState(open);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
      if (open) {
        setVisible(true);
        setClosing(false);
      } else if (visible) {
        setClosing(true);
        const t = setTimeout(() => {
          setVisible(false);
          setClosing(false);
        }, 180);
        return () => clearTimeout(t);
      }
    }, [open, visible]);

    if (!visible) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        ref={ref}
      >
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
            closing ? "opacity-0" : "opacity-100 animate-fade-in-fast"
          )}
          onClick={onClose}
        />
        <div
          className={cn(
            "relative z-10 w-full max-w-sm rounded-xl bg-surface p-6 shadow-modal transition-[opacity,transform] duration-200 ease-out",
            closing
              ? "scale-95 opacity-0"
              : "scale-100 opacity-100 animate-scale-in-fast"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 text-3xl animate-pop">
              {icon ?? variantIcons[variant]}
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              {title}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              {description}
            </p>
            <div className="flex w-full gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted active:scale-[0.98]"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-[background-color,color,transform,box-shadow] duration-200 ease-out active:scale-[0.98] ${variantButtonClasses[variant]}`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Dialog.displayName = "Dialog";

export default Dialog;
