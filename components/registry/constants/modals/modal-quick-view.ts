import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalQuickView: RegistryEntry = entry({
    id: "modal-quick-view",
    title: "Quick View Modal",
    description: "A storefront quick-view modal opened from a product card.",
    source: `import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: "$79", desc: "Noise-cancelling bluetooth headphones with 30hr battery." },
  { id: 2, name: "Smart Watch", price: "$199", desc: "Fitness tracking, heart rate monitor, GPS." },
  { id: 3, name: "USB-C Hub", price: "$49", desc: "7-in-1 adapter with 4K HDMI, SD card, USB 3.0." },
  { id: 4, name: "Mechanical Keyboard", price: "$129", desc: "RGB backlit, hot-swappable switches, aluminum frame." },
  { id: 5, name: "Webcam 4K", price: "$159", desc: "Ultra HD, auto-focus, built-in ring light." },
];

const SIZE = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };

function Modal({ open, onClose, title, children, size = "md" }) {
  const ref = useRef(null);
  const previous = useRef(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;
    previous.current = document.activeElement;
    const f = ref.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = f[0];
    const last = f[f.length - 1];
    first && first.focus();
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last && last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first && first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (previous.current instanceof HTMLElement) previous.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={\`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 \${anim ? "opacity-100" : "opacity-0"}\`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={\`relative z-10 mx-4 w-full rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 \${anim ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"} \${SIZE[size]}\`}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              &times;
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default function ModalQuickView() {
  const [productOpen, setProductOpen] = useState(null);
  const product = PRODUCTS.find((p) => p.id === productOpen);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 sm:grid-cols-5">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setProductOpen(p.id)}
            className="rounded-xl border border-zinc-200 p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-primary dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-zinc-500">{p.price}</div>
          </button>
        ))}
      </div>
      <Modal open={productOpen !== null} onClose={() => setProductOpen(null)} title={product?.name} size="md">
        <div className="mb-4 h-48 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{product?.desc}</p>
        <p className="mt-2 text-2xl font-bold text-primary dark:text-indigo-400">{product?.price}</p>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">Add to Cart</button>
          <button onClick={() => setProductOpen(null)} className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Close</button>
        </div>
      </Modal>
    </div>
  );
}`,
  });
