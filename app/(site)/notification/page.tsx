"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const NOTIFICATION_SOURCE = `import { cn } from "@/lib/cn";

const variantClasses: Record<string, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
  error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
};

export function Notification({ children, variant = "info", title, onClose, className }) {
  return (
    <div className={cn("relative rounded-lg border p-4", variantClasses[variant], className)}>
      {title && <h4 className={cn("text-sm font-medium mb-1")}>{title}</h4>}
      <div className="text-sm opacity-90">{children}</div>
      {onClose && (
        <button type="button" onClick={onClose} className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}`;

const VARIANTS_SOURCE = `import { Notification } from "@/components/ui/Notification";

<div className="flex flex-col gap-3">
  <Notification variant="info">This is an informational message.</Notification>
  <Notification variant="success">Operation completed successfully.</Notification>
  <Notification variant="warning">Please review before proceeding.</Notification>
  <Notification variant="error">Something went wrong.</Notification>
</div>`;

const ICONS_SOURCE = `import { Notification } from "@/components/ui/Notification";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

<Notification variant="info" className="flex items-start gap-3">
  <Info className="mt-0.5 h-5 w-5 shrink-0" />
  <div>
    <h4 className="text-sm font-medium">New feature available</h4>
    <p className="text-sm opacity-90">Check out the latest update with new features.</p>
  </div>
</Notification>`;

const ACTIONS_SOURCE = `import { Notification } from "@/components/ui/Notification";

<Notification variant="info" title="New version available" className="flex flex-col gap-3">
  <p>Version 2.0 is ready to install.</p>
  <div className="flex gap-2">
    <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">Update Now</button>
    <button className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium">Later</button>
  </div>
</Notification>`;

const TOAST_SOURCE = `import { useState } from "react";
import { Notification } from "@/components/ui/Notification";

function ToastShowcase() {
  const [toasts, setToasts] = useState([]);
  const addToast = (variant, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };
  return (/* toast list */);
}`;

const v = { info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100", success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100", warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100", error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100" } as const;
const iconCls = "mt-0.5 h-5 w-5 shrink-0";

function N({ variant = "info", title, onClose, children, className = "" }: { variant?: string; title?: string; onClose?: () => void; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-lg border p-4 ${v[variant as keyof typeof v] || v.info} ${className}`}>
      {title && <h4 className="text-sm font-medium mb-1">{title}</h4>}
      <div className="text-sm opacity-90">{children}</div>
      {onClose && <button type="button" onClick={onClose} className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>}
    </div>
  );
}

const I = ({ d, className = iconCls }: { d: string; className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} /></svg>;
const icons = { info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z", error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" } as const;
const toastBtn = "rounded-md px-3 py-1.5 text-xs font-medium";

export default function NotificationPage() {
  const [toasts, setToasts] = useState<Array<{ id: number; variant: string; message: string }>>([]);
  const addToast = (variant: string, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  return (
    <ComponentDocPage name="Notification" category="Feedback" description="Alert messages, banners, and toast notifications with multiple variants, icons, actions, and dismissal support.">
      <PreviewPanel filename="notification-preview.tsx">
        <div className="flex flex-col gap-3">
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <N key={v} variant={v} title={v.charAt(0).toUpperCase() + v.slice(1)}>This is a {v} notification message.</N>
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={NOTIFICATION_SOURCE} filename="components/ui/Notification.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Four notification variants: info, success, warning, and error." code={VARIANTS_SOURCE} filename="variants.tsx">
          <div className="flex flex-col gap-3">
            <N variant="info">This is an informational message.</N>
            <N variant="success">Operation completed successfully.</N>
            <N variant="warning">Please review before proceeding.</N>
            <N variant="error">Something went wrong.</N>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Leading icons for better visual hierarchy." code={ICONS_SOURCE} filename="with-icons.tsx">
          <div className="flex flex-col gap-3">
            {(["info", "success", "warning", "error"] as const).map((key) => (
              <N key={key} variant={key} className="flex items-start gap-3">
                <I d={icons[key]} />
                <div><h4 className="text-sm font-medium">{key === "info" ? "New feature" : key === "success" ? "Payment received" : key === "warning" ? "Storage full" : "Deployment failed"}</h4><p className="text-sm opacity-90">Description for {key} notification.</p></div>
              </N>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Actions" description="Notifications with action buttons." code={ACTIONS_SOURCE} filename="with-actions.tsx">
          <div className="flex flex-col gap-3">
            <N variant="info" title="New version available" className="flex flex-col gap-3">
              <p>Version 2.0 is ready to install.</p>
              <div className="flex gap-2">
                <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">Update Now</button>
                <button className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium hover:bg-blue-50 dark:border-blue-800">Later</button>
              </div>
            </N>
            <N variant="error" title="Action required" className="flex flex-col gap-3">
              <p>Your account has been suspended.</p>
              <div className="flex gap-2">
                <button className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700">Verify Account</button>
                <button className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium hover:bg-red-50 dark:border-red-800">Contact Support</button>
              </div>
            </N>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Toast" description="Auto-dismissing toast notifications." code={TOAST_SOURCE} filename="toast.tsx">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {(["info", "success", "warning", "error"] as const).map((key) => (
                <button key={key} onClick={() => addToast(key, `${key} notification`)} className={`${toastBtn} ${key === "info" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100" : key === "success" ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-100" : key === "warning" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-100" : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100"}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {toasts.map((t) => <N key={t.id} variant={t.variant} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))}>{t.message}</N>)}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Banner" description="Full-width banner announcements." code="function Banner() { /* full-width banner with action button */ }" filename="banner.tsx">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-blue-600 px-4 py-3 text-white">
              <span className="text-sm font-medium">New: AI-powered code review is now available.</span>
              <button className="rounded-md bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30">Learn more</button>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-white">
              <span className="text-sm font-medium">Upgrade to Pro for unlimited access.</span>
              <button className="rounded-md bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30">Upgrade</button>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
