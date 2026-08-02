import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerSettingsTools: RegistryEntry = entry({
    id: "drawer-settings-tools",
    title: "Theme, Checklist & Shortcuts",
    description: "A color theme picker, a task checklist, and a keyboard shortcuts reference.",
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

export default function DrawerSettingsTools() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Theme</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Checklist</button>
      <button onClick={() => setOpen(2)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Shortcuts</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" title="Theme">
        <p className="mb-3 text-sm text-zinc-500">Choose your accent color</p>
        <div className="flex flex-wrap gap-3">
          {["#4f46e5", "#059669", "#dc2626", "#d97706", "#2563eb", "#7c3aed", "#db2777", "#0891b2"].map((c) => (
            <button
              key={c}
              onClick={() => setOpen(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
              style={{ backgroundColor: c }}
            >
              {c === "#4f46e5" && <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
            </button>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" title="Checklist">
        <div className="flex flex-col gap-2">
          {["Set up project", "Invite team", "Configure CI/CD", "Write docs", "Deploy to staging", "Run tests", "Review PRs"].map((task, i) => (
            <label key={task} className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-700">
              <input type="checkbox" defaultChecked={i < 2} className="accent-primary" />
              <span className={i < 2 ? "text-zinc-400 line-through" : ""}>{task}</span>
            </label>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 2} onClose={() => setOpen(null)} side="right" title="Shortcuts">
        <div className="flex flex-col gap-2">
          {[
            { keys: "Ctrl+K", action: "Command palette" },
            { keys: "Ctrl+S", action: "Save" },
            { keys: "Ctrl+F", action: "Search" },
            { keys: "Ctrl+Z", action: "Undo" },
            { keys: "Ctrl+Shift+P", action: "Publish" },
            { keys: "Escape", action: "Close dialog" },
          ].map((s) => (
            <div key={s.keys} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">{s.action}</span>
              <kbd className="rounded border border-zinc-300 px-2 py-0.5 text-xs font-medium dark:border-zinc-700">{s.keys}</kbd>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}`,
  });
