import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerPricingAnalytics: RegistryEntry = entry({
    id: "drawer-pricing-analytics",
    title: "Pricing & Analytics",
    description: "A plan comparison drawer and a quick stats panel.",
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

export default function DrawerPricingAnalytics() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Plans</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Stats</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" title="Plans">
        <div className="flex flex-col gap-3">
          {[
            { name: "Free", price: "$0", badge: "" },
            { name: "Pro", price: "$29", badge: "Popular" },
            { name: "Enterprise", price: "$99", badge: "" },
          ].map((p) => (
            <div key={p.name} className={\`rounded-lg border p-4 \${p.badge ? "border-indigo-500" : "border-zinc-200 dark:border-zinc-700"}\`}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{p.name}</div>
                {p.badge && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{p.badge}</span>}
              </div>
              <div className="mt-1 text-2xl font-bold">{p.price}<span className="text-sm font-normal text-zinc-500">/mo</span></div>
              <button onClick={() => setOpen(null)} className={\`mt-3 w-full rounded-lg py-1.5 text-sm font-medium \${p.badge ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"}\`}>Choose</button>
            </div>
          ))}
        </div>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" title="Quick Stats">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Users", value: "2,847" },
            { label: "Revenue", value: "$48K" },
            { label: "Sessions", value: "14.2K" },
            { label: "Bounce", value: "32%" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-zinc-200 p-3 text-center dark:border-zinc-700">
              <div className="text-lg font-bold">{s.value}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setOpen(null)} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">View Full Report</button>
      </Drawer>
    </div>
  );
}`,
  });
