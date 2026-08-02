import { forwardRef, ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Side = "left" | "right";
type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "w-72",
  md: "w-96",
  lg: "w-[28rem]",
};

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: Side;
  size?: Size;
  children: ReactNode;
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, title, side = "right", size = "md", children }, ref) => {
    const [visible, setVisible] = useState(open);
    const [closing, setClosing] = useState(false);

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
        }, 260);
        return () => clearTimeout(t);
      }
    }, [open, visible]);

    if (!visible) return null;

    const hiddenFrom = side === "right" ? "translate-x-full" : "-translate-x-full";

    return (
      <div className="fixed inset-0 z-50" ref={ref}>
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            closing ? "opacity-0" : "opacity-100 animate-[fade-in_0.3s_ease-out]"
          )}
          onClick={onClose}
        />
        <div
          className={cn(
            "fixed top-0 flex h-full flex-col bg-surface shadow-modal transition-transform duration-300 ease-out",
            side === "right" ? "right-0" : "left-0",
            sizeClasses[size],
            closing ? hiddenFrom : "translate-x-0"
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            {title && (
              <h2 className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    );
  }
);
Drawer.displayName = "Drawer";

export default Drawer;
