import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AlertVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "default"
  | "destructive";

export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style. */
  variant?: AlertVariant;
  /** Size of the alert. */
  size?: AlertSize;
  /**
   * Icon displayed before the content.
   * - `true` → show the built-in variant icon.
   * - `ReactNode` → custom icon element.
   * - `false` / omitted → no icon.
   */
  icon?: boolean | ReactNode;
  /** Show a close button that dismisses the alert. */
  dismissible?: boolean;
  /** Callback fired when the alert is dismissed. */
  onDismiss?: () => void;
  /** Action element rendered at the trailing edge. */
  action?: ReactNode;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface AlertDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Variant styles                                                     */
/* ------------------------------------------------------------------ */

const variantClasses: Record<AlertVariant, string> = {
  info: "border-info/40 bg-info/5 text-info dark:bg-info/10",
  success: "border-success/40 bg-success/5 text-success dark:bg-success/10",
  warning: "border-warning/40 bg-warning/5 text-warning dark:bg-warning/10",
  error: "border-danger/40 bg-danger/5 text-danger dark:bg-danger/10",
  default:
    "border-border bg-muted/30 text-foreground dark:bg-muted/20",
  destructive:
    "border-danger/40 bg-danger/5 text-danger dark:bg-danger/10",
};

const iconColorClasses: Record<AlertVariant, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
  default: "text-muted-foreground",
  destructive: "text-danger",
};

const builtInIcons: Record<AlertVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕",
  default: "ℹ",
  destructive: "✕",
};

const sizeClasses: Record<AlertSize, string> = {
  sm: "gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs",
  md: "gap-3 rounded-xl border px-4 py-3.5 text-sm",
  lg: "gap-4 rounded-xl border px-5 py-4 text-base",
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn(
        "font-semibold leading-snug tracking-[-0.01em]",
        className,
      )}
      {...props}
    >
      {children}
    </h5>
  );
}
AlertTitle.displayName = "AlertTitle";

function AlertDescription({
  className,
  children,
  ...props
}: AlertDescriptionProps) {
  return (
    <p
      className={cn(
        "text-[0.8125rem] leading-relaxed opacity-80",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
AlertDescription.displayName = "AlertDescription";

/* ------------------------------------------------------------------ */
/*  Close button                                                       */
/* ------------------------------------------------------------------ */

function CloseButton({
  onClick,
  size,
}: {
  onClick: () => void;
  size: AlertSize;
}) {
  const btnSize =
    size === "sm"
      ? "h-6 w-6"
      : size === "lg"
        ? "h-8 w-8"
        : "h-7 w-7";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss alert"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg",
        btnSize,
        "text-current/40 transition-all duration-150",
        "hover:bg-current/10 hover:text-current/70",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-95",
      )}
    >
      <svg
        className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Alert                                                              */
/* ------------------------------------------------------------------ */

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      size = "md",
      icon,
      dismissible = false,
      onDismiss,
      action,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [dismissed, setDismissed] = useState(false);
    const [visible, setVisible] = useState(true);

    const handleDismiss = useCallback(() => {
      setVisible(false);
      setTimeout(() => {
        setDismissed(true);
        onDismiss?.();
      }, 150);
    }, [onDismiss]);

    useEffect(() => {
      if (!dismissible) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleDismiss();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [dismissible, handleDismiss]);

    if (dismissed) return null;

    const showIcon = icon !== false && icon !== undefined;
    const isCustomIcon = typeof icon === "object" && icon !== null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative flex items-start border transition-all duration-200 ease-out",
          sizeClasses[size],
          variantClasses[variant],
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-1.5 scale-[0.98] pointer-events-none",
          className,
        )}
        {...props}
      >
        {showIcon && (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-md",
              size === "sm"
                ? "mt-px h-5 w-5 text-sm"
                : size === "lg"
                  ? "mt-0.5 h-7 w-7 text-lg"
                  : "mt-0.5 h-6 w-6 text-base",
              iconColorClasses[variant],
            )}
            aria-hidden="true"
          >
            {isCustomIcon ? icon : builtInIcons[variant]}
          </span>
        )}

        <div className="flex-1 min-w-0">{children}</div>

        {action && <div className="flex shrink-0 items-center">{action}</div>}

        {dismissible && (
          <CloseButton onClick={handleDismiss} size={size} />
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";

export { Alert, AlertTitle, AlertDescription, CloseButton };
export default Alert;
