"use client";

import { useState } from "react";
import { FloatingToolbar } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  formatActions,
  noteActions,
  selectionActions,
} from "@/components/floating-toolbar/demo";
import {
  FLOATINGTOOLBAR_SOURCE,
  draftLines,
  stickyToolbarCode,
  fixedToolbarCode,
  collapsibleToolbarCode,
} from "./floating-toolbar-source";

export default function FloatingToolbarPage() {
  const [active, setActive] = useState("bold");
  const [selection, setSelection] = useState(0);

  const toggleActive = (id: string) => setActive((prev) => (prev === id ? "" : id));

  return (
    <ComponentDocPage
      name="Floating Toolbar"
      category="Overlays"
      description="A context-aware floating toolbar — drag it anywhere or stick it to the top of a scroll container. Actions are grouped behind dividers with tooltips and shortcuts, the bar collapses to a handle, and the whole thing is keyboard operable, responsive, and theme-aware."
    >
      <PreviewPanel filename="FloatingToolbar.tsx">
        <FloatingToolbar
          position="fixed"
          groups={formatActions}
          selectionLabel="Paragraph"
          activeItemId={active}
          onAction={(a) => toggleActive(a.id)}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={FLOATINGTOOLBAR_SOURCE}
        filename="FloatingToolbar.tsx"
        label="tsx"
        defaultExpanded
      />

      <ExampleBlock
        title="Sticky Toolbar"
        description="Toolbar sticks to the top while text scrolls underneath."
        code={stickyToolbarCode}
        filename="sticky-toolbar.tsx"
      >
        <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background">
          <div className="max-h-72 overflow-y-auto p-4 scrollbar-thin">
            <FloatingToolbar position="sticky" groups={noteActions} selectionLabel="Draft" />
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {draftLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </ExampleBlock>

      <ExampleBlock
        title="Fixed Toolbar"
        description="Drag the grip to move the toolbar, hover for tooltips, click to pin active styles."
        code={fixedToolbarCode}
        filename="fixed-toolbar.tsx"
      >
        <div className="relative flex h-72 w-full flex-col items-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 p-6">
          <FloatingToolbar
            position="absolute"
            groups={formatActions}
            selectionLabel="Paragraph"
            activeItemId={active}
            onAction={(a) => toggleActive(a.id)}
          />
          <p className="mt-auto max-w-sm text-center text-sm leading-relaxed text-subtle">
            Drag the grip to move the toolbar around this stage.
          </p>
        </div>
      </ExampleBlock>

      <ExampleBlock
        title="Collapsible Toolbar"
        description="Actions are disabled until text is selected."
        code={collapsibleToolbarCode}
        filename="collapsible-toolbar.tsx"
      >
        <div className="flex w-full flex-col items-center gap-4 py-6">
          <div className="w-full max-w-md">
            <FloatingToolbar
              position="sticky"
              groups={selectionActions}
              selectionLabel={selection > 0 ? `${selection} selected` : undefined}
              disabled={selection === 0}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelection(2)}
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Select 2 words
            </button>
            <button
              type="button"
              onClick={() => setSelection(0)}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              Clear
            </button>
          </div>
          <p className="text-xs text-subtle">
            With nothing selected every action is disabled.
          </p>
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
