import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogConfirmation: RegistryEntry = entry({
    id: "dialog-confirmation",
    title: "Confirmation Dialogs",
    description: "Basic, destructive, type-to-confirm, and two-step confirmations.",
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
  { id: "d2", label: "Confirmation", desc: "Confirm with cancel/confirm buttons", badge: "1" },
  { id: "d3", label: "Destructive", desc: "Delete confirmation with danger styling", badge: "2" },
  { id: "d11", label: "Confirm with Input", desc: "Type confirmation text", badge: "3" },
  { id: "d12", label: "Two-Step Confirm", desc: "Double confirm before action", badge: "4" },
];

export default function DialogConfirmation() {
  const [which, setWhich] = useState(null);
  const close = () => setWhich(null);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      <Dialog open={which === "d2"} onClose={close}>
        <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
          <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Confirm Action</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Are you sure you want to proceed with this action?</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Confirm</button>
        </div>
      </Dialog>

      <Dialog open={which === "d3"} onClose={close}>
        <IconWrap color="bg-red-100 dark:bg-red-900/30">
          <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold text-danger dark:text-red-400">Delete Account</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">This will permanently delete your account and all associated data. This action cannot be undone.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90">Delete</button>
        </div>
      </Dialog>

      <Dialog open={which === "d11"} onClose={close}>
        <IconWrap color="bg-red-100 dark:bg-red-900/30">
          <span className="text-xl text-danger dark:text-red-400">&#x26A0;</span>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Type &quot;DELETE&quot; to confirm</h2>
        <p className="mb-4 text-center text-sm text-zinc-600 dark:text-zinc-400">This action is irreversible.</p>
        <input
          placeholder="Type DELETE"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-zinc-600 dark:bg-zinc-800"
        />
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white opacity-50 hover:bg-danger/90">Delete</button>
        </div>
      </Dialog>

      <Dialog open={which === "d12"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <span className="text-xl text-warning dark:text-warning">!!</span>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Are you absolutely sure?</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">This will permanently remove 150 items. Click again to confirm.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90">Yes, delete</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
