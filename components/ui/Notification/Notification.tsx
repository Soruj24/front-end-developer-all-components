import { cn } from "@/lib/cn";
import type { NotificationProps, NotificationTitleProps, NotificationDescriptionProps } from "./Notification.types";

const variantClasses: Record<string, string> = {
  info: "border-info/30 bg-info/5 text-info-foreground",
  success: "border-success/30 bg-success/5 text-success-foreground",
  warning: "border-warning/30 bg-warning/5 text-warning-foreground",
  error: "border-danger/30 bg-danger/5 text-danger-foreground",
};

const iconClasses: Record<string, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
};

export function Notification({ children, variant = "info", title, onClose, className }: NotificationProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border p-4",
        "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
        "animate-in fade-in-0 slide-in-from-top-1 duration-200",
        variantClasses[variant],
        className,
      )}
    >
      {title && <NotificationTitle variant={variant}>{title}</NotificationTitle>}
      <NotificationDescription>{children}</NotificationDescription>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute right-3 top-3 rounded-md p-1",
            "text-muted-foreground transition-colors duration-150",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          )}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function NotificationTitle({ children, className, variant = "info" }: NotificationTitleProps & { variant?: string }) {
  return (
    <h4 className={cn("text-sm font-semibold mb-1", className)}>
      {children}
    </h4>
  );
}

export function NotificationDescription({ children, className }: NotificationDescriptionProps) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </div>
  );
}
