"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { SpotlightSearch, type SpotlightItem } from "@/components/ui";
import {
  allSpotlightItems,
  quickSpotlightItems,
} from "@/components/spotlight-search/demo";

const SPOTLIGHT_SOURCE = `"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { SpotlightItem, SpotlightSearchProps } from "./SpotlightSearch.types";
import { readList, writeList, buildSections } from "./SpotlightSearch.utils";
import { SpotlightSearchBar, SpotlightResults, SpotlightFooter } from "./SpotlightSearchPieces2";

export function SpotlightSearch({ items, open: openProp, defaultOpen = false, onOpenChange, placeholder = "Search files, apps, actions...", emptyMessage = "No results found", storageKey = "spotlight-search", recentLimit = 5, width = 560, maxHeight = 420, bindShortcut = true, className }: SpotlightSearchProps) {
  // ... state management, keyboard navigation, animations
  // Portal to document.body, backdrop-blur-sm overlay, rounded-2xl panel
  // See full source in SpotlightSearch.tsx
}`;

function wireActions(
  items: SpotlightItem[],
  onRun: (label: string) => void,
): SpotlightItem[] {
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
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-muted hover:text-foreground hover:shadow-md hover:shadow-primary/5"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        />
      </svg>
      {label}
      {kbd && (
        <kbd className="rounded-lg border border-border/60 bg-muted/70 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
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
      className="flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-muted hover:text-foreground hover:shadow-md hover:shadow-primary/5"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        />
      </svg>
      <span className="flex-1 text-left">Search apps, files, actions...</span>
      <kbd className="rounded-lg border border-border/60 bg-muted/70 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
        Ctrl K
      </kbd>
    </button>
  );
}

function ActionHint({ lastAction }: { lastAction: string | null }) {
  return (
    <p className="min-h-5 text-xs text-muted-foreground">
      {lastAction ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-emerald-500">&#x25CF;</span> Last opened:{" "}
          {lastAction}
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
    <ComponentDocPage
      name="Spotlight Search"
      category="Overlays"
      description="An animated, macOS-style search dialog. Instant filtering with highlighted matches, category sections, persisted recents, a global Ctrl+K shortcut, and full keyboard navigation."
    >
      <PreviewPanel filename="spotlight-search-preview.tsx">
        <div className="flex w-full flex-col items-center gap-4 py-4">
          <TriggerButton
            label="Search everything"
            onOpen={() => setOpenFull(true)}
            kbd
          />
          <ActionHint lastAction={lastAction} />
          <SpotlightSearch
            items={fullItems}
            open={openFull}
            onOpenChange={setOpenFull}
            storageKey="page:spotlight-preview"
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SPOTLIGHT_SOURCE}
        filename="components/ui/SpotlightSearch/SpotlightSearch.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Full Spotlight"
          description="Complete search with categories, recents, and keyboard shortcuts."
          code={`import { SpotlightSearch } from "@/components/ui";\n\n<SpotlightSearch items={items} open={open} onOpenChange={setOpen} />`}
          filename="full-spotlight.tsx"
        >
          <div className="flex w-full flex-col items-center gap-4 py-4">
            <TriggerButton
              label="Search everything"
              onOpen={() => setOpenFull(true)}
              kbd
            />
            <ActionHint lastAction={lastAction} />
            <SpotlightSearch
              items={fullItems}
              open={openFull}
              onOpenChange={setOpenFull}
              storageKey="page:spotlight-full"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Quick Launch"
          description="Compact variant with custom width and height."
          code={`<SpotlightSearch\n  items={items}\n  open={open}\n  onOpenChange={setOpen}\n  placeholder="Type an app or action..."\n  width={440}\n  maxHeight={340}\n/>`}
          filename="quick-launch.tsx"
        >
          <div className="flex w-full flex-col items-center gap-4 py-4">
            <TriggerButton
              label="Launch quickly"
              onOpen={() => setOpenQuick(true)}
            />
            <ActionHint lastAction={lastAction} />
            <SpotlightSearch
              items={quickItems}
              open={openQuick}
              onOpenChange={setOpenQuick}
              placeholder="Type an app or action..."
              width={440}
              maxHeight={340}
              storageKey="page:spotlight-quick"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Trigger"
          description="Use a custom trigger button with shortcut disabled."
          code={`<SpotlightSearch\n  items={items}\n  open={open}\n  onOpenChange={setOpen}\n  bindShortcut={false}\n/>`}
          filename="custom-trigger.tsx"
        >
          <div className="flex w-full flex-col items-center gap-6 py-4">
            <SearchBarTrigger onOpen={() => setOpenTrigger(true)} />
            <p className="text-xs text-muted-foreground">
              Built-in shortcut disabled — the trigger controls when it opens.
            </p>
            <SpotlightSearch
              items={fullItems}
              open={openTrigger}
              onOpenChange={setOpenTrigger}
              bindShortcut={false}
              storageKey="page:spotlight-trigger"
            />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Default
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  items
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  SpotlightItem[]
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  open
                </td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  defaultOpen
                </td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  onOpenChange
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  (open: boolean) =&gt; void
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  placeholder
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  &quot;Search files, apps, actions...&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  emptyMessage
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  &quot;No results found&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  storageKey
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">
                  &quot;spotlight-search&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  recentLimit
                </td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  width
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  number | string
                </td>
                <td className="px-4 py-3 text-muted-foreground">560</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  maxHeight
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  number | string
                </td>
                <td className="px-4 py-3 text-muted-foreground">420</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  bindShortcut
                </td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  className
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
