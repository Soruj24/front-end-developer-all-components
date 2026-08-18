"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

const installCommand = `npx component-library@latest add alert-card`;
const usageCode = `import { AlertCard } from "@/components/ui/alert-card";

<AlertCard variant="info" title="Note" description="This is an informational alert." />`;

export default function AlertCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Alert Card</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A styled card component for displaying alerts, notifications, and important messages with different severity levels.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Alert Variants</h2><p className="mt-1 text-sm text-muted-foreground">Different alert styles for info, success, warning, and error states.</p></div>
        <ComponentPreview id="alert-card-variants">
          <div className="w-full p-4 space-y-3">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Dismissible Alert</h2><p className="mt-1 text-sm text-muted-foreground">Alert cards with a close button for dismissal.</p></div>
        <ComponentPreview id="alert-card-dismissible">
          <div className="w-full p-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Info className="mt-0.5 h-5 w-5 text-primary" />
              <div className="flex-1"><p className="font-medium text-sm">Dismissible Alert</p><p className="text-sm text-muted-foreground">Click the X to dismiss this alert.</p></div>
              <button className="text-muted-foreground hover:text-foreground text-xs">✕</button>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Alert with Action</h2><p className="mt-1 text-sm text-muted-foreground">Alerts with embedded action buttons.</p></div>
        <ComponentPreview id="alert-card-action">
          <div className="w-full p-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-500" />
              <div className="flex-1"><p className="font-medium text-sm">Update Available</p><p className="text-sm text-muted-foreground">A new version is available for download.</p></div>
              <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">Update</button>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
