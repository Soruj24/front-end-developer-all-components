import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerForms: RegistryEntry = entry({
    id: "drawer-forms",
    title: "Forms & Invite",
    description: "An inline quick form and a team invite drawer with role selection.",
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

export default function DrawerForms() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Quick Form</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Invite</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" title="Quick Form">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
            <input className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Enter name" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">Email</label>
            <input className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Enter email" type="email" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">Message</label>
            <textarea className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" rows={3} placeholder="Type here" />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setOpen(null)} className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-medium dark:border-zinc-700">Cancel</button>
          <button onClick={() => setOpen(null)} className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">Submit</button>
        </div>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" title="Invite People">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">Email addresses</label>
            <textarea className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" rows={3} placeholder="john@example.com" />
          </div>
          <select className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
            <option>Member</option>
            <option>Admin</option>
            <option>Viewer</option>
          </select>
          <button onClick={() => setOpen(null)} className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">Send Invites</button>
        </div>
      </Drawer>
    </div>
  );
}`,
  });
