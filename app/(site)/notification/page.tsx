"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Notification,
  NotificationTitle,
  NotificationDescription,
} from "@/components/ui/Notification";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Bell,
  Mail,
  CreditCard,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const installCommand = `npx component-library@latest add notification`;

const usageCode = `import { Notification } from "@/components/ui/Notification";

<Notification variant="info" title="Info">
  This is an informational message.
</Notification>

<Notification variant="success" title="Success">
  Operation completed successfully.
</Notification>`;

function NotificationBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Notification variant="info">This is an informational message.</Notification>
      <Notification variant="success">Operation completed successfully.</Notification>
      <Notification variant="warning">Please review before proceeding.</Notification>
      <Notification variant="error">Something went wrong.</Notification>
    </div>
  );
}

function NotificationWithTitle() {
  return (
    <div className="flex flex-col gap-3">
      <Notification variant="info" title="Info">
        Your account has been updated with the latest settings.
      </Notification>
      <Notification variant="success" title="Success">
        Your changes have been saved successfully.
      </Notification>
      <Notification variant="warning" title="Warning">
        Your subscription expires in 3 days.
      </Notification>
      <Notification variant="error" title="Error">
        Failed to connect to the server. Please try again.
      </Notification>
    </div>
  );
}

function NotificationWithIcons() {
  return (
    <div className="flex flex-col gap-3">
      <Notification variant="info" className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <NotificationTitle>New feature available</NotificationTitle>
          <NotificationDescription>Check out the latest update with new features.</NotificationDescription>
        </div>
      </Notification>
      <Notification variant="success" className="flex items-start gap-3">
        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <NotificationTitle>Payment received</NotificationTitle>
          <NotificationDescription>Your payment of $99 has been processed.</NotificationDescription>
        </div>
      </Notification>
      <Notification variant="warning" className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <NotificationTitle>Storage almost full</NotificationTitle>
          <NotificationDescription>You have used 90% of your storage quota.</NotificationDescription>
        </div>
      </Notification>
      <Notification variant="error" className="flex items-start gap-3">
        <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <NotificationTitle>Deployment failed</NotificationTitle>
          <NotificationDescription>Build error in production environment.</NotificationDescription>
        </div>
      </Notification>
    </div>
  );
}

function NotificationDismissible() {
  const [visible, setVisible] = useState([true, true, true, true]);
  const variants: Array<"info" | "success" | "warning" | "error"> = ["info", "success", "warning", "error"];
  const titles = ["Update available", "Task completed", "Low disk space", "Connection lost"];
  const messages = [
    "A new version is ready to install.",
    "Your export has finished.",
    "Only 2GB remaining.",
    "Unable to reach the server.",
  ];

  return (
    <div className="flex flex-col gap-3">
      {variants.map((v, i) =>
        visible[i] ? (
          <Notification
            key={i}
            variant={v}
            title={titles[i]}
            onClose={() => setVisible((prev) => prev.map((p, j) => (j === i ? false : p)))}
          >
            {messages[i]}
          </Notification>
        ) : null
      )}
    </div>
  );
}

function NotificationWithActions() {
  return (
    <div className="flex flex-col gap-3">
      <Notification variant="info" title="New version available" className="flex flex-col gap-3">
        <p>Version 2.0 is ready to install with new features and improvements.</p>
        <div className="flex gap-2">
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
            Update Now
          </button>
          <button className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950">
            Later
          </button>
        </div>
      </Notification>

      <Notification variant="success" title="Payment successful" className="flex flex-col gap-3">
        <p>Your subscription has been renewed for another year.</p>
        <div className="flex gap-2">
          <button className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700">
            View Receipt
          </button>
        </div>
      </Notification>

      <Notification variant="error" title="Action required" className="flex flex-col gap-3">
        <p>Your account has been suspended due to unusual activity.</p>
        <div className="flex gap-2">
          <button className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">
            Verify Account
          </button>
          <button className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950">
            Contact Support
          </button>
        </div>
      </Notification>
    </div>
  );
}

function NotificationStacked() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border p-4 dark:border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">3 new notifications</span>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground">Mark all read</button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 rounded-md p-2 hover:bg-muted dark:hover:bg-muted">
          <Mail className="h-4 w-4 text-blue-500" />
          <div className="flex-1">
            <p className="text-sm">New message from Alice</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-md p-2 hover:bg-muted dark:hover:bg-muted">
          <CreditCard className="h-4 w-4 text-green-500" />
          <div className="flex-1">
            <p className="text-sm">Payment received</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-md p-2 hover:bg-muted dark:hover:bg-muted">
          <Shield className="h-4 w-4 text-amber-500" />
          <div className="flex-1">
            <p className="text-sm">Security alert</p>
            <p className="text-xs text-muted-foreground">3 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationToast() {
  const [toasts, setToasts] = useState<Array<{ id: number; variant: string; message: string }>>([]);

  const addToast = (variant: string, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addToast("info", "Info notification")}
          className="rounded-md bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100"
        >
          Info
        </button>
        <button
          onClick={() => addToast("success", "Success notification")}
          className="rounded-md bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100"
        >
          Success
        </button>
        <button
          onClick={() => addToast("warning", "Warning notification")}
          className="rounded-md bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100"
        >
          Warning
        </button>
        <button
          onClick={() => addToast("error", "Error notification")}
          className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100"
        >
          Error
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <Notification
            key={toast.id}
            variant={toast.variant as "info" | "success" | "warning" | "error"}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          >
            {toast.message}
          </Notification>
        ))}
      </div>
    </div>
  );
}

function NotificationInline() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border p-4 dark:border-border">
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Tip</p>
            <p className="text-sm text-muted-foreground">Press Ctrl+K to open the command palette.</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-100">Saved</p>
            <p className="text-sm text-green-700 dark:text-green-200">All changes have been saved.</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-100">Caution</p>
            <p className="text-sm text-amber-700 dark:text-amber-200">This action cannot be undone.</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <div className="flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-100">Error</p>
            <p className="text-sm text-red-700 dark:text-red-200">Something went wrong. Please try again.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationBanner() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-lg bg-blue-600 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5" />
          <span className="text-sm font-medium">New: AI-powered code review is now available.</span>
        </div>
        <button className="rounded-md bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30">
          Learn more
        </button>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5" />
          <span className="text-sm font-medium">Upgrade to Pro for unlimited access.</span>
        </div>
        <button className="rounded-md bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30">
          Upgrade
        </button>
      </div>
    </div>
  );
}

export default function NotificationPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Notification</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Alert messages, banners, and toast notifications with multiple variants, icons, actions, and dismissal support.
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

      {/* Basic Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Four notification variants: info, success, warning, and error.
          </p>
        </div>
        <ComponentPreview id="notification-basic">
          <NotificationBasic />
        </ComponentPreview>
      </section>

      {/* With Title */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Title</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Notifications with descriptive titles.
          </p>
        </div>
        <ComponentPreview id="notification-title">
          <NotificationWithTitle />
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Leading icons for better visual hierarchy.
          </p>
        </div>
        <ComponentPreview id="notification-icons">
          <NotificationWithIcons />
        </ComponentPreview>
      </section>

      {/* Dismissible */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dismissible</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Click the X button to dismiss notifications.
          </p>
        </div>
        <ComponentPreview id="notification-dismissible">
          <NotificationDismissible />
        </ComponentPreview>
      </section>

      {/* With Actions */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Notifications with action buttons.
          </p>
        </div>
        <ComponentPreview id="notification-actions">
          <NotificationWithActions />
        </ComponentPreview>
      </section>

      {/* Stacked */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Stacked Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Grouped notification list with timestamps.
          </p>
        </div>
        <ComponentPreview id="notification-stacked">
          <NotificationStacked />
        </ComponentPreview>
      </section>

      {/* Toast */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Toast Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Auto-dismissing toast notifications.
          </p>
        </div>
        <ComponentPreview id="notification-toast">
          <NotificationToast />
        </ComponentPreview>
      </section>

      {/* Inline */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Notifications embedded within content.
          </p>
        </div>
        <ComponentPreview id="notification-inline">
          <NotificationInline />
        </ComponentPreview>
      </section>

      {/* Banner */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Banner Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full-width banner announcements.
          </p>
        </div>
        <ComponentPreview id="notification-banner">
          <NotificationBanner />
        </ComponentPreview>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;info&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;info&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onClose</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
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
