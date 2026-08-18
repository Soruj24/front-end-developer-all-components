import { cn } from "@/lib/cn";
import type { NotificationProps, NotificationTitleProps, NotificationDescriptionProps } from "./Notification.types";

const variantClasses: Record<string, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
  error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
};

export function Notification({ children, variant = "info", title, onClose, className }: NotificationProps) {
  return (
    <div className={cn("relative rounded-lg border p-4", variantClasses[variant], className)}>
      {title && <NotificationTitle>{title}</NotificationTitle>}
      <NotificationDescription>{children}</NotificationDescription>
      {onClose && (
        <button type="button" onClick={onClose} className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}

export function NotificationTitle({ children, className }: NotificationTitleProps) {
  return <h4 className={cn("text-sm font-medium mb-1", className)}>{children}</h4>;
}

export function NotificationDescription({ children, className }: NotificationDescriptionProps) {
  return <div className={cn("text-sm opacity-90", className)}>{children}</div>;
}
