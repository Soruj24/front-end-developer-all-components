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
  info: "border-l-info bg-info-soft text-foreground",
  success: "border-l-success bg-success-soft text-foreground",
  warning: "border-l-warning bg-warning-soft text-foreground",
  error: "border-l-danger bg-danger-soft text-foreground",
  default: "border-l-muted-foreground/40 bg-muted/50 text-foreground",
  destructive: "border-l-danger bg-danger-soft text-foreground",
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
  sm: "gap-2 rounded-md border-l-[3px] px-3 py-2 text-xs",
  md: "gap-3 rounded-lg border-l-4 px-4 py-3 text-sm",
  lg: "gap-4 rounded-xl border-l-4 px-6 py-5 text-base",
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn("font-semibold leading-none tracking-tight", className)}
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
      className={cn("text-sm leading-relaxed opacity-90", className)}
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
  const btnSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss alert"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md",
        btnSize,
        "text-current/50 transition-colors",
        "hover:bg-current/10 hover:text-current",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <svg
        className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")}
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
      }, 200);
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
          "flex items-start border-l transition-all duration-200",
          sizeClasses[size],
          variantClasses[variant],
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none",
          className,
        )}
        {...props}
      >
        {showIcon && (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center font-semibold",
              size === "sm" ? "mt-px text-sm" : size === "lg" ? "mt-0.5 text-lg" : "mt-0.5 text-base",
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
