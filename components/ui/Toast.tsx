import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ToastType = "success" | "error" | "warning" | "info";
type Position =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center";

const typeIcons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const typeClasses: Record<ToastType, string> = {
  success: "border-success/60",
  error: "border-danger/60",
  warning: "border-warning/60",
  info: "border-info/60",
};

const typeIconClasses: Record<ToastType, string> = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-info",
};

const typeBgClasses: Record<ToastType, string> = {
  success: "bg-success/5",
  error: "bg-danger/5",
  warning: "bg-warning/5",
  info: "bg-info/5",
};

const positionClasses: Record<Position, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
};

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  action?: { label: string; onClick: () => void };
}

export interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  position?: Position;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ toasts, onDismiss, position = "top-right" }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("fixed z-50 flex flex-col gap-2", positionClasses[position])}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-3 min-w-[18rem] max-w-sm",
              "rounded-lg border-l-4 px-4 py-3",
              "bg-card text-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
              "animate-in slide-in-from-top-2 duration-300",
              typeClasses[toast.type],
              typeBgClasses[toast.type],
            )}
          >
            <span className={cn("text-base font-bold", typeIconClasses[toast.type])}>
              {typeIcons[toast.type]}
            </span>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => onDismiss(toast.id)}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-md",
                "text-muted-foreground transition-colors duration-150",
                "hover:bg-muted hover:text-foreground",
              )}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    );
  }
);
Toast.displayName = "Toast";

export default Toast;
