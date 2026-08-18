"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Circle, CheckCircle2, AlertCircle, XCircle, Clock, Loader2 } from "lucide-react";

const installCommand = `npx component-library@latest add status-badge`;

const usageCode = `import { StatusBadge } from "@/components/status-badge";

<StatusBadge status="active" label="Online" />
<StatusBadge status="warning" label="Away" />
<StatusBadge status="error" label="Offline" />`;

const statuses = [
  { key: "active", label: "Active", icon: CheckCircle2, dotClass: "bg-emerald-500", ringClass: "ring-emerald-500/20", textClass: "text-emerald-700 dark:text-emerald-400", bgClass: "bg-emerald-500/10" },
  { key: "warning", label: "Away", icon: AlertCircle, dotClass: "bg-amber-500", ringClass: "ring-amber-500/20", textClass: "text-amber-700 dark:text-amber-400", bgClass: "bg-amber-500/10" },
  { key: "error", label: "Offline", icon: XCircle, dotClass: "bg-red-500", ringClass: "ring-red-500/20", textClass: "text-red-700 dark:text-red-400", bgClass: "bg-red-500/10" },
  { key: "info", label: "Pending", icon: Clock, dotClass: "bg-blue-500", ringClass: "ring-blue-500/20", textClass: "text-blue-700 dark:text-blue-400", bgClass: "bg-blue-500/10" },
  { key: "neutral", label: "Draft", icon: Circle, dotClass: "bg-gray-400", ringClass: "ring-gray-400/20", textClass: "text-gray-600 dark:text-gray-400", bgClass: "bg-gray-400/10" },
];

const users = [
  { name: "Sarah Chen", role: "Admin", status: "active", avatar: "SC" },
  { name: "Marcus Johnson", role: "Editor", status: "active", avatar: "MJ" },
  { name: "Aria Patel", role: "Viewer", status: "warning", avatar: "AP" },
  { name: "Tom Wilson", role: "Contributor", status: "error", avatar: "TW" },
  { name: "Luna Kim", role: "Admin", status: "info", avatar: "LK" },
];

export default function StatusBadgePage() {
  const [selectedStatus, setSelectedStatus] = useState("active");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Status Badge</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Visual status indicators with animated dots, icons, and color-coded states. Ideal for user presence, task status, and system health.
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

      <ComponentPreview id="status-badge-basic">
        <div className="flex flex-wrap items-center gap-3">
          {statuses.map((s) => (
            <span
              key={s.key}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${s.textClass} ${s.bgClass}`}
            >
              <span className={`h-2 w-2 rounded-full ${s.dotClass}`} />
              {s.label}
            </span>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="status-badge-animated">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-700 dark:text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Recording
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-700 dark:text-amber-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Streaming
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview id="status-badge-with-users">
        <div className="flex w-full flex-col gap-3">
          {users.map((user) => {
            const status = statuses.find((s) => s.key === user.status)!;
            return (
              <div key={user.name} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.textClass} ${status.bgClass}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`} />
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      </ComponentPreview>

      <ComponentPreview id="status-badge-interactive">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s.key}
                onClick={() => setSelectedStatus(s.key)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedStatus === s.key
                    ? `${s.bgClass} ${s.textClass} ring-2 ${s.ringClass}`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            {(() => {
              const s = statuses.find((st) => st.key === selectedStatus)!;
              const Icon = s.icon;
              return (
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${s.textClass} ${s.bgClass}`}>
                  <Icon className="h-3 w-3" />
                  {s.label}
                </span>
              );
            })()}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="status-badge-compact">
        <div className="flex flex-wrap items-center gap-4">
          {statuses.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${s.dotClass}`} />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </span>
          ))}
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;active&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;info&quot; | &quot;neutral&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
