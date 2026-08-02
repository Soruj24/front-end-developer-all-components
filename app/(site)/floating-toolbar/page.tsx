"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";
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

export default function FloatingToolbarPage() {
  const [active, setActive] = useState("bold");
  const [selection, setSelection] = useState(0);

  const toggleActive = (id: string) => setActive((prev) => (prev === id ? "" : id));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Floating Toolbar
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A context-aware floating toolbar — drag it anywhere or stick it to the
          top of a scroll container. Actions are grouped behind dividers with
          tooltips and shortcuts, the bar collapses to a handle, and the whole
          thing is keyboard operable, responsive, and theme-aware.
        </p>
      </header>

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
  );
}
