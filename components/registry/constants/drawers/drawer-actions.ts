import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerActions: RegistryEntry = entry({
    id: "drawer-actions",
    title: "Share, Upload & Search",
    description: "A share grid, a drag-and-drop upload panel, and a top search drawer.",
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

export default function DrawerActions() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Share</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Upload</button>
      <button onClick={() => setOpen(2)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Search</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="bottom" title="Share">
        <div className="grid grid-cols-4 gap-3">
          {["Email", "Link", "Twitter", "Slack", "Teams", "WhatsApp", "Telegram", "Copy"].map((s) => (
            <button key={s} onClick={() => setOpen(null)} className="flex flex-col items-center gap-1 rounded-lg p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium dark:bg-zinc-800">{s.slice(0, 2)}</div>
              <span className="text-xs text-zinc-500">{s}</span>
            </button>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" title="Upload Files">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700">
          <svg className="mb-2 h-8 w-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          <p className="text-sm text-zinc-500">Drag files or click to upload</p>
          <button className="mt-3 rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-white hover:bg-primary/90">Browse</button>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {["design.png", "report.pdf", "photo.jpg"].map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-200 text-xs dark:bg-zinc-700">{f.split(".").pop()}</div>
              <div className="flex-1 text-sm">{f}</div>
              <button className="text-xs text-danger" onClick={() => setOpen(null)}>Remove</button>
            </div>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 2} onClose={() => setOpen(null)} side="top" title="Search">
        <input
          autoFocus
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          placeholder="Search projects, files, and more..."
        />
        <div className="mt-4 flex flex-col gap-1">
          {["Dashboard", "Analytics Report", "User Settings", "API Documentation"].map((s) => (
            <button key={s} onClick={() => setOpen(null)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <span className="text-xs text-zinc-400">#</span>
              {s}
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}`,
  });
