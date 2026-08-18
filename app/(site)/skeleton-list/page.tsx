"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { RefreshCw } from "lucide-react";

const installCommand = `npx component-library@latest add skeleton-list`;

const usageCode = `import { SkeletonList } from "@/components/_skeleton-list";

<SkeletonList rows={5} />
<SkeletonList rows={3} variant="avatar" />
<SkeletonList rows={4} variant="card" />`;

function SkeletonLine({ width = "100%", height = "0.75rem" }: { width?: string; height?: string }) {
  return <div className="animate-pulse rounded bg-muted" style={{ width, height }} />;
}

function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <div className="animate-pulse rounded-full bg-muted" style={{ width: size, height: size }} />;
}

function ListSkeleton({ rows = 5, variant = "simple" }: { rows?: number; variant?: "simple" | "avatar" | "icon" | "card" | "notification" }) {
  if (variant === "simple") {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonLine width={`${60 + (i * 7) % 35}%`} height="0.875rem" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonAvatar size={36} />
            <div className="flex-1 space-y-1.5">
              <SkeletonLine width="40%" height="0.875rem" />
              <SkeletonLine width="65%" height="0.625rem" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="animate-pulse rounded-lg bg-muted p-2"><div className="h-4 w-4 rounded bg-muted-foreground/20" /></div>
            <SkeletonLine width={`${50 + (i * 11) % 40}%`} height="0.875rem" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="rounded-xl border border-border p-4 dark:border-border">
            <div className="flex items-start gap-3">
              <SkeletonAvatar size={44} />
              <div className="flex-1 space-y-2">
                <SkeletonLine width="50%" height="1rem" />
                <SkeletonLine width="80%" height="0.625rem" />
                <SkeletonLine width="60%" height="0.625rem" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-3 dark:border-border">
          <SkeletonAvatar size={32} />
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <SkeletonLine width="30%" height="0.75rem" />
              <SkeletonLine width="15%" height="0.625rem" />
            </div>
            <SkeletonLine width="70%" height="0.625rem" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SkeletonListPage() {
  const [rows, setRows] = useState(5);
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState<"simple" | "avatar" | "icon" | "card" | "notification">("avatar");

  const reset = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Skeleton List</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          List-shaped skeleton loaders for content placeholders. Multiple variants for simple text, avatars, icons, cards, and notifications.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Toggle loading states with different variants.</p>
        </div>
        <ComponentPreview id="skeleton-list-interactive">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {(["simple", "avatar", "icon", "card", "notification"] as const).map((v) => (
                <button key={v} onClick={() => setVariant(v)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${variant === v ? "bg-foreground text-background dark:bg-muted dark:text-foreground" : "border border-border hover:bg-muted dark:border-border dark:hover:bg-muted"}`}>
                  {v}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Rows <input type="range" min={1} max={10} value={rows} onChange={(e) => setRows(+e.target.value)} className="w-20" /> <span className="w-4 text-right text-xs font-mono">{rows}</span>
              </label>
              <button onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">
                <RefreshCw className="h-3 w-3" /> Reload
              </button>
            </div>
            <div className="rounded-xl border border-border p-4 dark:border-border">
              {loading ? <ListSkeleton rows={rows} variant={variant} /> : <div className="text-sm text-muted-foreground">Content loaded!</div>}
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">All Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Overview of all list skeleton styles.</p>
        </div>
        <ComponentPreview id="skeleton-list-all">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Simple</h3>
              <ListSkeleton rows={4} variant="simple" />
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">With Avatar</h3>
              <ListSkeleton rows={4} variant="avatar" />
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">With Icon</h3>
              <ListSkeleton rows={4} variant="icon" />
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Card</h3>
              <ListSkeleton rows={3} variant="card" />
            </div>
            <div className="sm:col-span-2">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notification</h3>
              <ListSkeleton rows={4} variant="notification" />
            </div>
          </div>
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
              {[
                { prop: "rows", type: "number", def: "5", req: "No" },
                { prop: "variant", type: "\"simple\" | \"avatar\" | \"icon\" | \"card\" | \"notification\"", def: "\"simple\"", req: "No" },
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
