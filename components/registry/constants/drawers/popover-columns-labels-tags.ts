import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const popoverColumnsLabelsTags: RegistryEntry = entry({
    id: "popover-columns-labels-tags",
    title: "Columns, Labels & Tags",
    description: "Multi-select menus for columns, labels, and tags.",
    source: `import { useEffect, useRef, useState } from "react";

const PLACEMENT_STYLES = {
  bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
  top: "left-1/2 -translate-x-1/2 bottom-full mb-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_STYLES = {
  bottom: "-top-1 left-1/2 -translate-x-1/2 border-l border-t",
  top: "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b",
  left: "-right-1 top-1/2 -translate-y-1/2 border-t border-r",
  right: "-left-1 top-1/2 -translate-y-1/2 border-l border-b",
};

function Popover({ open, onClose, placement = "bottom", showArrow = true, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) {
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={\`absolute z-40 w-56 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 \${PLACEMENT_STYLES[placement]}\`}>
      {showArrow && <div className={\`absolute h-2 w-2 rotate-45 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 \${ARROW_STYLES[placement]}\`} />}
      {children}
    </div>
  );
}

function ColumnContent() {
  const cols = ["Name", "Email", "Role", "Status", "Created"];
  const [hidden, setHidden] = useState(["Role"]);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-zinc-500">Columns</p>
      {cols.map((c) => (
        <label key={c} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
          <input type="checkbox" checked={!hidden.includes(c)} onChange={() => setHidden(hidden.includes(c) ? hidden.filter((x) => x !== c) : [...hidden, c])} className="accent-primary" />
          {c}
        </label>
      ))}
    </div>
  );
}

function LabelContent() {
  const labels = ["Bug", "Feature", "Enhancement", "Docs", "Design"];
  const [sel, setSel] = useState(["Bug"]);
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-zinc-500">Labels</p>
      {labels.map((l) => (
        <button key={l} onClick={() => setSel(sel.includes(l) ? sel.filter((x) => x !== l) : [...sel, l])} className={\`rounded px-2 py-1 text-left text-sm \${sel.includes(l) ? "bg-indigo-50 text-primary dark:bg-indigo-900/20" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>{l}</button>
      ))}
    </div>
  );
}

function TagContent() {
  const tags = ["urgent", "wip", "blocked", "review"];
  const [sel, setSel] = useState(["wip"]);
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-zinc-500">Tags</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((t) => (
          <button key={t} onClick={() => setSel(sel.includes(t) ? sel.filter((x) => x !== t) : [...sel, t])} className={\`rounded px-2 py-0.5 text-xs \${sel.includes(t) ? "bg-indigo-100 text-indigo-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}\`}>{t}</button>
        ))}
      </div>
    </div>
  );
}

export default function PopoverColumnsLabelsTags() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Columns</button>
        <Popover open={open === 0} onClose={() => setOpen(null)} placement="bottom">
          <ColumnContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Labels</button>
        <Popover open={open === 1} onClose={() => setOpen(null)} placement="right">
          <LabelContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(2)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Tags</button>
        <Popover open={open === 2} onClose={() => setOpen(null)} placement="bottom">
          <TagContent />
        </Popover>
      </div>
    </div>
  );
}`,
  });
