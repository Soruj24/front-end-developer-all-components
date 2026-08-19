"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const installCommand = `npx component-library@latest add loading`;

const usageCode = `import { Spinner, ProgressBar, Skeleton } from "@/components/loading";

<Spinner size="md" />
<ProgressBar value={60} />
<Skeleton className="h-4 w-full" />`;

export default function LoadingPage() {

  

  return (
    <ComponentDocPage
      name="Loading"
      category="Elements"
      description="A comprehensive collection of loading patterns — spinners, progress bars, skeleton screens, overlays, and animations."
    >
      <PreviewPanel filename="loading-preview.tsx">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
          <header className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Loading States</h1>
              <Badge variant="primary">5 categories</Badge>
            </div>
            <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
              A comprehensive collection of loading patterns — spinners, progress
              bars, skeleton screens, overlays, and animations.
            </p>
          </header>

          <ExampleBlock
            title="Installation"
            description="Add the loading component to your project."
            code={installCommand}
            filename="terminal"
          >
            <code className="block text-sm rounded bg-muted/20 p-3 rounded">{installCommand}</code>
          </ExampleBlock>

          <ExampleBlock
            title="Usage"
            description="Basic usage examples for loading components."
            code={usageCode}
            filename="page.tsx"
          >
            <div className="space-y-3">
              <Spinner size="md" />
              <ProgressBar value={60} />
              <Skeleton className="h-4 w-full" />
            </div>
          </ExampleBlock>

          <ExampleBlock title="Spinner Variants">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center gap-2 rounded border p-3">
                <span className="text-xs text-muted-foreground">Small</span>
                <div className="h-4 w-4 animate-spin rounded border border-border border-t-blue-500" />
                <span className="text-[10px] text-muted-foreground/70">h-5 w-5</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded border p-3">
                <span className="text-xs text-muted-foreground">Medium</span>
                <div className="h-6 w-6 animate-spin rounded border-4 border-border border-t-purple-500" />
                <span className="text-[10px] text-muted-foreground/70">h-8 w-8</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded border p-3">
                <span className="text-xs text-muted-foreground">Large</span>
                <div className="h-8 w-8 animate-spin rounded border-4 border-border border-t-pink-500" />
                <span className="text-[10px] text-muted-foreground/70">h-12 w-12</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded border p-3">
                <span className="text-xs text-muted-foreground">Dual Ring</span>
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <div className="absolute h-8 w-8 animate-spin rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-400" />
                  <div className="absolute h-5 w-5 animate-[spin_0.8s_linear_infinite_reverse] rounded-full border-3 border-transparent border-b-violet-500 border-l-violet-500" />
                </div>
                <span className="text-[10px] text-muted-foreground/70">counter-rotating</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded border p-3">
                <span className="text-xs text-muted-foreground">Bouncing Dots</span>
                <div className="flex gap-2">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 animate-bounce rounded-full bg-warning"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground/70">staggered 150ms</span>
              </div>
            </div>
          </ExampleBlock>

          <ExampleBlock title="Progress Bars">
            <div className="grid grid-cols-2 gap-3">
              <div className="h-2.5 w-24 rounded bg-muted overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4 rounded-full" />
                <span className="text-xs text-muted-foreground">Indeterminate</span>
              </div>
              <div className="h-2.5 w-24 rounded bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500 w-full rounded-full" />
                <span className="text-xs text-muted-foreground">Determinate</span>
              </div>
              <div className="h-2.5 w-24 rounded bg-muted overflow-hidden">
                <div className="h-full bg-warning w-1/2 rounded-full" />
                <span className="text-xs text-muted-foreground">Warning</span>
              </div>
              <div className="h-2.5 w-24 rounded bg-muted overflow-hidden">
                <div className="h-full bg-danger w-2/3 rounded-full" />
                <span className="text-xs text-muted-foreground">Error</span>
              </div>
            </div>
          </ExampleBlock>

          <ExampleBlock title="Skeleton Screens">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded bg-muted p-4">
                <div className="h-6 w-full rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted my-2" />
                <div className="flex gap-2">
                  <div className="h-4 w-16 rounded bg-muted" />
                  <div className="h-4 w-16 rounded bg-muted" />
                </div>
                <p className="mt-2 text-center text-[10px] text-muted-foreground/70">Card Skeleton</p>
              </div>
              <div className="rounded bg-muted p-4">
                <div className="h-8 w-16 rounded bg-muted" />
                <div className="flex items-center gap-4">
                  <div className="h-5 w-24 rounded bg-muted" />
                  <div className="h-4 w-24 rounded bg-muted" />
                </div>
                <p className="mt-3 text-center text-[10px] text-muted-foreground/70">Profile Skeleton</p>
              </div>
              <div className="rounded bg-muted p-4">
                <div className="mb-3 h-5 w-2/3 rounded bg-muted" />
                <div className="mb-1 h-4 w-full rounded bg-muted" />
                <div className="mb-1 h-4 w-full rounded bg-muted" />
                <div className="mb-4 h-4 w-3/4 rounded bg-muted" />
                <p className="mt-3 text-center text-[10px] text-muted-foreground/70">Article Skeleton</p>
              </div>
              <div className="rounded bg-muted p-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="mb-1 h-6 w-10 rounded bg-muted" />
                    <div className="h-3 w-8 rounded bg-muted" />
                  </div>
                ))}
                <p className="mt-3 text-center text-[10px] text-muted-foreground/70">List Item Skeleton</p>
              </div>
            </div>
          </ExampleBlock>

          <ExampleBlock title="Overlays & Animations">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded bg-muted p-4">
                <h2 className="mb-3 font-medium">Full-Screen Overlay</h2>
                <button className="rounded bg-primary px-3 py-1.5 text-sm">Launch Overlay</button>
                <p className="mt-2 text-xs text-muted-foreground">Click backdrop or ✕ to close</p>
              </div>
              <div className="rounded bg-muted p-4">
                <h2 className="mb-3 font-medium">Inline Section Loading</h2>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/40 py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-border border-t-indigo-500" />
                  <p className="text-sm font-medium text-muted-foreground">Loading content...</p>
                  <div className="flex gap-4">
                    <div className="h-2 w-16 animate-pulse rounded bg-muted" />
                    <div className="h-2 w-24 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
              <div className="rounded bg-muted p-4">
                <h2 className="mb-3 font-medium">Button Loading State</h2>
                <button className="rounded bg-primary px-4 py-2 text-sm font-medium">Save Changes</button>
                <p className="mt-2 text-xs text-indigo-500">Simulating save...</p>
              </div>
            </div>
          </ExampleBlock>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source="// Loading component source code"
        filename="Loading.tsx"
        defaultExpanded
      />
    </ComponentDocPage>
  );
}