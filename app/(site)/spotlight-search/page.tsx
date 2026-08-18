"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SpotlightSearch, type SpotlightItem } from "@/components/ui";
import {
  allSpotlightItems,
  quickSpotlightItems,
} from "@/components/spotlight-search/demo";

const installCommand = `npx component-library@latest add spotlight-search`;

const usageCode = `import { SpotlightSearch } from "@/components/ui";

<SpotlightSearch
  items={spotlightItems}
  open={open}
  onOpenChange={setOpen}
  storageKey="spotlight"
/>`;

function wireActions(items: SpotlightItem[], onRun: (label: string) => void): SpotlightItem[] {
  return items.map((item) => ({
    ...item,
    onSelect: () => onRun(item.label),
  }));
}

function TriggerButton({
  label,
  onOpen,
  kbd,
}: {
  label: string;
  onOpen: () => void;
  kbd?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-card transition-colors hover:text-foreground"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        />
      </svg>
      {label}
      {kbd && (
        <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
          Ctrl K
        </kbd>
      )}
    </button>
  );
}

function SearchBarTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground shadow-card transition-colors hover:border-ring/60 hover:text-foreground"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        />
      </svg>
      <span className="flex-1 text-left">Search apps, files, actions…</span>
      <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
        Ctrl K
      </kbd>
    </button>
  );
}

function ActionHint({ lastAction }: { lastAction: string | null }) {
  return (
    <p className="min-h-5 text-xs text-subtle">
      {lastAction ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-success">●</span> Last opened: {lastAction}
        </span>
      ) : (
        "Open a result to see it run."
      )}
    </p>
  );
}

export default function SpotlightSearchPage() {
  const [openFull, setOpenFull] = useState(false);
  const [openQuick, setOpenQuick] = useState(false);
  const [openTrigger, setOpenTrigger] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const fullItems = wireActions(allSpotlightItems, setLastAction);
  const quickItems = wireActions(quickSpotlightItems, setLastAction);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Spotlight Search
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An animated, macOS-style search dialog. Instant filtering with
          highlighted matches, category sections, persisted recents and a
          Popular row, a global Ctrl+K shortcut, and full keyboard navigation —
          it collapses to a bottom sheet on small screens.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Full Spotlight</h3>
            <p className="text-sm text-muted-foreground">Complete search with categories, recents, and keyboard shortcuts.</p>
          </div>
          <ComponentPreview id="spotlight-search-full">
            <div className="flex w-full flex-col items-center gap-4 py-6">
              <TriggerButton label="Search everything" onOpen={() => setOpenFull(true)} kbd />
              <ActionHint lastAction={lastAction} />
              <SpotlightSearch
                items={fullItems}
                open={openFull}
                onOpenChange={setOpenFull}
                storageKey="page:spotlight-search-full"
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Quick Launch</h3>
            <p className="text-sm text-muted-foreground">Compact variant with custom width and height.</p>
          </div>
          <ComponentPreview id="spotlight-search-quick">
            <div className="flex w-full flex-col items-center gap-4 py-6">
              <TriggerButton label="Launch quickly" onOpen={() => setOpenQuick(true)} />
              <ActionHint lastAction={lastAction} />
              <SpotlightSearch
                items={quickItems}
                open={openQuick}
                onOpenChange={setOpenQuick}
                placeholder="Type an app or action..."
                width={440}
                maxHeight={340}
                storageKey="page:spotlight-search-quick"
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Custom Trigger</h3>
            <p className="text-sm text-muted-foreground">Use a custom trigger button with shortcut disabled.</p>
          </div>
          <ComponentPreview id="spotlight-search-trigger">
            <div className="flex w-full flex-col items-center gap-6 py-6">
              <SearchBarTrigger onOpen={() => setOpenTrigger(true)} />
              <p className="text-xs text-subtle">
                Built-in shortcut disabled — the trigger controls when it opens.
              </p>
              <SpotlightSearch
                items={fullItems}
                open={openTrigger}
                onOpenChange={setOpenTrigger}
                bindShortcut={false}
                storageKey="page:spotlight-search-trigger"
              />
            </div>
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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">SpotlightItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onOpenChange</td>
                <td className="px-4 py-3 text-muted-foreground">(open: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Search...&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">560</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxHeight</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">440</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">storageKey</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">bindShortcut</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
