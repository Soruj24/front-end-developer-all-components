"use client";

import { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const DIRECTION_SOURCE = `"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/cn";

export type Direction = "ltr" | "rtl";

export interface DirectionProviderProps {
  dir?: Direction;
  children: React.ReactNode;
  className?: string;
}

const DirectionContext = createContext<Direction>("ltr");

export function useDirection() {
  return useContext(DirectionContext);
}

export function DirectionProvider({ dir = "ltr", children, className }: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      <div dir={dir} data-direction={dir} className={cn(className)}>
        {children}
      </div>
    </DirectionContext.Provider>
  );
}`;

const BASIC_CODE = `import { DirectionProvider, useDirection } from "@/components/ui";

<DirectionProvider dir="rtl">
  <YourComponent />
</DirectionProvider>

// Inside a child component:
const dir = useDirection(); // "ltr" | "rtl"`;

const HOOK_CODE = `import { useDirection } from "@/components/ui";

function MyComponent() {
  const dir = useDirection();
  return <div>Current direction: {dir}</div>;
}`;

const NESTED_CODE = `import { DirectionProvider } from "@/components/ui";

<DirectionProvider dir="ltr">
  <Header />
  <DirectionProvider dir="rtl">
    <ArabicContent />
  </DirectionProvider>
  <Footer />
</DirectionProvider>`;

const className =
  "rounded-xl border border-border bg-card p-4 shadow-sm transition-colors";

function DirectionCard({
  dir,
  label,
}: {
  dir: "ltr" | "rtl";
  label: string;
}) {
  const currentDir = useDirection();
  return (
    <DirectionProvider dir={dir} className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-semibold ${
              currentDir === "rtl"
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
            }`}
          >
            {currentDir.toUpperCase()}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground">
          <span className="font-medium">
            {currentDir === "ltr" ? "\u2190 Back" : "Forward \u2192"}
          </span>
          <span className="text-muted-foreground/40">|</span>
          <span className="font-medium">
            {currentDir === "ltr" ? "Forward" : "Back \u2190"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Text alignment: {currentDir === "ltr" ? "left" : "right"}
        </p>
      </div>
    </DirectionProvider>
  );
}

function InteractiveDemo() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(["ltr", "rtl"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDir(d)}
            className={`inline-flex h-9 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors ${
              dir === d
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {d.toUpperCase()}
          </button>
        ))}
      </div>
      <DirectionProvider dir={dir} className={className}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-6 items-center rounded-md px-2 text-xs font-semibold ${
                dir === "rtl"
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                  : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
              }`}
            >
              {dir.toUpperCase()}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Interactive
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-foreground">
            <span className="font-medium">
              {dir === "ltr" ? "\u2190 Back" : "Forward \u2192"}
            </span>
            <span className="text-muted-foreground/40">|</span>
            <span className="font-medium">
              {dir === "ltr" ? "Forward" : "Back \u2190"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Text alignment: {dir === "ltr" ? "left" : "right"}
          </p>
        </div>
      </DirectionProvider>
    </div>
  );
}

function NestedDemo() {
  return (
    <DirectionProvider dir="ltr" className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-md bg-blue-50 px-2 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-400">
            LTR
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Parent (LTR)
          </span>
        </div>
        <div className="flex flex-col gap-2 border-l-2 border-border pl-4">
          <div className="flex items-center gap-3 text-sm text-foreground">
            <span className="font-medium">\u2190 Back</span>
            <span className="text-muted-foreground/40">|</span>
            <span className="font-medium">Forward</span>
          </div>
          <DirectionProvider dir="rtl">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900 dark:bg-amber-950/50">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 items-center rounded-md bg-amber-100 px-2 text-xs font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    RTL
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Nested (RTL)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <span className="font-medium">Forward \u2192</span>
                  <span className="text-muted-foreground/40">|</span>
                  <span className="font-medium">\u2190 Back</span>
                </div>
              </div>
            </div>
          </DirectionProvider>
          <div className="flex items-center gap-3 text-sm text-foreground">
            <span className="font-medium">\u2190 Back</span>
            <span className="text-muted-foreground/40">|</span>
            <span className="font-medium">Forward</span>
          </div>
        </div>
      </div>
    </DirectionProvider>
  );
}

function HookDemo() {
  return (
    <DirectionProvider dir="rtl" className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-md bg-amber-50 px-2 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            RTL
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            useDirection() returns: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">&quot;rtl&quot;</code>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground">
          <span className="font-medium">Forward \u2192</span>
          <span className="text-muted-foreground/40">|</span>
          <span className="font-medium">\u2190 Back</span>
        </div>
      </div>
    </DirectionProvider>
  );
}

export default function DirectionPage() {
  return (
    <ComponentDocPage
      name="Direction"
      category="Utilities"
      description="Provides RTL and LTR direction context to child components via DirectionProvider and the useDirection hook. Essential for multilingual interfaces."
    >
      <PreviewPanel filename="direction-preview.tsx">
        <div className="flex w-full justify-center">
          <InteractiveDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={DIRECTION_SOURCE}
        filename="components/ui/Direction/Direction.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="LTR & RTL Side by Side"
          description="Compare left-to-right and right-to-left layouts."
          code={BASIC_CODE}
          filename="basic.tsx"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <DirectionCard dir="ltr" label="LTR" />
            <DirectionCard dir="rtl" label="RTL" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Nested Providers"
          description="Nest providers to override direction for a subtree."
          code={NESTED_CODE}
          filename="nested.tsx"
        >
          <NestedDemo />
        </ExampleBlock>

        <ExampleBlock
          title="useDirection Hook"
          description="Read the active direction from context inside a provider."
          code={HOOK_CODE}
          filename="hook.tsx"
        >
          <HookDemo />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
