import { forwardRef, ReactNode, useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl" | "fullscreen";

const sizeClasses: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  fullscreen: "max-w-[95vw] h-[95vh]",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  children: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, size = "md", children }, ref) => {
    const [visible, setVisible] = useState(open);
    const [closing, setClosing] = useState(false);
    const titleId = useId();

    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
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
            "relative z-10 w-full rounded-2xl bg-surface p-6 shadow-modal transition-[opacity,transform] duration-200 ease-out",
            sizeClasses[size],
            closing
              ? "scale-95 opacity-0"
              : "scale-100 opacity-100 animate-scale-in-fast"
          )}
        >
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h2 id={titleId} className="text-lg font-semibold text-foreground">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95"
              >
                ✕
              </button>
            </div>
          )}
          {!title && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95"
            >
              ✕
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

export default Modal;
