"use client";

import { useState, useCallback } from "react";
import { X, Undo2, RefreshCw } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SNACKBAR_SOURCE } from "./snackbar-source";

type SnackbarType = "default" | "success" | "error" | "warning";
type Position = "bottom-center" | "bottom-left" | "bottom-right" | "top-center";
interface SnackbarItem { id: number; message: string; type: SnackbarType; visible: boolean; action?: { label: string; onClick: () => void }; duration: number; }
type ShowOpts = { type?: SnackbarType; action?: SnackbarItem["action"]; duration?: number };

const typeStyles: Record<SnackbarType, string> = {
  default: "bg-zinc-900 text-white dark:bg-zinc-700",
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
};

const posStyles: Record<Position, string> = {
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
};

let nextId = 0;

function SnackbarDemo({ position = "bottom-center", children }: { position?: Position; children: (show: (message: string, opts?: ShowOpts) => void) => React.ReactNode }) {
  const [items, setItems] = useState<SnackbarItem[]>([]);
  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, visible: false } : s)));
    setTimeout(() => setItems((prev) => prev.filter((s) => s.id !== id)), 300);
  }, []);
  const show = useCallback((message: string, opts: ShowOpts = {}) => {
    const id = nextId++;
    setItems((prev) => [...prev, { id, message, type: opts.type ?? "default", visible: true, action: opts.action, duration: opts.duration ?? 4000 }]);
    setTimeout(() => dismiss(id), opts.duration ?? 4000);
  }, [dismiss]);
  return (
    <>
      {items.length > 0 && (
        <div className={`fixed z-50 flex flex-col gap-2 ${posStyles[position]}`}>
          {items.map((s) => (
            <div key={s.id} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ${s.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${typeStyles[s.type]} min-w-[280px] max-w-[400px]`}>
              <span className="flex-1">{s.message}</span>
              {s.action && <button onClick={() => { s.action!.onClick(); dismiss(s.id); }} className="whitespace-nowrap rounded bg-white/20 px-2 py-0.5 text-xs font-semibold hover:bg-white/30">{s.action.label}</button>}
              <button onClick={() => dismiss(s.id)} className="text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
      {children(show)}
    </>
  );
}

function PositionsDemo() {
  const [position, setPosition] = useState<Position>("bottom-center");
  return (
    <SnackbarDemo position={position}>
      {(show) => (
        <div className="flex flex-wrap gap-2">
          {(["bottom-center", "bottom-left", "bottom-right", "top-center"] as const).map((p) => (
            <button key={p} onClick={() => { setPosition(p); show(`Position: ${p}`); }} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">{p}</button>
          ))}
        </div>
      )}
    </SnackbarDemo>
  );
}

export default function SnackbarPage() {
  return (
    <ComponentDocPage name="Snackbar" category="Feedback" description="Lightweight notification bar that appears at the edge of the screen with optional actions and auto-dismiss.">
      <PreviewPanel filename="snackbar.tsx">
        <SnackbarDemo>
          {(show) => (
            <div className="flex flex-wrap gap-3">
              <button onClick={() => show("File saved successfully", { type: "success" })} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Success</button>
              <button onClick={() => show("Failed to delete item", { type: "error" })} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Error</button>
              <button onClick={() => show("Disk space running low", { type: "warning" })} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">Warning</button>
              <button onClick={() => show("New message received")} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700">Default</button>
            </div>
          )}
        </SnackbarDemo>
      </PreviewPanel>

      <SourceCodeViewer source={SNACKBAR_SOURCE} filename="components/ui/Snackbar/use-snackbar.ts" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Different snackbar styles for various feedback types." code={`show({ message: "File saved", type: "success" })`}>
          <SnackbarDemo>
            {(show) => (
              <div className="flex flex-wrap gap-3">
                <button onClick={() => show("File saved successfully", { type: "success" })} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Success</button>
                <button onClick={() => show("Failed to delete item", { type: "error" })} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Error</button>
                <button onClick={() => show("Disk space running low", { type: "warning" })} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">Warning</button>
                <button onClick={() => show("New message received")} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700">Default</button>
              </div>
            )}
          </SnackbarDemo>
        </ExampleBlock>

        <ExampleBlock title="With Actions" description="Snackbars with interactive action buttons." code={`show({ message: "Item removed", action: { label: "Undo", onClick: undo } })`}>
          <SnackbarDemo>
            {(show) => (
              <div className="flex flex-wrap gap-3">
                <button onClick={() => show("Item removed", { action: { label: "Undo", onClick: () => show("Restored!", { type: "success" }) } })} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"><Undo2 className="h-4 w-4" /> Undo</button>
                <button onClick={() => show("Changes discarded", { action: { label: "Reload", onClick: () => show("Reloading...", { type: "success" }) } })} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"><RefreshCw className="h-4 w-4" /> Reload</button>
              </div>
            )}
          </SnackbarDemo>
        </ExampleBlock>

        <ExampleBlock title="Positions" description="Control where the snackbar appears." code={`<SnackbarStack position="top-right" />`}>
          <PositionsDemo />
        </ExampleBlock>

        <ExampleBlock title="Custom Duration" description="Control how long the snackbar stays visible." code={`show({ message: "Quick flash", duration: 1000 })`}>
          <SnackbarDemo>
            {(show) => (
              <div className="flex flex-wrap gap-3">
                <button onClick={() => show("Quick flash (1s)", { duration: 1000 })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">1s</button>
                <button onClick={() => show("Default (4s)", { duration: 4000 })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">4s</button>
                <button onClick={() => show("Persistent (8s)", { duration: 8000 })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">8s</button>
              </div>
            )}
          </SnackbarDemo>
        </ExampleBlock>

        <ExampleBlock title="Use Cases" description="Real-world snackbar scenarios." code={`<button onClick={() => show(item.msg, { type: item.type })}>{item.label}</button>`}>
          <SnackbarDemo>
            {(show) => (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Copy Link", msg: "Link copied to clipboard", type: "success" as SnackbarType },
                  { label: "Send Email", msg: "Email sent successfully", type: "success" as SnackbarType },
                  { label: "Upload", msg: "File uploaded to /documents", type: "default" as SnackbarType },
                  { label: "Delete", msg: "Moved to trash", type: "default" as SnackbarType, action: { label: "Undo", onClick: () => {} } },
                  { label: "Error", msg: "Network request failed", type: "error" as SnackbarType },
                  { label: "Warning", msg: "Session expiring in 5 minutes", type: "warning" as SnackbarType },
                ].map((item) => (
                  <button key={item.label} onClick={() => show(item.msg, { type: item.type, action: item.action })} className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.msg}</div>
                  </button>
                ))}
              </div>
            )}
          </SnackbarDemo>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}