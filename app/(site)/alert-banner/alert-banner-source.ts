export const ALERT_BANNER_SOURCE = `"use client";

import { useState } from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react";

type BannerVariant = "info" | "success" | "warning" | "error";

const variantConfig: Record<
  BannerVariant,
  { bg: string; text: string; border: string; icon: typeof Info }
> = {
  info: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-800 dark:text-blue-200", border: "border-blue-200 dark:border-blue-800", icon: Info },
  success: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-800 dark:text-emerald-200", border: "border-emerald-200 dark:border-emerald-800", icon: CheckCircle2 },
  warning: { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-800 dark:text-amber-200", border: "border-amber-200 dark:border-amber-800", icon: AlertTriangle },
  error: { bg: "bg-red-50 dark:bg-red-950/40", text: "text-red-800 dark:text-red-200", border: "border-red-200 dark:border-red-800", icon: AlertCircle },
};

interface AlertBannerProps {
  variant?: BannerVariant;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
}

export function AlertBanner({
  variant = "info",
  message,
  dismissible = false,
  onDismiss,
  action,
}: AlertBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={\`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm \${config.bg} \${config.text} \${config.border}\`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="whitespace-nowrap rounded-md bg-white/20 px-2.5 py-1 text-xs font-semibold hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {action.label}
          </button>
        )}
        {dismissible && (
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              onDismiss?.();
            }}
            className="rounded p-0.5 hover:bg-white/20 dark:hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}`;

export const VARIANTS_EXAMPLE = `<AlertBanner variant="info" message="System maintenance scheduled for Saturday." />
<AlertBanner variant="success" message="Your changes have been saved successfully." />
<AlertBanner variant="warning" message="Your trial expires in 3 days." />
<AlertBanner variant="error" message="Failed to connect to the server." />`;

export const DISMISSIBLE_EXAMPLE = `<AlertBanner
  variant="info"
  message="We've updated our privacy policy."
  dismissible
  onDismiss={handleDismiss}
/>`;

export const ACTIONS_EXAMPLE = `<AlertBanner
  variant="warning"
  message="Your session will expire in 5 minutes."
  dismissible
  action={{ label: "Extend", onClick: handleExtend }}
/>`;

export const RICH_EXAMPLE = `<AlertBanner variant="info" message="Improved performance.">
  <a href="/changelog" className="font-medium underline">
    Read the changelog
  </a>
</AlertBanner>`;

export const POSITIONS_EXAMPLE = `<AlertBanner position="top" />
<AlertBanner position="inline" />
<AlertBanner position="bottom" />`;