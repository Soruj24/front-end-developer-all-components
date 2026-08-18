"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Loader2,
  CircleDot,
  RotateCw,
  Upload,
  Download,
  Save,
  Trash2,
  RefreshCw,
  Check,
  X,
  Search,
  Send,
} from "lucide-react";

const installCommand = `npx component-library@latest add disc-spinner`;
const usageCode = `import { DiscSpinner } from "@/components/disc-spinner";

<DiscSpinner size="md" color="primary" />`;

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerColor = "primary" | "muted" | "blue" | "green" | "orange" | "red" | "purple";

const sizeMap: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};
const colorMap: Record<SpinnerColor, string> = {
  primary: "border-primary",
  muted: "border-muted-foreground",
  blue: "border-blue-500",
  green: "border-emerald-500",
  orange: "border-orange-500",
  red: "border-red-500",
  purple: "border-purple-500",
};

function DiscSpinner({
  size = "md",
  color = "primary",
  className = "",
}: {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full border-2 border-t-transparent ${sizeMap[size]} ${colorMap[color]} animate-spin ${className}`}
    />
  );
}

function SizeVariantsDemo() {
  return (
    <div className="flex items-end gap-6">
      {(["sm", "md", "lg", "xl"] as SpinnerSize[]).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <DiscSpinner size={s} />
          <span className="text-[10px] text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  );
}

function ColorVariantsDemo() {
  return (
    <div className="flex gap-5">
      {(["primary", "blue", "green", "orange", "red", "purple", "muted"] as SpinnerColor[]).map((c) => (
        <div key={c} className="flex flex-col items-center gap-2">
          <DiscSpinner color={c} />
          <span className="text-[10px] text-muted-foreground">{c}</span>
        </div>
      ))}
    </div>
  );
}

function ButtonLoadingDemo() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const buttons = [
    { key: "save", label: "Save Changes", icon: Save, color: "bg-foreground text-background hover:bg-foreground/90" },
    { key: "upload", label: "Upload File", icon: Upload, color: "bg-blue-500 text-white hover:bg-blue-600" },
    { key: "send", label: "Send Message", icon: Send, color: "bg-emerald-500 text-white hover:bg-emerald-600" },
    { key: "delete", label: "Delete Item", icon: Trash2, color: "bg-red-500 text-white hover:bg-red-600" },
  ];

  const handleClick = (key: string) => {
    setLoading((l) => ({ ...l, [key]: true }));
    setTimeout(() => setLoading((l) => ({ ...l, [key]: false })), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => handleClick(b.key)}
          disabled={loading[b.key]}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:opacity-70 ${b.color}`}
        >
          {loading[b.key] ? (
            <>
              <DiscSpinner size="sm" color="primary" className="border-current border-t-transparent" />
              Loading...
            </>
          ) : (
            <>
              <b.icon className="h-4 w-4" />
              {b.label}
            </>
          )}
        </button>
      ))}
    </div>
  );
}

function CardLoadingDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">User Profile</h3>
            <button
              onClick={() => setLoading(!loading)}
              className="rounded-md border border-black/[.08] px-2 py-1 text-[10px] font-medium hover:bg-muted dark:border-white/[.145]"
            >
              {loading ? "Show" : "Reload"}
            </button>
          </div>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <DiscSpinner size="lg" color="primary" />
              <span className="text-xs text-muted-foreground">Loading profile...</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-bold">
                SC
              </div>
              <div>
                <p className="text-sm font-bold">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">sarah@example.com</p>
                <p className="text-[10px] text-muted-foreground">Pro plan · Joined Jan 2024</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TableLoadingDemo() {
  const [loading, setLoading] = useState(true);
  const rows = [
    { name: "Invoice #1042", amount: "$1,200.00", status: "Paid" },
    { name: "Invoice #1041", amount: "$850.00", status: "Pending" },
    { name: "Invoice #1040", amount: "$2,300.00", status: "Paid" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Recent Invoices</h3>
          <button
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
            className="inline-flex items-center gap-1.5 rounded-md border border-black/[.08] px-2.5 py-1 text-[10px] font-medium hover:bg-muted dark:border-white/[.145]"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[.06] dark:border-white/[.1]">
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Invoice</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[.06] dark:divide-white/[.08]">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={3} className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <DiscSpinner size="sm" color="muted" />
                      <span className="text-xs text-muted-foreground">Loading...</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              rows.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-2.5 text-xs font-medium">{row.name}</td>
                  <td className="px-4 py-2.5 text-xs font-mono">{row.amount}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      row.status === "Paid" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageLoadingDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => { setShow(true); setTimeout(() => setShow(false), 3000); }}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
      >
        <Loader2 className="h-4 w-4" />
        Simulate Page Load
      </button>
      <div className="relative h-48 w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
        <div className="p-4">
          <div className="mb-3 h-4 w-32 rounded bg-muted" />
          <div className="mb-2 h-3 w-full rounded bg-muted/50" />
          <div className="mb-2 h-3 w-3/4 rounded bg-muted/50" />
          <div className="h-3 w-1/2 rounded bg-muted/50" />
        </div>
        {show && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <DiscSpinner size="xl" />
            <span className="mt-3 text-sm font-medium text-muted-foreground">Loading page...</span>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadProgressDemo() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startUpload = () => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 500);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex flex-col items-center gap-4">
          {uploading ? (
            <>
              <div className="relative">
                <DiscSpinner size="xl" color="blue" />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-500">
                  {Math.min(100, Math.round(progress))}%
                </span>
              </div>
              <div className="w-full">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Uploading...</span>
                  <span className="text-[10px] text-muted-foreground">{Math.min(100, Math.round(progress))}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
              </div>
            </>
          ) : progress >= 100 ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/30">
                <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">Upload Complete</p>
                <p className="text-xs text-muted-foreground">File uploaded successfully</p>
              </div>
              <button onClick={() => { setProgress(0); startUpload(); }} className="rounded-lg border border-black/[.08] px-4 py-2 text-xs font-medium hover:bg-muted dark:border-white/[.145]">
                Upload Another
              </button>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">Upload File</p>
                <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
              </div>
              <button onClick={startUpload} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90">
                Start Upload
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function OverlaySpinnerDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => { setShow(true); setTimeout(() => setShow(false), 3000); }}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
      >
        Show Overlay
      </button>
      <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
        <div className="p-4">
          <h4 className="text-sm font-bold">Dashboard</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            This content is behind the loading overlay. The spinner blocks interaction
            while data is being fetched.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 rounded bg-muted/50" />
            ))}
          </div>
        </div>
        {show && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <DiscSpinner size="lg" color="primary" />
            <span className="mt-2 text-xs font-medium text-muted-foreground">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiscSpinnerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Disc Spinner
          </h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated disc spinner with size variants, color options, loading states, and overlay
          integration.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Size Variants</h3>
          <p className="text-sm text-muted-foreground">
            Four sizes from small to extra-large.
          </p>
          <ComponentPreview id="spinner-sizes">
            <SizeVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color Variants</h3>
          <p className="text-sm text-muted-foreground">
            Seven color options to match any design.
          </p>
          <ComponentPreview id="spinner-colors">
            <ColorVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Button Loading</h3>
          <p className="text-sm text-muted-foreground">
            Spinners inside buttons for action feedback.
          </p>
          <ComponentPreview id="spinner-buttons">
            <ButtonLoadingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Card Loading</h3>
          <p className="text-sm text-muted-foreground">
            Spinner inside a card while content loads.
          </p>
          <ComponentPreview id="spinner-card">
            <CardLoadingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Table Loading</h3>
          <p className="text-sm text-muted-foreground">
            Row-level spinners in a data table.
          </p>
          <ComponentPreview id="spinner-table">
            <TableLoadingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Page Loading</h3>
          <p className="text-sm text-muted-foreground">
            Full-page loading overlay with spinner.
          </p>
          <ComponentPreview id="spinner-page">
            <PageLoadingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Upload Progress</h3>
          <p className="text-sm text-muted-foreground">
            Spinner with percentage counter during file upload.
          </p>
          <ComponentPreview id="spinner-upload">
            <UploadProgressDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Overlay</h3>
          <p className="text-sm text-muted-foreground">
            Blurred overlay that blocks interaction.
          </p>
          <ComponentPreview id="spinner-overlay">
            <OverlaySpinnerDemo />
          </ComponentPreview>
        </div>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\" | \"xl\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"primary\" | \"muted\" | \"blue\" | \"green\" | \"orange\" | \"red\" | \"purple\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"primary\""}</td>
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
