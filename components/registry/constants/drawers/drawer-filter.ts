import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerFilter: RegistryEntry = entry({
    id: "drawer-filter",
    title: "Filter",
    description: "A category filter drawer with selectable chips and apply/reset actions.",
    source: `import { useState } from "react";

const SIZES = {
  sm: "w-80",
  md: "w-[400px]",
  lg: "w-[500px]",
  xl: "w-[640px]",
  full: "w-full max-w-2xl",
};

const SIDE_CONFIG = {
  left: { enter: "translate-x-0", exit: "-translate-x-full", style: "left-0 top-0 bottom-0", border: "border-r" },
  right: { enter: "translate-x-0", exit: "translate-x-full", style: "right-0 top-0 bottom-0", border: "border-l" },
  top: { enter: "translate-y-0", exit: "-translate-y-full", style: "top-0 left-0 right-0 h-auto max-h-[60vh]", border: "border-b" },
  bottom: { enter: "translate-y-0", exit: "translate-y-full", style: "bottom-0 left-0 right-0 h-auto max-h-[60vh]", border: "border-t" },
};

function Drawer({ open, onClose, side = "right", size = "md", title, children }) {
  const cfg = SIDE_CONFIG[side];
  return (
    <>
      <div
        className={\`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 \${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }\`}
        onClick={onClose}
      />
      <div
        className={\`fixed z-50 bg-white shadow-xl transition-all duration-200 ease-in-out dark:bg-zinc-900 \${
          SIZES[size] || SIZES.md
        } \${cfg.style} \${cfg.border} border-zinc-200 dark:border-zinc-700 overflow-y-auto \${
          open ? cfg.enter : cfg.exit
        }\`}
      >
        <div className="flex items-center justify-between p-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="ml-auto rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 pt-0">{children}</div>
      </div>
    </>
  );
}

export default function DrawerFilter() {
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState("All");
  const filters = [
    { name: "All" }, { name: "Design" }, { name: "Development" },
    { name: "Marketing" }, { name: "Sales" }, { name: "Support" },
  ];

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Open Filters</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="left" title="Filters">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.name}
              onClick={() => setActive(f.name)}
              className={\`rounded-full px-3 py-1.5 text-xs font-medium \${active === f.name ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"}\`}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={() => setOpen(null)} className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">Apply</button>
          <button onClick={() => setOpen(null)} className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-medium dark:border-zinc-700">Reset</button>
        </div>
      </Drawer>
    </div>
  );
}`,
  });
