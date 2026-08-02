import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogRiskWarning: RegistryEntry = entry({
    id: "dialog-risk-warning",
    title: "Risk & Warning Dialogs",
    description: "Unsaved changes, clear data, discard, and logout warnings.",
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
  { id: "d20", label: "Unsaved Changes", desc: "Leave without saving?", badge: "1" },
  { id: "d21", label: "Clear Data", desc: "Clear all data?", badge: "2" },
  { id: "d24", label: "Discard Changes", desc: "Discard edits?", badge: "3" },
  { id: "d25", label: "Logout Dialog", desc: "Confirm logout", badge: "4" },
];

export default function DialogRiskWarning() {
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

      <Dialog open={which === "d20"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <span className="text-xl text-warning dark:text-warning">&#x26A0;</span>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Unsaved Changes</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">You have unsaved changes. Do you want to leave without saving?</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Leave</button>
        </div>
      </Dialog>

      <Dialog open={which === "d21"} onClose={close}>
        <IconWrap color="bg-red-100 dark:bg-red-900/30">
          <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold text-danger dark:text-red-400">Clear All Data?</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">This will remove all local data. Your account data on the server will not be affected.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Keep</button>
          <button onClick={close} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90">Clear</button>
        </div>
      </Dialog>

      <Dialog open={which === "d24"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <span className="text-xl text-warning dark:text-warning">!</span>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Discard Changes?</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">You have unsaved edits in 3 files. Discard them?</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Keep editing</button>
          <button onClick={close} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Discard</button>
        </div>
      </Dialog>

      <Dialog open={which === "d25"} onClose={close}>
        <IconWrap color="bg-zinc-100 dark:bg-zinc-800">
          <svg className="h-6 w-6 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Logout</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Are you sure you want to sign out? You will need to log in again.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Stay</button>
          <button onClick={close} className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Logout</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
