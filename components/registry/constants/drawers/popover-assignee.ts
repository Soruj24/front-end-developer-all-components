import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const popoverAssignee: RegistryEntry = entry({
    id: "popover-assignee",
    title: "Assignee",
    description: "Single-select menu for picking an assignee.",
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

function AssigneeContent() {
  const people = [
    { name: "Alice Doe", initials: "AD", color: "bg-indigo-100 text-primary" },
    { name: "Ben Smith", initials: "BS", color: "bg-emerald-100 text-emerald-700" },
    { name: "Cara Lee", initials: "CL", color: "bg-amber-100 text-amber-700" },
    { name: "Dan Kim", initials: "DK", color: "bg-rose-100 text-rose-700" },
  ];
  const [sel, setSel] = useState("Alice Doe");
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium text-zinc-500">Assign to</p>
      {people.map((p) => (
        <button key={p.name} onClick={() => setSel(p.name)} className={\`flex items-center gap-2 rounded px-2 py-1.5 text-left text-sm \${sel === p.name ? "bg-indigo-50 text-primary dark:bg-indigo-900/20" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>
          <span className={\`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold \${p.color}\`}>{p.initials}</span>
          {p.name}
          {sel === p.name && <span className="ml-auto text-primary dark:text-indigo-400">\u2713</span>}
        </button>
      ))}
    </div>
  );
}

export default function PopoverAssignee() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Assignee</button>
        <Popover open={open === 0} onClose={() => setOpen(null)} placement="bottom">
          <AssigneeContent />
        </Popover>
      </div>
    </div>
  );
}`,
  });
