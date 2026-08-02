import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerNavigation: RegistryEntry = entry({
    id: "drawer-navigation",
    title: "Navigation, Settings & Help",
    description: "Menu-style drawers with icon squares, a settings list, and a help card.",
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

export default function DrawerNavigation() {
  const [open, setOpen] = useState(null);
  const navItems = ["Dashboard", "Analytics", "Messages", "Calendar", "Files", "Settings", "Help"];
  const settingsItems = [
    { label: "Account", icon: "A" }, { label: "Privacy", icon: "P" },
    { label: "Security", icon: "S" }, { label: "Notifications", icon: "N" },
    { label: "Appearance", icon: "V" }, { label: "Language", icon: "L" },
  ];

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Menu</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Settings</button>
      <button onClick={() => setOpen(2)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Help</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="left" title="Menu">
        <div className="flex flex-col gap-1">
          {navItems.map((n, i) => (
            <button
              key={n}
              onClick={() => setOpen(null)}
              className={\`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm \${i === 0 ? "bg-indigo-50 font-medium text-primary dark:bg-indigo-900/20 dark:text-indigo-400" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 text-xs dark:bg-zinc-800">{n.charAt(0)}</span>
              {n}
            </button>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" title="Settings">
        <div className="flex flex-col gap-1">
          {settingsItems.map((s) => (
            <button key={s.label} onClick={() => setOpen(null)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-xs font-medium dark:bg-zinc-800">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 2} onClose={() => setOpen(null)} side="right" title="Help & Support">
        <div className="flex flex-col gap-2">
          {["Getting Started", "FAQ", "Contact Support", "Report Bug", "API Docs", "Community"].map((h) => (
            <button key={h} onClick={() => setOpen(null)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-xs dark:bg-zinc-800">{h.charAt(0)}</span>
              {h}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <div className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Need help?</div>
          <p className="mt-1 text-xs text-primary dark:text-indigo-300">Our team typically responds within 2 hours.</p>
        </div>
      </Drawer>
    </div>
  );
}`,
  });
