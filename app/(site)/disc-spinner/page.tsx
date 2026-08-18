"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Loader2, CircleDot, RotateCw } from "lucide-react";

const installCommand = `npx component-library@latest add disc-spinner`;
const usageCode = `import { DiscSpinner } from "@/components/disc-spinner";

<DiscSpinner size="md" color="primary" />`;

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerColor = "primary" | "muted" | "blue" | "green" | "orange";

const sizeMap: Record<SpinnerSize, string> = { sm: "h-5 w-5", md: "h-8 w-8", lg: "h-12 w-12", xl: "h-16 w-16" };
const colorMap: Record<SpinnerColor, string> = { primary: "border-primary", muted: "border-muted-foreground", blue: "border-blue-500", green: "border-emerald-500", orange: "border-orange-500" };

function DiscSpinnerDemo({ size = "md", color = "primary" }: { size?: SpinnerSize; color?: SpinnerColor }) {
  return (
    <div className={`rounded-full border-2 border-t-transparent ${sizeMap[size]} ${colorMap[color]} animate-spin`} />
  );
}

function SpinnerShowcaseDemo() {
  return (
    <div className="flex items-end gap-4">
      {(["sm", "md", "lg", "xl"] as SpinnerSize[]).map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <DiscSpinnerDemo size={s} />
          <span className="text-[10px] text-muted-foreground">{s}</span>
        </div>
      ))}
    </div>
  );
}

function ColorSpinnerDemo() {
  return (
    <div className="flex gap-4">
      {(["primary", "blue", "green", "orange", "muted"] as SpinnerColor[]).map((c) => (
        <div key={c} className="flex flex-col items-center gap-2">
          <DiscSpinnerDemo color={c} />
          <span className="text-[10px] text-muted-foreground">{c}</span>
        </div>
      ))}
    </div>
  );
}

function LoadingStatesDemo() {
  const [loading, setLoading] = useState<Record<string, boolean>>({ fetch: false, save: false, delete: false });
  const actions = [
    { key: "fetch", label: "Fetch Data", color: "bg-blue-500" },
    { key: "save", label: "Save Changes", color: "bg-emerald-500" },
    { key: "delete", label: "Delete Item", color: "bg-red-500" },
  ];

  return (
    <div className="flex gap-3">
      {actions.map((a) => (
        <button
          key={a.key}
          onClick={() => { setLoading((l) => ({ ...l, [a.key]: true })); setTimeout(() => setLoading((l) => ({ ...l, [a.key]: false })), 2000); }}
          disabled={loading[a.key]}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${a.color} ${loading[a.key] ? "opacity-70" : "hover:opacity-90"}`}
        >
          {loading[a.key] && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading[a.key] ? "Loading..." : a.label}
        </button>
      ))}
    </div>
  );
}

function OverlaySpinnerDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={() => { setShow(true); setTimeout(() => setShow(false), 3000); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Show Overlay
      </button>
      <div className="relative h-32 w-64 overflow-hidden rounded-lg border bg-card">
        <div className="p-4 text-sm text-muted-foreground">Content behind overlay...</div>
        {show && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <DiscSpinnerDemo size="lg" />
              <span className="text-xs text-muted-foreground">Processing...</span>
            </div>
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
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Disc Spinner</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated disc spinner with size variants, color options, loading states, and overlay integration.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Variants</h2>
        <ComponentPreview>
          <SpinnerShowcaseDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Variants</h2>
        <ComponentPreview>
          <ColorSpinnerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Loading States</h2>
        <ComponentPreview>
          <LoadingStatesDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Overlay</h2>
        <ComponentPreview>
          <OverlaySpinnerDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg" | "xl"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">{'"primary" | "muted" | "blue" | "green" | "orange"'}</td><td className="px-4 py-3 text-muted-foreground">{'"primary"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
