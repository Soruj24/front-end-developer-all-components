"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import ComponentPreview from "@/components/preview";
import CodeBlock from "@/components/home/CodeBlock";
import { Bell, CheckCircle, AlertCircle, XCircle, Info, X, RotateCcw } from "lucide-react";

const installCommand = "npx ui-add toast-alert";
const usageCode = `import { Toast } from "@/components/ui/toast-alert";

<Toast variant="success" message="Operation completed!" />
`;

function Toast({ variant, message, onClose }: { variant: "success" | "error" | "warning" | "info"; message: string; onClose?: () => void }) {
  const config = {
    success: { icon: CheckCircle, bg: "bg-green-500/10 border-green-500/50", text: "text-green-700" },
    error: { icon: XCircle, bg: "bg-red-500/10 border-red-500/50", text: "text-red-700" },
    warning: { icon: AlertCircle, bg: "bg-yellow-500/10 border-yellow-500/50", text: "text-yellow-700" },
    info: { icon: Info, bg: "bg-blue-500/10 border-blue-500/50", text: "text-blue-700" },
  };

  const Icon = config[variant].icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${config[variant].bg} ${config[variant].text}`}>
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      {onClose && (
        <button onClick={onClose} className="shrink-0 hover:opacity-70">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function SuccessToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts([...toasts, { id, message: "Your changes have been saved successfully!" }]);
    setTimeout(() => setToasts(toasts.filter((t) => t.id !== id)), 3000);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <button
        onClick={addToast}
        className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        Show Success Toast
      </button>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant="success"
            message={toast.message}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

function ErrorToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts([...toasts, { id, message: "Something went wrong. Please try again." }]);
    setTimeout(() => setToasts(toasts.filter((t) => t.id !== id)), 3000);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <button
        onClick={addToast}
        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        Show Error Toast
      </button>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant="error"
            message={toast.message}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

function WarningToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts([...toasts, { id, message: "Your session will expire in 5 minutes." }]);
    setTimeout(() => setToasts(toasts.filter((t) => t.id !== id)), 3000);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <button
        onClick={addToast}
        className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
      >
        Show Warning Toast
      </button>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant="warning"
            message={toast.message}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

function InfoToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts([...toasts, { id, message: "A new version is available for download." }]);
    setTimeout(() => setToasts(toasts.filter((t) => t.id !== id)), 3000);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <button
        onClick={addToast}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Show Info Toast
      </button>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant="info"
            message={toast.message}
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

function PromiseToast() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const simulatePromise = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus(Math.random() > 0.5 ? "success" : "error");
    }, 2000);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <button
        onClick={simulatePromise}
        disabled={status === "loading"}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Processing..." : "Simulate Promise"}
      </button>
      {status === "loading" && (
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-blue-500/10 border-blue-500/50 text-blue-700">
          <RotateCcw className="h-5 w-5 animate-spin shrink-0" />
          <span className="text-sm">Loading...</span>
        </div>
      )}
      {status === "success" && (
        <Toast variant="success" message="Promise resolved successfully!" onClose={() => setStatus("idle")} />
      )}
      {status === "error" && (
        <Toast variant="error" message="Promise rejected with an error." onClose={() => setStatus("idle")} />
      )}
    </div>
  );
}

function ActionToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts([...toasts, { id, message: "Item deleted. " }]);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <button
        onClick={addToast}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Delete Item
      </button>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 p-4 rounded-lg border bg-card"
          >
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            <span className="flex-1 text-sm">{toast.message}</span>
            <button className="text-sm text-primary hover:underline shrink-0">
              Undo
            </button>
            <button
              onClick={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
              className="shrink-0 hover:opacity-70"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedToasts() {
  const [toasts, setToasts] = useState<{ id: number; variant: "success" | "error" | "warning" | "info"; message: string }[]>([]);

  const addToast = (variant: "success" | "error" | "warning" | "info") => {
    const id = Date.now();
    const messages = {
      success: "Operation completed successfully!",
      error: "An error occurred.",
      warning: "Please check your input.",
      info: "Here is some information.",
    };
    setToasts([...toasts, { id, variant, message: messages[variant] }]);
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addToast("success")}
          className="px-3 py-1 rounded bg-green-500 text-white text-sm hover:bg-green-600"
        >
          Success
        </button>
        <button
          onClick={() => addToast("error")}
          className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
        >
          Error
        </button>
        <button
          onClick={() => addToast("warning")}
          className="px-3 py-1 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600"
        >
          Warning
        </button>
        <button
          onClick={() => addToast("info")}
          className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600"
        >
          Info
        </button>
      </div>
      <div className="space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ToastAlertPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Toast Alert</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Notification toasts for success, error, warning, and info messages.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Success Toast</h3>
            <ComponentPreview>
              <SuccessToast />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Error Toast</h3>
            <ComponentPreview>
              <ErrorToast />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Warning Toast</h3>
            <ComponentPreview>
              <WarningToast />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Info Toast</h3>
            <ComponentPreview>
              <InfoToast />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Promise Toast</h3>
            <ComponentPreview>
              <PromiseToast />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Action Toast</h3>
            <ComponentPreview>
              <ActionToast />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Stacked Toasts</h3>
            <ComponentPreview>
              <StackedToasts />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">variant</td>
                <td className="py-2">"success" | "error" | "warning" | "info"</td>
                <td className="py-2">"info"</td>
                <td className="py-2">Visual style of the toast</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">message</td>
                <td className="py-2">string</td>
                <td className="py-2">required</td>
                <td className="py-2">Toast message content</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">duration</td>
                <td className="py-2">number</td>
                <td className="py-2">3000</td>
                <td className="py-2">Auto-dismiss duration in ms</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">onClose</td>
                <td className="py-2">() =&gt; void</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Callback when toast is closed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
