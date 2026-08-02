import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const floatingToolbarSelection: RegistryEntry = entry({
    id: "floating-toolbar-selection",
    title: "Selection Toolbar",
    description:
      "A draggable rich-text toolbar — grouped actions with dividers, hover tooltips (with shortcuts), pressed/active states, collapse to a handle, and smooth width animation.",
    source: `import { useState } from "react";
import { FloatingToolbar, type FloatingToolbarAction } from "@/components/ui";

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
    { id: "underline", label: "Underline", shortcut: "⌘U", icon: icon(["M7 4v6a5 5 0 0010 0V4", "M5 20h14"]) },
    { id: "strike", label: "Strikethrough", shortcut: "⇧⌘X", icon: icon(["M4 12h16M8 5h8M8 19h8"]) },
  ],
  [
    { id: "align-left", label: "Align left", icon: icon(["M4 6h16M4 10h11M4 14h16M4 18h11"]) },
    { id: "align-center", label: "Align center", icon: icon(["M4 6h16M6 10h12M4 14h16M6 18h12"]) },
    { id: "align-right", label: "Align right", icon: icon(["M4 6h16M9 10h11M4 14h16M9 18h11"]) },
  ],
  [
    { id: "text-color", label: "Text color", icon: icon(["M7 16L12 5l5 11M8.8 12h6.4", "M5 20h14"]) },
    { id: "highlight", label: "Highlight", icon: icon(["M9 11l4 4L21 7l-4-4-8 8z", "M9 11l-4 4 4 4 4-4M5 19l4-4"]) },
    { id: "clear", label: "Clear formatting", icon: icon(["M7 16L12 5l5 11M8.8 12h6.4", "M6 4l12 16"]) },
  ],
];

export default function FloatingToolbarSelection() {
  const [active, setActive] = useState("");

  return (
    <div className="relative flex h-80 w-full flex-col items-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 p-6">
      <FloatingToolbar
        position="absolute"
        groups={actions}
        selectionLabel="Paragraph"
        activeItemId={active}
        onAction={(a) => setActive(a.id === active ? "" : a.id)}
      />
      <p className="mt-auto max-w-sm text-center text-sm leading-relaxed text-subtle">
        Drag the grip to move the toolbar around this stage. Hover an icon for
        its tooltip, click to pin it as the active style, and use the chevron to
        collapse the whole bar down to a handle.
      </p>
    </div>
  );
}`,
  });
