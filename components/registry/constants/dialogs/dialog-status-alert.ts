import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogStatusAlert: RegistryEntry = entry({
    id: "dialog-status-alert",
    title: "Status & Alert Dialogs",
    description: "Alerts, success, error, warning, and info dialogs with a single action.",
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
  { id: "d1", label: "Alert Dialog", desc: "Simple notification with single action", badge: "1" },
  { id: "d4", label: "Success Dialog", desc: "Success state with check icon", badge: "2" },
  { id: "d5", label: "Error Dialog", desc: "Error state with X icon", badge: "3" },
  { id: "d6", label: "Warning Dialog", desc: "Warning with caution icon", badge: "4" },
  { id: "d7", label: "Info Dialog", desc: "Information with info icon", badge: "5" },
];

export default function DialogStatusAlert() {
  const [which, setWhich] = useState(null);
  const close = () => setWhich(null);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

      <Dialog open={which === "d1"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <svg className="h-6 w-6 text-warning dark:text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Session Expiring</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Your session will expire in 2 minutes. Please save your work.</p>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Got it</button>
        </div>
      </Dialog>

      <Dialog open={which === "d4"} onClose={close}>
        <IconWrap color="bg-green-100 dark:bg-green-900/30">
          <svg className="h-6 w-6 text-success dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold text-success dark:text-green-400">Success</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Your changes have been saved successfully.</p>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-success px-4 py-2 text-sm font-medium text-white hover:bg-success/90">Continue</button>
        </div>
      </Dialog>

      <Dialog open={which === "d5"} onClose={close}>
        <IconWrap color="bg-red-100 dark:bg-red-900/30">
          <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold text-danger dark:text-red-400">Error</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Something went wrong. Please try again later.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Dismiss</button>
          <button onClick={close} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90">Retry</button>
        </div>
      </Dialog>

      <Dialog open={which === "d6"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <span className="text-xl text-warning dark:text-warning">&#x26A0;</span>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold text-warning dark:text-warning">Low Disk Space</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Your disk is running low. Free up space to continue using the service.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Later</button>
          <button onClick={close} className="flex-1 rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Manage</button>
        </div>
      </Dialog>

      <Dialog open={which === "d7"} onClose={close}>
        <IconWrap color="bg-primary-soft dark:bg-blue-900/30">
          <svg className="h-6 w-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold text-primary dark:text-blue-400">Did You Know?</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">You can use keyboard shortcuts to navigate faster. Press Ctrl+K to open commands.</p>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Got it</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
