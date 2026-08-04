"use client";

import { Alert } from "@/components/_alert";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const variants = ["default", "destructive", "success", "warning", "info"] as const;
const sizes = ["sm", "md", "lg"] as const;

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

function CloseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const installCommand = `npx component-library@latest add alert`;

const usageCode = `import { Alert } from "@/components/_alert";

<Alert variant="info">Information message</Alert>
<Alert variant="destructive">Error occurred</Alert>
<Alert variant="success" size="lg">Success!</Alert>`;

const iconMap: Record<string, React.ReactNode> = {
  default: <InfoIcon />,
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <WarningIcon />,
  destructive: <ErrorIcon />,
};

export default function AlertPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Alert</h1>
          <Badge variant="primary">5 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays a brief, important message with optional icon and action. Use alerts to
          convey important status updates, warnings, or error messages.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="alert-variants">
        <div className="flex flex-col gap-3">
          {variants.map((variant) => (
            <Alert key={variant} variant={variant} icon={iconMap[variant]}>
              <span className="font-medium capitalize">{variant}</span> alert — This is a sample alert message.
            </Alert>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-sizes">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <Alert key={size} variant="info" size={size} icon={<InfoIcon />}>
              <span className="font-medium capitalize">{size}</span> size alert with icon.
            </Alert>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-with-action">
        <div className="flex flex-col gap-3">
          <Alert
            variant="warning"
            icon={<WarningIcon />}
            action={
              <button type="button" className="text-sm font-medium underline hover:no-underline">
                Learn more
              </button>
            }
          >
            Your trial expires in 3 days. Upgrade now to keep full access.
          </Alert>

          <Alert
            variant="destructive"
            icon={<ErrorIcon />}
            action={
              <button type="button" className="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600">
                Dismiss
              </button>
            }
          >
            Payment failed. Please update your billing information.
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-dismissible">
        <div className="flex flex-col gap-3">
          <Alert
            variant="info"
            icon={<InfoIcon />}
            action={
              <button type="button" className="rounded-sm opacity-70 hover:opacity-100">
                <CloseIcon />
              </button>
            }
          >
            A new software update is available. See what&apos;s new in version 3.0.
          </Alert>

          <Alert
            variant="success"
            icon={<CheckIcon />}
            action={
              <button type="button" className="rounded-sm opacity-70 hover:opacity-100">
                <CloseIcon />
              </button>
            }
          >
            Your changes have been saved successfully.
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview id="alert-custom-content">
        <div className="flex flex-col gap-3">
          <Alert variant="info" icon={<InfoIcon />}>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">System Maintenance</span>
              <span className="text-sm opacity-90">
                Scheduled maintenance window: Saturday 2:00 AM — 4:00 AM UTC.
                Some services may be temporarily unavailable.
              </span>
            </div>
          </Alert>

          <Alert variant="warning" icon={<WarningIcon />}>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Storage quota almost reached</span>
              <span className="text-sm opacity-90">
                You&apos;ve used 95% of your allocated storage.
                Consider archiving old files or upgrading your plan.
              </span>
            </div>
          </Alert>
        </div>
      </ComponentPreview>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;destructive&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;info&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
