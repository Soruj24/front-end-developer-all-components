"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/Alert";

/* ------------------------------------------------------------------ */
/*  Source code string                                                 */
/* ------------------------------------------------------------------ */

const ALERT_SOURCE = `import {
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
   * - \`true\` → show the built-in variant icon.
   * - \`ReactNode\` → custom icon element.
   * - \`false\` / omitted → no icon.
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
  const btnSize =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

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
              size === "sm"
                ? "mt-px text-sm"
                : size === "lg"
                  ? "mt-0.5 text-lg"
                  : "mt-0.5 text-base",
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
export default Alert;`;

/* ------------------------------------------------------------------ */
/*  Example code strings                                               */
/* ------------------------------------------------------------------ */

const VARIANTS_CODE = `<Alert variant="info">Your email has been verified.</Alert>
<Alert variant="success">Changes saved successfully.</Alert>
<Alert variant="warning">Trial expires in 3 days.</Alert>
<Alert variant="error">Payment declined.</Alert>
<Alert variant="default">A neutral system message.</Alert>`;

const SIZES_CODE = `<Alert variant="info" size="sm">Compact notification.</Alert>
<Alert variant="info" size="md">Standard message.</Alert>
<Alert variant="info" size="lg">Large, prominent alert.</Alert>`;

const DISMISSIBLE_CODE = `<Alert variant="info" dismissible onDismiss={() => {}}>
  A new software update is available.
</Alert>`;

const WITH_ICON_CODE = `<Alert variant="success" icon>
  <AlertTitle>Deployment complete</AlertTitle>
  <AlertDescription>v2.4.1 is now live in production.</AlertDescription>
</Alert>`;

const CUSTOM_ICON_CODE = `<Alert variant="warning" icon={<RocketIcon />}>
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>AI-powered search is now in beta.</AlertDescription>
</Alert>`;

const TITLE_DESC_CODE = `<Alert variant="error" icon>
  <AlertTitle>Authentication failed</AlertTitle>
  <AlertDescription>
    Please check your credentials and try again.
    If the problem persists, contact support.
  </AlertDescription>
</Alert>`;

const ACTION_CODE = `<Alert variant="warning" icon action={<button>Upgrade</button>}>
  Storage quota 90% full. Upgrade for more space.
</Alert>`;

const REAL_WORLD_CODE = `<Alert variant="success" icon dismissible>
  <AlertTitle>Order confirmed</AlertTitle>
  <AlertDescription>
    Your order #38291 has been placed. Estimated delivery: Thursday.
  </AlertDescription>
</Alert>`;

/* ------------------------------------------------------------------ */
/*  SVG icons for examples                                             */
/* ------------------------------------------------------------------ */

function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AlertPage() {
  return (
    <ComponentDocPage
      name="Alert"
      category="Feedback"
      description="Displays a brief, important message with optional icon, title, description, and dismiss action. Use alerts to convey status updates, warnings, or error messages."
    >
      <PreviewPanel filename="alert-preview.tsx">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Alert variant="info" icon>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>System updates are available for download.</AlertDescription>
          </Alert>
          <Alert variant="success" icon>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your profile has been updated.</AlertDescription>
          </Alert>
          <Alert variant="warning" icon>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Your trial expires in 3 days.</AlertDescription>
          </Alert>
          <Alert variant="error" icon>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Unable to connect to the server.</AlertDescription>
          </Alert>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={ALERT_SOURCE} filename="components/ui/Alert.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Six visual styles for different message types." code={VARIANTS_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="info" icon><AlertTitle>Info</AlertTitle><AlertDescription>Your email has been verified.</AlertDescription></Alert>
            <Alert variant="success" icon><AlertTitle>Success</AlertTitle><AlertDescription>Changes saved successfully.</AlertDescription></Alert>
            <Alert variant="warning" icon><AlertTitle>Warning</AlertTitle><AlertDescription>Trial expires in 3 days.</AlertDescription></Alert>
            <Alert variant="error" icon><AlertTitle>Error</AlertTitle><AlertDescription>Payment declined.</AlertDescription></Alert>
            <Alert variant="default"><AlertTitle>Default</AlertTitle><AlertDescription>A neutral system message.</AlertDescription></Alert>
            <Alert variant="destructive" icon><AlertTitle>Destructive</AlertTitle><AlertDescription>This action cannot be undone.</AlertDescription></Alert>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Small, medium, and large options." code={SIZES_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="info" size="sm" icon>Compact notification for tight spaces.</Alert>
            <Alert variant="info" size="md" icon>Standard message — the default size.</Alert>
            <Alert variant="info" size="lg" icon>Large, prominent alert for critical notices.</Alert>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Dismissible" description="Close button and Escape key support." code={DISMISSIBLE_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="info" dismissible icon>A new software update is available. See what&apos;s new in v3.0.</Alert>
            <Alert variant="success" dismissible icon>Your export has been downloaded successfully.</Alert>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Icon" description="Built-in icons or custom icon elements." code={WITH_ICON_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="success" icon>
              <AlertTitle>Deployment complete</AlertTitle>
              <AlertDescription>v2.4.1 is now live in production.</AlertDescription>
            </Alert>
            <Alert variant="warning" icon={<RocketIcon />}>
              <AlertTitle>New feature available</AlertTitle>
              <AlertDescription>AI-powered search is now in beta.</AlertDescription>
            </Alert>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Title &amp; Description" description="Structured content with heading and body." code={TITLE_DESC_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="error" icon>
              <AlertTitle>Authentication failed</AlertTitle>
              <AlertDescription>Please check your credentials and try again. If the problem persists, contact support.</AlertDescription>
            </Alert>
            <Alert variant="info" icon>
              <AlertTitle>Maintenance scheduled</AlertTitle>
              <AlertDescription>Saturday 2:00 AM — 4:00 AM UTC. Some services may be temporarily unavailable.</AlertDescription>
            </Alert>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Action" description="Action button at the trailing edge." code={ACTION_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert
              variant="warning"
              icon
              action={
                <button className="rounded-md bg-warning px-3 py-1.5 text-xs font-medium text-warning-foreground transition-colors hover:bg-warning/90">
                  Upgrade
                </button>
              }
            >
              Storage quota 90% full. Upgrade for more space.
            </Alert>
            <Alert
              variant="error"
              icon
              action={
                <button className="rounded-md bg-danger px-3 py-1.5 text-xs font-medium text-danger-foreground transition-colors hover:bg-danger/90">
                  Retry
                </button>
              }
            >
              Connection lost. Check your network settings.
            </Alert>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Real-World Example" description="Production-ready alert with all features." code={REAL_WORLD_CODE}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="success" icon dismissible>
              <AlertTitle>Order confirmed</AlertTitle>
              <AlertDescription>Your order #38291 has been placed. Estimated delivery: Thursday.</AlertDescription>
            </Alert>
            <Alert variant="error" icon dismissible>
              <AlertTitle>Upload failed</AlertTitle>
              <AlertDescription>The file exceeds the 10 MB limit. Compress or split the file and try again.</AlertDescription>
            </Alert>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
