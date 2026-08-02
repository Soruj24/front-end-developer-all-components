import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerCart: RegistryEntry = entry({
    id: "drawer-cart",
    title: "Cart",
    description: "A shopping cart drawer with quantity steppers and a live total.",
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

export default function DrawerCart() {
  const [open, setOpen] = useState(null);
  const [qty, setQty] = useState([1, 2, 1]);
  const carts = [
    { name: "Wireless Headphones", price: "$79" },
    { name: "USB-C Hub", price: "$49" },
    { name: "Desk Lamp", price: "$39" },
  ];
  const total = qty.reduce((sum, q, i) => sum + q * [79, 49, 39][i], 0);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Open Cart</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" title="Shopping Cart">
        <div className="flex flex-col gap-3">
          {carts.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-zinc-500">{item.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { const next = [...qty]; next[i] = Math.max(0, next[i] - 1); setQty(next); }} className="flex h-6 w-6 items-center justify-center rounded border text-xs dark:border-zinc-700">-</button>
                <span className="w-4 text-center text-sm">{qty[i]}</span>
                <button onClick={() => { const next = [...qty]; next[i] += 1; setQty(next); }} className="flex h-6 w-6 items-center justify-center rounded border text-xs dark:border-zinc-700">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-700">
          <span className="text-sm font-medium">Total</span>
          <span className="text-lg font-bold">\${total}</span>
        </div>
        <button onClick={() => setOpen(null)} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">Checkout</button>
      </Drawer>
    </div>
  );
}`,
  });
