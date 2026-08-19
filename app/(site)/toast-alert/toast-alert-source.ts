export const TOAST_ALERT_SOURCE = `"use client";

import { CheckCircle, XCircle, AlertCircle, Info, X, type LucideIcon } from "lucide-react";

export type ToastAlertVariant = "success" | "error" | "warning" | "info";

export interface ToastAlertProps {
  variant?: ToastAlertVariant;
  message: string;
  onClose?: () => void;
}

const variantStyles: Record<ToastAlertVariant, { icon: LucideIcon; className: string }> = {
  success: { icon: CheckCircle, className: "border-green-500/50 bg-green-500/10 text-green-700" },
  error: { icon: XCircle, className: "border-red-500/50 bg-red-500/10 text-red-700" },
  warning: { icon: AlertCircle, className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700" },
  info: { icon: Info, className: "border-blue-500/50 bg-blue-500/10 text-blue-700" },
};

export function ToastAlert({ variant = "success", message, onClose }: ToastAlertProps) {
  const { icon: Icon, className } = variantStyles[variant];
  return (
    <div className={\`flex items-center gap-3 rounded-lg border p-4 \${className}\`}>
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      {onClose && (
        <button type="button" onClick={onClose} className="shrink-0 hover:opacity-70">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}`;
