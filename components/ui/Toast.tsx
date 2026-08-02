import { forwardRef } from "react";

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
  success: "border-success",
  error: "border-danger",
  warning: "border-warning",
  info: "border-info",
};

const typeIconClasses: Record<ToastType, string> = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-info",
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
        className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 min-w-[18rem] max-w-sm rounded-lg border-l-4 px-4 py-3 bg-surface text-foreground shadow-toast animate-in slide-in-from-top-2 ${typeClasses[toast.type]}`}
          >
            <span className={`text-base font-bold ${typeIconClasses[toast.type]}`}>{typeIcons[toast.type]}</span>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="whitespace-nowrap text-sm font-semibold underline underline-offset-2"
              >
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => onDismiss(toast.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100"
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
