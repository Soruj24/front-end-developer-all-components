import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const popoverFilterSort: RegistryEntry = entry({
    id: "popover-filter-sort",
    title: "Filter & Sort",
    description: "Single-select menus for filtering and sorting data.",
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

function FilterContent() {
  const [f, setF] = useState("All");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-zinc-500">Filter</p>
      {["All", "Active", "Archived", "Draft"].map((opt) => (
        <button key={opt} onClick={() => setF(opt)} className={\`rounded px-2 py-1.5 text-left text-sm \${f === opt ? "bg-indigo-50 text-primary dark:bg-indigo-900/20 dark:text-indigo-400" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>{opt}</button>
      ))}
    </div>
  );
}

function SortContent() {
  const opts = ["Name", "Date", "Size", "Status"];
  const [sel, setSel] = useState("Date");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-zinc-500">Sort By</p>
      {opts.map((o) => (
        <button key={o} onClick={() => setSel(o)} className={\`rounded px-2 py-1.5 text-left text-sm \${sel === o ? "bg-indigo-50 text-primary" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>{o}</button>
      ))}
    </div>
  );
}

export default function PopoverFilterSort() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Filter</button>
        <Popover open={open === 0} onClose={() => setOpen(null)} placement="bottom">
          <FilterContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Sort</button>
        <Popover open={open === 1} onClose={() => setOpen(null)} placement="bottom">
          <SortContent />
        </Popover>
      </div>
    </div>
  );
}`,
  });
