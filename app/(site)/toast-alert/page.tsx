"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X, RotateCcw, type LucideIcon } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { TOAST_ALERT_SOURCE } from "./toast-alert-source";

type Variant = "success" | "error" | "warning" | "info";

const variantStyles: Record<Variant, { icon: LucideIcon; toast: string; btn: string }> = {
  success: { icon: CheckCircle, toast: "bg-green-500/10 border-green-500/50 text-green-700", btn: "bg-green-500 hover:bg-green-600" },
  error: { icon: XCircle, toast: "bg-red-500/10 border-red-500/50 text-red-700", btn: "bg-red-500 hover:bg-red-600" },
  warning: { icon: AlertCircle, toast: "bg-yellow-500/10 border-yellow-500/50 text-yellow-700", btn: "bg-yellow-500 hover:bg-yellow-600" },
  info: { icon: Info, toast: "bg-blue-500/10 border-blue-500/50 text-blue-700", btn: "bg-blue-500 hover:bg-blue-600" },
};

function Toast({ variant, message, onClose }: { variant: Variant; message: string; onClose?: () => void }) {
  const { icon: Icon, toast } = variantStyles[variant];
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${toast}`}>
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      {onClose && <button onClick={onClose} className="shrink-0 hover:opacity-70"><X className="h-4 w-4" /></button>}
    </div>
  );
}

function SuccessToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const add = () => { const id = Date.now(); setToasts((p) => [...p, { id, message: "Your changes have been saved successfully!" }]); setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000); };
  return (
    <div className="w-full max-w-md space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">Show Success Toast</button>
      <div className="space-y-2">{toasts.map((t) => <Toast key={t.id} variant="success" message={t.message} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />)}</div>
    </div>
  );
}

function ErrorToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const add = () => { const id = Date.now(); setToasts((p) => [...p, { id, message: "Something went wrong. Please try again." }]); setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000); };
  return (
    <div className="w-full max-w-md space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">Show Error Toast</button>
      <div className="space-y-2">{toasts.map((t) => <Toast key={t.id} variant="error" message={t.message} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />)}</div>
    </div>
  );
}

function WarningToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const add = () => { const id = Date.now(); setToasts((p) => [...p, { id, message: "Your session will expire in 5 minutes." }]); setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000); };
  return (
    <div className="w-full max-w-md space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">Show Warning Toast</button>
      <div className="space-y-2">{toasts.map((t) => <Toast key={t.id} variant="warning" message={t.message} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />)}</div>
    </div>
  );
}

function InfoToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const add = () => { const id = Date.now(); setToasts((p) => [...p, { id, message: "A new version is available for download." }]); setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000); };
  return (
    <div className="w-full max-w-md space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">Show Info Toast</button>
      <div className="space-y-2">{toasts.map((t) => <Toast key={t.id} variant="info" message={t.message} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />)}</div>
    </div>
  );
}

function PromiseToast() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const run = () => { setStatus("loading"); setTimeout(() => setStatus(Math.random() > 0.5 ? "success" : "error"), 2000); };
  return (
    <div className="w-full max-w-md space-y-4">
      <button onClick={run} disabled={status === "loading"} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">{status === "loading" ? "Processing..." : "Simulate Promise"}</button>
      {status === "loading" && <div className="flex items-center gap-3 p-4 rounded-lg border bg-blue-500/10 border-blue-500/50 text-blue-700"><RotateCcw className="h-5 w-5 animate-spin shrink-0" /><span className="text-sm">Loading...</span></div>}
      {status === "success" && <Toast variant="success" message="Promise resolved successfully!" onClose={() => setStatus("idle")} />}
      {status === "error" && <Toast variant="error" message="Promise rejected with an error." onClose={() => setStatus("idle")} />}
    </div>
  );
}

function ActionToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const add = () => { const id = Date.now(); setToasts((p) => [...p, { id, message: "Item deleted. " }]); };
  return (
    <div className="w-full max-w-md space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Delete Item</button>
      <div className="space-y-2">{toasts.map((t) => (
        <div key={t.id} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
          <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
          <span className="flex-1 text-sm">{t.message}</span>
          <button className="text-sm text-primary hover:underline shrink-0">Undo</button>
          <button onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))} className="shrink-0 hover:opacity-70"><X className="h-4 w-4" /></button>
        </div>
      ))}</div>
    </div>
  );
}

function StackedToasts() {
  const [toasts, setToasts] = useState<{ id: number; variant: Variant; message: string }[]>([]);
  const messages: Record<Variant, string> = { success: "Operation completed successfully!", error: "An error occurred.", warning: "Please check your input.", info: "Here is some information." };
  const add = (variant: Variant) => { const id = Date.now(); setToasts((p) => [...p, { id, variant, message: messages[variant] }]); };
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["success", "error", "warning", "info"] as const).map((v) => (
          <button key={v} onClick={() => add(v)} className={`px-3 py-1 rounded text-white text-sm hover:opacity-90 ${variantStyles[v].btn}`}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
        ))}
      </div>
      <div className="space-y-2">{toasts.map((t) => <Toast key={t.id} variant={t.variant} message={t.message} onClose={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />)}</div>
    </div>
  );
}

export default function ToastAlertPage() {
  return (
    <ComponentDocPage name="Toast Alert" category="Feedback" description="Notification toasts for success, error, warning, and info messages.">
      <PreviewPanel filename="toast-alert.tsx">
        <div className="w-full max-w-md space-y-2">
          <Toast variant="success" message="Your changes have been saved successfully!" />
          <Toast variant="info" message="A new version is available for download." />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={TOAST_ALERT_SOURCE} filename="components/ui/ToastAlert/ToastAlert.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Success Toast" description="Positive confirmation feedback." code={`<ToastAlert variant="success" message="Your changes have been saved successfully!" />`}>
          <SuccessToast />
        </ExampleBlock>
        <ExampleBlock title="Error Toast" description="Error and failure feedback." code={`<ToastAlert variant="error" message="Something went wrong. Please try again." />`}>
          <ErrorToast />
        </ExampleBlock>
        <ExampleBlock title="Warning Toast" description="Cautionary alerts." code={`<ToastAlert variant="warning" message="Your session will expire in 5 minutes." />`}>
          <WarningToast />
        </ExampleBlock>
        <ExampleBlock title="Info Toast" description="Neutral informational updates." code={`<ToastAlert variant="info" message="A new version is available for download." />`}>
          <InfoToast />
        </ExampleBlock>
        <ExampleBlock title="Promise Toast" description="Shows loading, then success or error, mirroring an async promise." code={`setStatus("loading"); // resolve → success, reject → error`}>
          <PromiseToast />
        </ExampleBlock>
        <ExampleBlock title="Action Toast" description="Toast with an undo action button." code={`<button className="text-sm text-primary hover:underline">Undo</button>`}>
          <ActionToast />
        </ExampleBlock>
        <ExampleBlock title="Stacked Toasts" description="Multiple toasts of different variants at once." code={`<ToastAlert variant="success" message="Operation completed successfully!" />`}>
          <StackedToasts />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}