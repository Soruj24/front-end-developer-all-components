"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add skeleton`;

const usageCode = `function Skeleton({ className }) {
  return <div className={\`animate-pulse bg-muted rounded \${className}\`} />;
}

// Usage
<Skeleton className="h-4 w-72" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-36 w-full rounded-lg" />`;

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

const wordWidths = ["w-12", "w-16", "w-10", "w-20", "w-14", "w-8", "w-18", "w-12", "w-16", "w-10", "w-14", "w-8", "w-20", "w-12", "w-10", "w-16"];

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setLoading(true);
    setVisible(false);
    setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 2000);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Skeleton Loading</h1>
          <Badge variant="primary">6 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Skeleton placeholders for text, media, cards, tables, lists, and an
          interactive load/loaded swap. Use the tabs to switch between the live
          preview, source code, CLI, installation, and dependency details for
          each example.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Text Skeletons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Text Skeletons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Skeleton placeholders for text content.
          </p>
        </div>
        <ComponentPreview id="skeleton-text">
        <div className="w-full space-y-6">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Single Line</h2>
            <SkeletonBlock className="h-4 w-72" />
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Multi-Line</h2>
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-4 w-5/6" />
              <SkeletonBlock className="h-4 w-2/3" />
              <SkeletonBlock className="h-4 w-4/5" />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Heading + Body</h2>
            <div className="space-y-3">
              <SkeletonBlock className="h-6 w-1/3" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-3/4" />
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Word-Level</h2>
            <div className="flex flex-wrap gap-1.5">
              {wordWidths.map((w, i) => (
                <SkeletonBlock key={i} className={`h-4 ${w}`} />
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Media Skeletons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Media Skeletons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Skeleton placeholders for media content.
          </p>
        </div>
        <ComponentPreview id="skeleton-media">
        <div className="w-full space-y-6">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Image Placeholders</h2>
            <div className="flex flex-wrap gap-4">
              <div>
                <SkeletonBlock className="h-28 w-48" />
                <p className="mt-1 text-xs text-muted-foreground/70">16:9</p>
              </div>
              <div>
                <SkeletonBlock className="h-24 w-24" />
                <p className="mt-1 text-xs text-muted-foreground/70">1:1</p>
              </div>
              <div>
                <SkeletonBlock className="h-24 w-24 rounded-full" />
                <p className="mt-1 text-xs text-muted-foreground/70">Circle</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Video Player</h2>
            <div className="space-y-2">
              <SkeletonBlock className="h-40 w-full" />
              <div className="flex gap-2">
                <SkeletonBlock className="h-2 flex-1" />
                <SkeletonBlock className="h-2 w-16" />
              </div>
              <div className="flex gap-2">
                <SkeletonBlock className="h-6 w-8" />
                <SkeletonBlock className="h-6 w-8" />
                <SkeletonBlock className="h-6 w-8" />
                <SkeletonBlock className="h-6 w-8" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Avatar Sizes</h2>
            <div className="flex items-end gap-4">
              <div className="text-center">
                <SkeletonBlock className="h-6 w-6 rounded-full" />
                <p className="mt-1 text-xs text-muted-foreground/70">xs</p>
              </div>
              <div className="text-center">
                <SkeletonBlock className="h-8 w-8 rounded-full" />
                <p className="mt-1 text-xs text-muted-foreground/70">sm</p>
              </div>
              <div className="text-center">
                <SkeletonBlock className="h-10 w-10 rounded-full" />
                <p className="mt-1 text-xs text-muted-foreground/70">md</p>
              </div>
              <div className="text-center">
                <SkeletonBlock className="h-14 w-14 rounded-full" />
                <p className="mt-1 text-xs text-muted-foreground/70">lg</p>
              </div>
              <div className="text-center">
                <SkeletonBlock className="h-20 w-20 rounded-full" />
                <p className="mt-1 text-xs text-muted-foreground/70">xl</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Card Skeletons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Card Skeletons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Skeleton placeholders for card layouts.
          </p>
        </div>
        <ComponentPreview id="skeleton-cards">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-white p-4 shadow-sm dark:border-border dark:bg-zinc-900">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Blog Card</h2>
            <div className="animate-pulse space-y-3">
              <SkeletonBlock className="h-36 w-full rounded-lg" />
              <SkeletonBlock className="h-5 w-3/4" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-5/6" />
              <div className="flex gap-3 pt-1">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-3 w-16" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-white p-4 shadow-sm dark:border-border dark:bg-zinc-900">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Card</h2>
            <div className="animate-pulse space-y-3">
              <SkeletonBlock className="h-36 w-full rounded-lg" />
              <SkeletonBlock className="h-5 w-2/3" />
              <SkeletonBlock className="h-4 w-16" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonBlock key={i} className="h-4 w-4" />
                ))}
                <SkeletonBlock className="h-4 w-8 ml-1" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-white p-4 shadow-sm dark:border-border dark:bg-zinc-900">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profile Card</h2>
            <div className="animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <SkeletonBlock className="h-4 w-28" />
                  <SkeletonBlock className="h-3 w-40" />
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 text-center">
                    <SkeletonBlock className="h-5 w-8 mx-auto" />
                    <SkeletonBlock className="h-3 w-12 mx-auto mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-white p-4 shadow-sm dark:border-border dark:bg-zinc-900">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dashboard Stat</h2>
            <div className="animate-pulse space-y-3">
              <div className="flex items-start justify-between">
                <SkeletonBlock className="h-10 w-10 rounded-lg" />
                <SkeletonBlock className="h-6 w-16" />
              </div>
              <SkeletonBlock className="h-8 w-20" />
              <div className="flex gap-2">
                <SkeletonBlock className="h-3 w-24" />
                <SkeletonBlock className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Table Skeleton */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Table Skeleton</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Skeleton placeholder for table layouts.
          </p>
        </div>
        <ComponentPreview id="skeleton-table">
        <div className="w-full animate-pulse space-y-2 overflow-x-auto">
          <div className="flex gap-4 border-b border-border pb-3 dark:border-border">
            <SkeletonBlock className="h-4 w-8" />
            <SkeletonBlock className="h-4 w-40" />
            <SkeletonBlock className="h-4 flex-1" />
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-4 w-20" />
          </div>
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="flex items-center gap-4 border-b border-border py-3 dark:border-border">
              <SkeletonBlock className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1">
                <SkeletonBlock className="h-3 w-32" />
                <SkeletonBlock className="h-2 w-20" />
              </div>
              <SkeletonBlock className="h-3 w-28" />
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </ComponentPreview>

      {/* List Skeletons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">List Skeletons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Skeleton placeholders for list layouts.
          </p>
        </div>
        <ComponentPreview id="skeleton-list">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Horizontal Avatar List</h2>
            <div className="animate-pulse flex gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <SkeletonBlock className="h-12 w-12 rounded-full" />
                  <SkeletonBlock className="h-3 w-14" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vertical Contact List</h2>
            <div className="animate-pulse space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                  <SkeletonBlock className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <SkeletonBlock className="h-3 w-28" />
                    <SkeletonBlock className="h-2 w-44" />
                  </div>
                  <SkeletonBlock className="h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Notification List</h2>
            <div className="animate-pulse space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3 dark:border-border">
                  <SkeletonBlock className="h-8 w-8 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <SkeletonBlock className="h-3 w-48" />
                    <SkeletonBlock className="h-2 w-36" />
                  </div>
                  <SkeletonBlock className="h-2 w-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Interactive Demo */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Interactive skeleton loading demonstration.
          </p>
        </div>
        <ComponentPreview id="skeleton-interactive">
        <div className="w-full space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggle}
              className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted"
            >
              {loading ? "Loading..." : "Reload"}
            </button>
            <span className="text-sm text-muted-foreground">
              Status:{" "}
              <span className={`font-medium ${loading ? "text-warning" : "text-emerald-500"}`}>
                {loading ? "Loading" : "Loaded"}
              </span>
            </span>
          </div>

          {loading ? (
            <div className="rounded-lg border border-border p-6 dark:border-border">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <SkeletonBlock className="h-14 w-14 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBlock className="h-5 w-40" />
                    <SkeletonBlock className="h-3 w-56" />
                  </div>
                </div>
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
                <SkeletonBlock className="h-4 w-2/3" />
                <div className="flex gap-2 pt-1">
                  <SkeletonBlock className="h-8 w-20 rounded-lg" />
                  <SkeletonBlock className="h-8 w-28 rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            visible && (
              <div className="rounded-lg border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                    JD
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-muted dark:text-zinc-900">View Profile</button>
                  <button className="rounded-lg border border-border px-4 py-2 text-sm dark:border-border">Send Message</button>
                </div>
              </div>
            )
          )}
        </div>
      </ComponentPreview>

      {/* API Reference */}
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
