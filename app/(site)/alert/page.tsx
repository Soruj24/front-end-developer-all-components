"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import Alert from "@/components/ui/Alert";

const ALERT_SOURCE = `import { HTMLAttributes, forwardRef, useState } from "react";

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
        className={\`flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 text-sm \${variantClasses[variant]} \${className}\`}
        {...props}
      >
        {icon && <span className={\`mt-0.5 text-base font-bold \${variantIconClasses[variant]}\`}>{variantIcons[variant]}</span>}
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
export { Alert };`;

const INFO_EXAMPLE = `<Alert variant="info">This is an informational message.</Alert>`;

const SUCCESS_EXAMPLE = `<Alert variant="success">Your changes have been saved.</Alert>`;

const WARNING_EXAMPLE = `<Alert variant="warning">Your trial expires in 3 days.</Alert>`;

const ERROR_EXAMPLE = `<Alert variant="error">Payment failed. Please update billing info.</Alert>`;

const DISMISSIBLE_EXAMPLE = `<Alert variant="info" dismissible>
  A new software update is available.
</Alert>`;

export default function AlertPage() {
  return (
    <ComponentDocPage
      name="Alert"
      category="Feedback"
      description="Displays a brief, important message with optional icon and dismiss action. Use alerts to convey status updates, warnings, or error messages."
    >
      <PreviewPanel filename="alert-preview">
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Alert variant="info">Information alert — Check this out.</Alert>
          <Alert variant="success">Success alert — Task completed.</Alert>
          <Alert variant="warning">Warning alert — Heads up.</Alert>
          <Alert variant="error">Error alert — Something went wrong.</Alert>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={ALERT_SOURCE} filename="Alert.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Info" description="Informational message variant." code={INFO_EXAMPLE}>
          <Alert variant="info">This is an informational message.</Alert>
        </ExampleBlock>

        <ExampleBlock title="Success" description="Positive confirmation variant." code={SUCCESS_EXAMPLE}>
          <Alert variant="success">Your changes have been saved.</Alert>
        </ExampleBlock>

        <ExampleBlock title="Warning" description="Caution message variant." code={WARNING_EXAMPLE}>
          <Alert variant="warning">Your trial expires in 3 days.</Alert>
        </ExampleBlock>

        <ExampleBlock title="Error" description="Error or failure variant." code={ERROR_EXAMPLE}>
          <Alert variant="error">Payment failed. Please update billing info.</Alert>
        </ExampleBlock>

        <ExampleBlock title="Dismissible" description="Alert with a close button to dismiss." code={DISMISSIBLE_EXAMPLE}>
          <Alert variant="info" dismissible>A new software update is available.</Alert>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
