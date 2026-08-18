"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FloatingToolbar } from "@/components/ui";
import {
  formatActions,
  noteActions,
  selectionActions,
} from "@/components/floating-toolbar/demo";

const draftLines = [
  "Spring had come late that year, but it had come. The orchards along the river bank were swelling with blossom and the air carried the sweet, heavy smell of new growth.",
  "Ada leaned back in her chair and watched the dust motes drift through a shaft of afternoon light. The cursor blinked patiently on the last line of her notes.",
  "She had learned, slowly, that writing was less about finding the right words than about clearing the space for them — removing everything that got in the way.",
  "A paragraph broke the page in half. A question mark held the whole chapter together. The margin, she decided, was where the real story lived.",
  "Outside, a blackbird sang three notes and fell silent. Ada smiled, saved her file, and started the next paragraph.",
];

const installCommand = `npx component-library@latest add floating-toolbar`;

const usageCode = `import { FloatingToolbar } from "@/components/ui";

<FloatingToolbar
  groups={formatActions}
  selectionLabel="Paragraph"
  position="sticky"
/>`;

export default function FloatingToolbarPage() {
  const [active, setActive] = useState("bold");
  const [selection, setSelection] = useState(0);

  const toggleActive = (id: string) => setActive((prev) => (prev === id ? "" : id));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Floating Toolbar
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A context-aware floating toolbar — drag it anywhere or stick it to the
          top of a scroll container. Actions are grouped behind dividers with
          tooltips and shortcuts, the bar collapses to a handle, and the whole
          thing is keyboard operable, responsive, and theme-aware.
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
            <h3 className="text-lg font-medium text-foreground">Draggable Toolbar</h3>
            <p className="text-sm text-muted-foreground">Drag the grip to move the toolbar, hover for tooltips, click to pin active styles.</p>
          </div>
          <ComponentPreview id="floating-toolbar-selection">
            <div className="relative flex h-80 w-full flex-col items-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 p-6">
              <FloatingToolbar
                position="absolute"
                groups={formatActions}
                selectionLabel="Paragraph"
                activeItemId={active}
                onAction={(a) => toggleActive(a.id)}
              />
              <p className="mt-auto max-w-sm text-center text-sm leading-relaxed text-subtle">
                Drag the grip to move the toolbar around this stage. Hover an icon
                for its tooltip, click to pin it as the active style, and use the
                chevron to collapse the whole bar down to a handle.
              </p>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Sticky Toolbar</h3>
            <p className="text-sm text-muted-foreground">Toolbar sticks to the top while text scrolls underneath.</p>
          </div>
          <ComponentPreview id="floating-toolbar-sticky">
            <div className="flex w-full flex-col items-center gap-3 py-6">
              <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background">
                <div className="max-h-80 overflow-y-auto p-4 scrollbar-thin">
                  <FloatingToolbar
                    position="sticky"
                    groups={noteActions}
                    selectionLabel="Draft"
                  />
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {draftLines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-subtle">
                Scroll inside the card — the toolbar sticks to the top while the
                text moves underneath.
              </p>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Selection-Aware Toolbar</h3>
            <p className="text-sm text-muted-foreground">Actions are disabled until text is selected.</p>
          </div>
          <ComponentPreview id="floating-toolbar-selection-aware">
            <div className="flex w-full flex-col items-center gap-5 py-10">
              <FloatingToolbar
                position="sticky"
                groups={selectionActions}
                selectionLabel={selection > 0 ? `${selection} selected` : undefined}
                disabled={selection === 0}
              />
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
                  onClick={() => setSelection(5)}
                  className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                >
                  Select all
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
                With nothing selected every action is disabled. Pick a selection to
                unlock the toolbar and watch the live count chip.
              </p>
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
                <td className="px-4 py-3 font-mono text-xs">groups</td>
                <td className="px-4 py-3 text-muted-foreground">ActionGroup[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">position</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;absolute&quot; | &quot;sticky&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sticky&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">selectionLabel</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">activeItemId</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onAction</td>
                <td className="px-4 py-3 text-muted-foreground">(action: ActionItem) =&gt; void</td>
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
