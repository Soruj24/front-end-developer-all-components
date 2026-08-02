import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const floatingToolbarSticky: RegistryEntry = entry({
    id: "floating-toolbar-sticky",
    title: "Sticky Toolbar",
    description:
      "A sticky variant that hugs the top of its scroll container while a document scrolls beneath it — no drag, no overflow.",
    source: `import { FloatingToolbar, type FloatingToolbarAction } from "@/components/ui";

function icon(paths: string[], opts: { fill?: boolean } = {}) {
  return (
    <svg viewBox="0 0 24 24" fill={opts.fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} aria-hidden="true">
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

const actions: FloatingToolbarAction[][] = [
  [
    { id: "bold", label: "Bold", shortcut: "⌘B", icon: icon(["M7 4h6a4 4 0 010 8H7V4z", "M7 12h7a4 4 0 010 8H7v-8z"]) },
    { id: "italic", label: "Italic", shortcut: "⌘I", icon: icon(["M10 4h8M14 20H6M13 4L9 20"]) },
  ],
  [{ id: "link", label: "Insert link", shortcut: "⌘K", icon: icon(["M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7L12 5", "M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7L12 19"]) }],
  [
    { id: "mention", label: "Mention", icon: icon(["M12 12a3 3 0 100 6 3 3 0 000-6z", "M21 12a9 9 0 11-5.6-8.3"]) },
    { id: "emoji", label: "Emoji", icon: icon(["M12 21a9 9 0 100-18 9 9 0 000 18z", "M8.5 10h.01M15.5 10h.01", "M8.5 14.5c1 1.3 2.3 2 3.5 2s2.5-.7 3.5-2"]) },
  ],
];

const lines = [
  "Spring had come late that year, but it had come. The orchards along the river bank were swelling with blossom and the air carried the sweet, heavy smell of new growth.",
  "Ada leaned back in her chair and watched the dust motes drift through a shaft of afternoon light. The cursor blinked patiently on the last line of her notes.",
  "She had learned, slowly, that writing was less about finding the right words than about clearing the space for them — removing everything that got in the way.",
  "A paragraph broke the page in half. A question mark held the whole chapter together. The margin, she decided, was where the real story lived.",
  "Outside, a blackbird sang three notes and fell silent. Ada smiled, saved her file, and started the next paragraph.",
];

export default function FloatingToolbarSticky() {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-6">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background">
        <div className="max-h-80 overflow-y-auto p-4 scrollbar-thin">
          <FloatingToolbar position="sticky" groups={actions} selectionLabel="Draft" />
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-subtle">
        Scroll inside the card — the toolbar sticks to the top while the text
        moves underneath.
      </p>
    </div>
  );
}`,
  });
