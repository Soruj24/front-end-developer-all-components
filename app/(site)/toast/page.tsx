"use client";

import { useState, useCallback } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Toast, { type ToastItem } from "@/components/ui/Toast";

const TOAST_SOURCE = `import { forwardRef } from "react";

type ToastType = "success" | "error" | "warning" | "info";
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center";

const typeIcons: Record<ToastType, string> = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
const typeClasses: Record<ToastType, string> = { success: "border-success", error: "border-danger", warning: "border-warning", info: "border-info" };
const typeIconClasses: Record<ToastType, string> = { success: "text-success", error: "text-danger", warning: "text-warning", info: "text-info" };
const positionClasses: Record<Position, string> = {
  "top-right": "top-4 right-4", "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4", "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
};

export interface ToastItem { id: string; type: ToastType; message: string; action?: { label: string; onClick: () => void } }
export interface ToastProps { toasts: ToastItem[]; onDismiss: (id: string) => void; position?: Position }

const Toast = forwardRef<HTMLDivElement, ToastProps>(({ toasts, onDismiss, position = "top-right" }, ref) => (
  <div ref={ref} className={\`fixed z-50 flex flex-col gap-2 \${positionClasses[position]}\`}>
    {toasts.map((t) => (
      <div key={t.id} className={\`flex items-center gap-3 min-w-[18rem] max-w-sm rounded-lg border-l-4 px-4 py-3 bg-surface text-foreground shadow-toast animate-in slide-in-from-top-2 \${typeClasses[t.type]}\`}>
        <span className={\`text-base font-bold \${typeIconClasses[t.type]}\`}>{typeIcons[t.type]}</span>
        <p className="flex-1 text-sm font-medium">{t.message}</p>
        {t.action && <button onClick={t.action.onClick} className="whitespace-nowrap text-sm font-semibold underline underline-offset-2">{t.action.label}</button>}
        <button onClick={() => onDismiss(t.id)} className="flex h-6 w-6 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100">✕</button>
      </div>
    ))}
  </div>
));
Toast.displayName = "Toast";
export default Toast;`;

const TYPES_SOURCE = `import { useState } from "react";
import Toast, { type ToastItem } from "@/components/ui/Toast";

function ToastTypesDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const add = (type: ToastItem["type"], message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };
  return (
    <>
      <Toast toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => add("success", "Saved successfully!")}>Success</button>
        <button onClick={() => add("error", "Something went wrong.")}>Error</button>
        <button onClick={() => add("warning", "Check your input.")}>Warning</button>
        <button onClick={() => add("info", "Some information.")}>Info</button>
      </div>
    </>
  );
}`;

const ACTIONS_SOURCE = `import { useState } from "react";
import Toast, { type ToastItem } from "@/components/ui/Toast";

function ToastActionsDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const add = (message: string, action: ToastItem["action"]) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type: "info", message, action }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  };
  return (
    <>
      <Toast toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
      <div className="flex flex-wrap gap-3">
        <button onClick={() => add("File uploaded", { label: "Undo", onClick: () => {} })}>Undo</button>
        <button onClick={() => add("Changes saved", { label: "View", onClick: () => {} })}>View</button>
      </div>
    </>
  );
}`;

const POSITIONS_SOURCE = `import { useState } from "react";
import Toast, { type ToastItem, type ToastProps } from "@/components/ui/Toast";

function ToastPositionsDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<ToastProps["position"]>("top-right");
  const add = (message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type: "info", message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };
  return (
    <>
      <Toast toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} position={position} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {(["top-right", "top-left", "bottom-right", "bottom-left", "top-center"] as const).map((p) => (
            <button key={p} onClick={() => setPosition(p)} className={position === p ? "bg-primary text-white" : ""}>{p}</button>
          ))}
        </div>
        <button onClick={() => add("Toast notification")}>Show Toast</button>
      </div>
    </>
  );
}`;

let nextId = 0;

function ToastDemo({ type = "info", message, action, duration = 3000 }: { type?: ToastItem["type"]; message: string; action?: ToastItem["action"]; duration?: number }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismiss = useCallback((id: string) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  const show = () => {
    const id = String(nextId++);
    setToasts((p) => [...p, { id, type, message, action }]);
    if (type !== "loading") setTimeout(() => dismiss(id), duration);
  };
  return (
    <>
      <Toast toasts={toasts} onDismiss={dismiss} />
      <button onClick={show} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">{message}</button>
    </>
  );
}

export default function ToastPage() {
  return (
    <ComponentDocPage name="Toast" category="Feedback" description="Toast notifications with types, positions, actions, and auto-dismiss.">
      <PreviewPanel filename="toast-preview.tsx">
        <div className="flex flex-wrap items-center gap-3">
          <ToastDemo type="success" message="Success" />
          <ToastDemo type="error" message="Error" />
          <ToastDemo type="warning" message="Warning" />
          <ToastDemo type="info" message="Info" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={TOAST_SOURCE} filename="components/ui/Toast.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Types" description="Different toast styles for various severity levels." code={TYPES_SOURCE} filename="toast-types.tsx">
          <div className="flex flex-wrap gap-3">
            <ToastDemo type="success" message="Saved successfully!" />
            <ToastDemo type="error" message="Something went wrong." />
            <ToastDemo type="warning" message="Check your input." />
            <ToastDemo type="info" message="Some information." />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Actions" description="Toasts with interactive action buttons." code={ACTIONS_SOURCE} filename="toast-actions.tsx">
          <div className="flex flex-wrap gap-3">
            <ToastDemo type="info" message="File uploaded" action={{ label: "Undo", onClick: () => {} }} duration={5000} />
            <ToastDemo type="success" message="Changes saved" action={{ label: "View", onClick: () => {} }} duration={5000} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Positions" description="Control where toasts appear on screen." code={POSITIONS_SOURCE} filename="toast-positions.tsx">
          <div className="flex flex-wrap gap-3">
            <ToastDemo type="success" message="Top Right" />
            <ToastDemo type="info" message="Top Left" />
            <ToastDemo type="warning" message="Bottom Right" />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
