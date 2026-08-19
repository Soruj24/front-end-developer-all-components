export const ALERT_CARD_SOURCE = `"use client";

import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantConfig: Record<
  AlertVariant,
  { container: string; title: string; description: string; icon: typeof Info; iconColor: string }
> = {
  info: { container: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950", title: "text-blue-800 dark:text-blue-200", description: "text-blue-600 dark:text-blue-300", icon: Info, iconColor: "text-blue-600 dark:text-blue-400" },
  success: { container: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950", title: "text-green-800 dark:text-green-200", description: "text-green-600 dark:text-green-300", icon: CheckCircle, iconColor: "text-green-600 dark:text-green-400" },
  warning: { container: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950", title: "text-yellow-800 dark:text-yellow-200", description: "text-yellow-600 dark:text-yellow-300", icon: AlertTriangle, iconColor: "text-yellow-600 dark:text-yellow-400" },
  error: { container: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950", title: "text-red-800 dark:text-red-200", description: "text-red-600 dark:text-red-300", icon: AlertCircle, iconColor: "text-red-600 dark:text-red-400" },
};

interface AlertCardProps {
  variant?: AlertVariant;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
}

export function AlertCard({
  variant = "info",
  title,
  description,
  action,
  dismissible,
}: AlertCardProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  return (
    <div className={\`flex w-full items-start gap-3 rounded-lg border p-4 \${config.container}\`}>
      <Icon className={\`mt-0.5 h-5 w-5 shrink-0 \${config.iconColor}\`} />
      <div className="flex-1">
        <p className={\`text-sm font-medium \${config.title}\`}>{title}</p>
        <p className={\`mt-0.5 text-sm \${config.description}\`}>{description}</p>
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}
      {dismissible && (
        <button
          type="button"
          className="text-xs text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
}`;

export const VARIANTS_EXAMPLE = `<AlertCard variant="info" title="Information" description="This is an informational alert message." />
<AlertCard variant="success" title="Success" description="Your action was completed successfully." />
<AlertCard variant="warning" title="Warning" description="Please review this before proceeding." />
<AlertCard variant="error" title="Error" description="Something went wrong. Please try again." />`;

export const DISMISSIBLE_EXAMPLE = `<AlertCard
  variant="info"
  title="Dismissible Alert"
  description="Click the X to dismiss this alert."
  dismissible
/>`;

export const ACTION_EXAMPLE = `<AlertCard
  variant="warning"
  title="Update Available"
  description="A new version is available for download."
  action={{ label: "Update", onClick: handleUpdate }}
/>`;