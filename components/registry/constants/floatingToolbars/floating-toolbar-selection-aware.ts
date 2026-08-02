import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const floatingToolbarSelectionAware: RegistryEntry = entry({
    id: "floating-toolbar-selection-aware",
    title: "Selection Aware",
    description:
      "The toolbar unlocks as soon as there is something to act on — a live chip reports the selection and every action is disabled while the bar is idle.",
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
    { id: "cut", label: "Cut", shortcut: "⌘X", icon: icon(["M6 6a2.6 2.6 0 100 5.2A2.6 2.6 0 006 6z", "M6 18a2.6 2.6 0 100-5.2A2.6 2.6 0 006 18z", "M8.2 7.8L20 19M8.2 16.2L20 5"]) },
    { id: "copy", label: "Copy", shortcut: "⌘C", icon: icon(["M9 9h11v11H9z", "M5 15V5a2 2 0 012-2h10"]) },
    { id: "paste", label: "Paste", shortcut: "⌘V", icon: icon(["M9 9h11v11H9z", "M5 15V5a2 2 0 012-2h10", "M12 13h5M12 17h5"]) },
  ],
  [
    { id: "quote", label: "Quote", icon: icon(["M6 17h3l2-4V7H5v6h3l-2 4z", "M14 17h3l2-4V7h-6v6h3l-2 4z"], { fill: true }) },
    { id: "link", label: "Link", icon: icon(["M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7L12 5", "M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7L12 19"]) },
  ],
];

export default function FloatingToolbarSelectionAware() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <FloatingToolbar
        position="sticky"
        groups={actions}
        selectionLabel={count > 0 ? \`\${count} selected\` : undefined}
        disabled={count === 0}
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCount(2)}
          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Select 2 words
        </button>
        <button
          type="button"
          onClick={() => setCount(5)}
          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Select all
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
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
  );
}`,
  });
