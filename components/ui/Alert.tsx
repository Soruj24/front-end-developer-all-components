import { HTMLAttributes, forwardRef, useState } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info bg-info-soft text-foreground",
  success: "border-success bg-success-soft text-foreground",
  warning: "border-warning bg-warning-soft text-foreground",
  error: "border-danger bg-danger-soft text-foreground",
};

const variantIconClasses: Record<AlertVariant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
};

const variantIcons: Record<AlertVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  dismissible?: boolean;
  icon?: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "info", dismissible, icon = true, children, ...props }, ref) => {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;
    return (
      <div
        ref={ref}
        role="alert"
        className={`flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 text-sm ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {icon && <span className={`mt-0.5 text-base font-bold ${variantIconClasses[variant]}`}>{variantIcons[variant]}</span>}
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="flex h-5 w-5 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export default Alert;
export { Alert };
