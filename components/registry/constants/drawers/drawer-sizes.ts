import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerSizes: RegistryEntry = entry({
    id: "drawer-sizes",
    title: "Sizes",
    description: "The same right-side drawer at compact, wide, and full-width sizes.",
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

export default function DrawerSizes() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Small</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Large</button>
      <button onClick={() => setOpen(2)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Full</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" size="sm" title="Mini Panel">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Compact sidebar for quick actions.</p>
        <button onClick={() => setOpen(null)} className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Close</button>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" size="lg" title="Wide Layout">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
              <div className="text-sm font-medium">Card {i + 1}</div>
              <div className="mt-1 text-xs text-zinc-500">Content goes here</div>
            </div>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 2} onClose={() => setOpen(null)} side="right" size="full" title="Full Width">
        <div className="flex gap-4">
          <div className="flex-1 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <div className="text-sm font-medium">Main Content</div>
            <p className="mt-1 text-xs text-zinc-500">Full-width drawer spans most of the screen.</p>
          </div>
          <div className="w-40 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <div className="text-sm font-medium">Sidebar</div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}`,
  });
