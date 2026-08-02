import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerComments: RegistryEntry = entry({
    id: "drawer-comments",
    title: "Comments",
    description: "A threaded comment panel with an inline composer.",
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

export default function DrawerComments() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Comments</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" title="Comments">
        <div className="flex flex-col gap-4">
          {["Great work!", "Can you review this?", "LGTM!", "Let's discuss in standup."].map((c, i) => (
            <div key={i} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-primary">U{i + 1}</div>
                <span className="text-xs font-medium">User {i + 1}</span>
                <span className="text-xs text-zinc-500">{i + 1}h ago</span>
              </div>
              <p className="mt-1 text-sm">{c}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Add comment..." />
          <button onClick={() => setOpen(null)} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white">Send</button>
        </div>
      </Drawer>
    </div>
  );
}`,
  });
