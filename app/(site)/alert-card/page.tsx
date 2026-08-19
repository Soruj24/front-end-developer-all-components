"use client";

import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ALERT_CARD_SOURCE, VARIANTS_EXAMPLE, DISMISSIBLE_EXAMPLE, ACTION_EXAMPLE } from "./alert-card-source";

function AlertVariantsDemo() {
  return (
    <div className="w-full max-w-md space-y-3 p-4">
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <Info className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
        <div><p className="font-medium text-sm text-blue-800 dark:text-blue-200">Information</p><p className="text-sm text-blue-600 dark:text-blue-300">This is an informational alert message.</p></div>
      </div>
      <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
        <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
        <div><p className="font-medium text-sm text-green-800 dark:text-green-200">Success</p><p className="text-sm text-green-600 dark:text-green-300">Your action was completed successfully.</p></div>
      </div>
      <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        <div><p className="font-medium text-sm text-yellow-800 dark:text-yellow-200">Warning</p><p className="text-sm text-yellow-600 dark:text-yellow-300">Please review this before proceeding.</p></div>
      </div>
      <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <AlertCircle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
        <div><p className="font-medium text-sm text-red-800 dark:text-red-200">Error</p><p className="text-sm text-red-600 dark:text-red-300">Something went wrong. Please try again.</p></div>
      </div>
    </div>
  );
}

function DismissibleDemo() {
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
        <Info className="mt-0.5 h-5 w-5 text-primary" />
        <div className="flex-1"><p className="font-medium text-sm">Dismissible Alert</p><p className="text-sm text-muted-foreground">Click the X to dismiss this alert.</p></div>
        <button className="text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>
    </div>
  );
}

function ActionDemo() {
  return (
    <div className="w-full max-w-md p-4">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-500" />
        <div className="flex-1"><p className="font-medium text-sm">Update Available</p><p className="text-sm text-muted-foreground">A new version is available for download.</p></div>
        <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">Update</button>
      </div>
    </div>
  );
}

export default function AlertCardPage() {
  return (
    <ComponentDocPage
      name="Alert Card"
      category="Feedback"
      description="A styled card component for displaying alerts, notifications, and important messages with different severity levels."
    >
      <PreviewPanel filename="alert-card.tsx">
        <AlertVariantsDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ALERT_CARD_SOURCE}
        filename="components/ui/AlertCard/AlertCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Alert Variants" description="Different alert styles for info, success, warning, and error states." code={VARIANTS_EXAMPLE}>
          <AlertVariantsDemo />
        </ExampleBlock>
        <ExampleBlock title="Dismissible Alert" description="Alert cards with a close button for dismissal." code={DISMISSIBLE_EXAMPLE}>
          <DismissibleDemo />
        </ExampleBlock>
        <ExampleBlock title="Alert with Action" description="Alerts with embedded action buttons." code={ACTION_EXAMPLE}>
          <ActionDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}