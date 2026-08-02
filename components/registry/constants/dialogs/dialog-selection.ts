import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogSelection: RegistryEntry = entry({
    id: "dialog-selection",
    title: "Selection Dialogs",
    description: "Multi-select tags and single-select plan dialogs.",
    source: `import { useEffect, useRef, useState } from "react";

function Dialog({ open, onClose, children }) {
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
      className={\`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 \${anim ? "opacity-100" : "opacity-0"}\`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={\`relative z-10 mx-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 \${anim ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}\`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function IconWrap({ children, color }) {
  return (
    <div className={\`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full \${color}\`}>
      {children}
    </div>
  );
}

const TRIGGERS = [
  { id: "d13", label: "Multi-Select", desc: "Choose multiple options", badge: "1" },
  { id: "d14", label: "Single Select", desc: "Pick one option", badge: "2" },
];

export default function DialogSelection() {
  const [which, setWhich] = useState(null);
  const close = () => setWhich(null);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {TRIGGERS.map((t) => (
          <button
            key={t.id}
            onClick={() => setWhich(t.id)}
            className="rounded-xl border border-zinc-200 p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {t.badge}
            </span>
            <div className="mt-2 text-sm font-medium">{t.label}</div>
            <div className="mt-0.5 text-xs text-zinc-500">{t.desc}</div>
          </button>
        ))}
      </div>

      <Dialog open={which === "d13"} onClose={close}>
        <h2 className="mb-4 text-center text-lg font-semibold">Select Tags</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {["Design", "Dev", "Marketing", "Sales", "Support", "HR"].map((tag) => (
            <label key={tag} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700">
              <input type="checkbox" className="accent-primary" />
              {tag}
            </label>
          ))}
        </div>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Apply</button>
        </div>
      </Dialog>

      <Dialog open={which === "d14"} onClose={close}>
        <h2 className="mb-4 text-center text-lg font-semibold">Choose Plan</h2>
        <div className="flex flex-col gap-2">
          {["Basic", "Pro", "Enterprise"].map((plan) => (
            <label key={plan} className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-700">
              <input type="radio" name="plan" className="accent-primary" />
              <div>
                <div className="font-medium">{plan}</div>
                <div className="text-xs text-zinc-500">{plan === "Basic" ? "$9/mo" : plan === "Pro" ? "$29/mo" : "$99/mo"}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Select</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
