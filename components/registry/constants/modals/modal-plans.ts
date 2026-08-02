import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalPlans: RegistryEntry = entry({
    id: "modal-plans",
    title: "Subscription Plans",
    description: "Pricing plans that open a subscribe modal.",
    source: `import { useEffect, useRef, useState } from "react";

const PLANS = [
  { name: "Starter", price: "$9", features: ["1 user", "5 projects", "2GB storage"] },
  { name: "Pro", price: "$29", features: ["10 users", "Unlimited projects", "50GB storage", "Priority support"] },
  { name: "Enterprise", price: "$99", features: ["Unlimited users", "Unlimited projects", "500GB storage", "24/7 support", "Custom integrations"] },
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

export default function ModalPlans() {
  const [planOpen, setPlanOpen] = useState(null);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {PLANS.map((p) => (
          <button
            key={p.name}
            onClick={() => setPlanOpen(p.name)}
            className="rounded-xl border border-zinc-200 p-5 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
          >
            <div className="text-sm font-medium">{p.name}</div>
            <div className="mt-1 text-xl font-bold">
              {p.price}
              <span className="text-xs font-normal text-zinc-500">/mo</span>
            </div>
            <ul className="mt-3 space-y-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      <Modal open={planOpen !== null} onClose={() => setPlanOpen(null)} title={\`\${planOpen} Plan\`} size="sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Subscribe to this plan to get started today.</p>
        <div className="mt-4 flex gap-3">
          <button className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90">Subscribe</button>
          <button onClick={() => setPlanOpen(null)} className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}`,
  });
