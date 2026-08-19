"use client";

import { useState } from "react";
import { Info, AlertTriangle, CheckCircle2, AlertCircle, X, ExternalLink } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ALERT_BANNER_SOURCE, VARIANTS_EXAMPLE, DISMISSIBLE_EXAMPLE, ACTIONS_EXAMPLE, RICH_EXAMPLE, POSITIONS_EXAMPLE } from "./alert-banner-source";

type BannerVariant = "info" | "success" | "warning" | "error";

const variantConfig: Record<BannerVariant, { bg: string; text: string; border: string; icon: typeof Info }> = {
  info: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-800 dark:text-blue-200", border: "border-blue-200 dark:border-blue-800", icon: Info },
  success: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-800 dark:text-emerald-200", border: "border-emerald-200 dark:border-emerald-800", icon: CheckCircle2 },
  warning: { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-800 dark:text-amber-200", border: "border-amber-200 dark:border-amber-800", icon: AlertTriangle },
  error: { bg: "bg-red-50 dark:bg-red-950/40", text: "text-red-800 dark:text-red-200", border: "border-red-200 dark:border-red-800", icon: AlertCircle },
};

function AlertBannerDemo({ variant = "info", message, dismissible = false, onDismiss, action }: { variant?: BannerVariant; message: string; dismissible?: boolean; onDismiss?: () => void; action?: { label: string; onClick: () => void } }) {
  const [visible, setVisible] = useState(true);
  const config = variantConfig[variant];
  const Icon = config.icon;

  if (!visible) return null;

  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${config.bg} ${config.text} ${config.border}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {action && (
          <button onClick={action.onClick} className="whitespace-nowrap rounded-md bg-white/20 px-2.5 py-1 text-xs font-semibold hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20">
            {action.label}
          </button>
        )}
        {dismissible && (
          <button onClick={() => { setVisible(false); onDismiss?.(); }} className="rounded p-0.5 hover:bg-white/20 dark:hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function VariantsDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <AlertBannerDemo variant="info" message="System maintenance scheduled for Saturday at 2 AM UTC." />
      <AlertBannerDemo variant="success" message="Your changes have been saved successfully." />
      <AlertBannerDemo variant="warning" message="Your trial expires in 3 days. Upgrade to keep access." />
      <AlertBannerDemo variant="error" message="Failed to connect to the server. Please try again." />
    </div>
  );
}

function DismissibleDemo() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      {!dismissed["d1"] && <AlertBannerDemo variant="info" message="We've updated our privacy policy." dismissible onDismiss={() => setDismissed({ ...dismissed, d1: true })} />}
      {!dismissed["d2"] && <AlertBannerDemo variant="warning" message="Storage quota 80% full." dismissible onDismiss={() => setDismissed({ ...dismissed, d2: true })} />}
      {!dismissed["d3"] && <AlertBannerDemo variant="success" message="New version available!" dismissible onDismiss={() => setDismissed({ ...dismissed, d3: true })} />}
      {Object.values(dismissed).some(Boolean) && (
        <button onClick={() => setDismissed({})} className="self-start rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">
          Reset dismissed
        </button>
      )}
    </div>
  );
}

function ActionsDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <AlertBannerDemo variant="info" message="New feature: AI-powered search is now available." action={{ label: "Try it", onClick: () => {} }} />
      <AlertBannerDemo variant="warning" message="Your session will expire in 5 minutes." action={{ label: "Extend", onClick: () => {} }} dismissible />
      <AlertBannerDemo variant="error" message="Payment failed. Please update your billing info." action={{ label: "Update", onClick: () => {} }} />
    </div>
  );
}

function RichContentDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
        <Info className="h-4 w-4 shrink-0" />
        <span className="flex-1">We've made improvements to performance. <a href="#" className="font-medium underline hover:no-underline">Read the changelog</a></span>
        <a href="#" className="flex shrink-0 items-center gap-1 rounded bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700">Learn more <ExternalLink className="h-3 w-3" /></a>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span className="flex-1">API rate limit reached. Some requests may be throttled.</span>
        <a href="#" className="shrink-0 rounded bg-amber-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-700">Upgrade plan</a>
      </div>
    </div>
  );
}

function PositionsDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="rounded-lg border border-border bg-white p-3 dark:border-border dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Top (sticky)</p>
        <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">Info banner at top</div>
      </div>
      <div className="rounded-lg border border-border bg-white p-3 dark:border-border dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Inline</p>
        <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">Inline warning</div>
      </div>
      <div className="rounded-lg border border-border bg-white p-3 dark:border-border dark:bg-zinc-900">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Bottom (floating)</p>
        <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">Success notification</div>
      </div>
    </div>
  );
}

export default function AlertBannerPage() {
  return (
    <ComponentDocPage
      name="Alert Banner"
      category="Feedback"
      description="Top-of-page notification banner for system alerts, announcements, and important messages with dismissible and action support."
    >
      <PreviewPanel filename="alert-banner.tsx">
        <VariantsDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ALERT_BANNER_SOURCE}
        filename="components/ui/AlertBanner/AlertBanner.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Different alert styles for various severity levels." code={VARIANTS_EXAMPLE}>
          <VariantsDemo />
        </ExampleBlock>
        <ExampleBlock title="Dismissible" description="Banners with a close button that can be dismissed." code={DISMISSIBLE_EXAMPLE}>
          <DismissibleDemo />
        </ExampleBlock>
        <ExampleBlock title="With Actions" description="Banners with call-to-action buttons." code={ACTIONS_EXAMPLE}>
          <ActionsDemo />
        </ExampleBlock>
        <ExampleBlock title="Rich Content" description="Banners with links and more detailed messaging." code={RICH_EXAMPLE}>
          <RichContentDemo />
        </ExampleBlock>
        <ExampleBlock title="Positions" description="Banner placement options." code={POSITIONS_EXAMPLE}>
          <PositionsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}