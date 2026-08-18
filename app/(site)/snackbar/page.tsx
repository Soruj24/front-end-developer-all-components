"use client";

import { useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { X, Undo2, RefreshCw } from "lucide-react";

const installCommand = `npx component-library@latest add snackbar`;

const usageCode = `import { useSnackbar } from "@/components/_snackbar";

const { show, dismiss } = useSnackbar();

show({ message: "Item deleted", action: { label: "Undo", onClick: undo } });`;

let nextId = 0;

type SnackbarType = "default" | "success" | "error" | "warning";

interface SnackbarItem {
  id: number; message: string; type: SnackbarType; visible: boolean;
  action?: { label: string; onClick: () => void }; duration: number;
}

const typeStyles: Record<SnackbarType, string> = {
  default: "bg-zinc-900 text-white dark:bg-zinc-700",
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
};

export default function SnackbarPage() {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const [position, setPosition] = useState<"bottom-center" | "bottom-left" | "bottom-right" | "top-center">("bottom-center");

  const dismiss = useCallback((id: number) => {
    setSnackbars((prev) => prev.map((s) => s.id === id ? { ...s, visible: false } : s));
    setTimeout(() => setSnackbars((prev) => prev.filter((s) => s.id !== id)), 300);
  }, []);

  const show = useCallback((message: string, opts?: { type?: SnackbarType; action?: { label: string; onClick: () => void }; duration?: number }) => {
    const id = nextId++;
    const item: SnackbarItem = { id, message, type: opts?.type ?? "default", visible: true, action: opts?.action, duration: opts?.duration ?? 4000 };
    setSnackbars((prev) => [...prev, item]);
    setTimeout(() => dismiss(id), item.duration);
  }, [dismiss]);

  const posStyles: Record<string, string> = {
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
    "top-center": "top-6 left-1/2 -translate-x-1/2",
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Snackbar</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Lightweight notification bar that appears at the edge of the screen with optional actions and auto-dismiss.
        </p>
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different snackbar styles for various feedback types.</p>
        </div>
        <ComponentPreview id="snackbar-variants">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => show("File saved successfully", { type: "success" })} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Success</button>
            <button onClick={() => show("Failed to delete item", { type: "error" })} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Error</button>
            <button onClick={() => show("Disk space running low", { type: "warning" })} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">Warning</button>
            <button onClick={() => show("New message received")} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700">Default</button>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Snackbars with interactive action buttons.</p>
        </div>
        <ComponentPreview id="snackbar-actions">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => show("Item removed", { action: { label: "Undo", onClick: () => show("Restored!", { type: "success" }) } })} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">
              <Undo2 className="h-4 w-4" /> Undo
            </button>
            <button onClick={() => show("Changes discarded", { action: { label: "Reload", onClick: () => show("Reloading...", { type: "success" }) } })} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">
              <RefreshCw className="h-4 w-4" /> Reload
            </button>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Positions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Control where the snackbar appears.</p>
        </div>
        <ComponentPreview id="snackbar-positions">
          <div className="flex flex-wrap gap-2">
            {(["bottom-center", "bottom-left", "bottom-right", "top-center"] as const).map((p) => (
              <button key={p} onClick={() => { setPosition(p); show(`Position: ${p}`); }} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">{p}</button>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Duration</h2>
          <p className="mt-1 text-sm text-muted-foreground">Control how long the snackbar stays visible.</p>
        </div>
        <ComponentPreview id="snackbar-duration">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => show("Quick flash (1s)", { duration: 1000 })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">1s</button>
            <button onClick={() => show("Default (4s)", { duration: 4000 })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">4s</button>
            <button onClick={() => show("Persistent (8s)", { duration: 8000 })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">8s</button>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">Real-world snackbar scenarios.</p>
        </div>
        <ComponentPreview id="snackbar-usecases">
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
        </ComponentPreview>
      </section>

      {/* Live snackbar display */}
      {snackbars.length > 0 && (
        <div className={`fixed z-50 flex flex-col gap-2 ${posStyles[position]}`}>
          {snackbars.map((s) => (
            <div key={s.id} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ${s.visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${typeStyles[s.type]} min-w-[280px] max-w-[400px]`}>
              <span className="flex-1">{s.message}</span>
              {s.action && (
                <button onClick={() => { s.action!.onClick(); dismiss(s.id); }} className="whitespace-nowrap rounded bg-white/20 px-2 py-0.5 text-xs font-semibold hover:bg-white/30">{s.action.label}</button>
              )}
              <button onClick={() => dismiss(s.id)} className="text-white/70 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}

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
              {[
                { prop: "message", type: "string", def: "-", req: "Yes" },
                { prop: "type", type: "\"default\" | \"success\" | \"error\" | \"warning\"", def: "\"default\"", req: "No" },
                { prop: "duration", type: "number", def: "4000", req: "No" },
                { prop: "action", type: "{ label: string; onClick: () => void }", def: "-", req: "No" },
                { prop: "position", type: "\"bottom-center\" | \"bottom-left\" | \"bottom-right\" | \"top-center\"", def: "\"bottom-center\"", req: "No" },
              ].map((row) => (
                <tr key={row.prop} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.def}</td>
                  <td className="px-4 py-3">{row.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
