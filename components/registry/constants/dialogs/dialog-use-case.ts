import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogUseCase: RegistryEntry = entry({
    id: "dialog-use-case",
    title: "Use Case Dialogs",
    description: "Permissions, unsubscribe, member removal, payment, share, and spotlights.",
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
  { id: "d19", label: "Permission Request", desc: "Grant permission", badge: "1" },
  { id: "d22", label: "Unsubscribe", desc: "Confirm unsubscribe", badge: "2" },
  { id: "d23", label: "Remove Member", desc: "Remove team member", badge: "3" },
  { id: "d26", label: "Payment Dialog", desc: "Confirm payment", badge: "4" },
  { id: "d28", label: "Share Dialog", desc: "Share via link or email", badge: "5" },
  { id: "d30", label: "Feature Spotlight", desc: "Highlight a new feature", badge: "6" },
];

export default function DialogUseCase() {
  const [which, setWhich] = useState(null);
  const close = () => setWhich(null);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <Dialog open={which === "d19"} onClose={close}>
        <IconWrap color="bg-primary-soft dark:bg-blue-900/30">
          <svg className="h-6 w-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Allow Notifications</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">We want to send you important updates and alerts.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Deny</button>
          <button onClick={close} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Allow</button>
        </div>
      </Dialog>

      <Dialog open={which === "d22"} onClose={close}>
        <IconWrap color="bg-zinc-100 dark:bg-zinc-800">
          <svg className="h-6 w-6 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Unsubscribe</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">You will stop receiving our newsletter. You can re-subscribe anytime.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Keep subscribed</button>
          <button onClick={close} className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Unsubscribe</button>
        </div>
      </Dialog>

      <Dialog open={which === "d23"} onClose={close}>
        <IconWrap color="bg-red-100 dark:bg-red-900/30">
          <svg className="h-6 w-6 text-danger dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0a9 9 0 00-12.728 0m12.728 0L12 12m0 0l-3.636-3.636M12 12l3.636 3.636M12 12l-3.636 3.636" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Remove Member</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Remove Jane Doe from the &quot;Design&quot; team? They will lose access to all shared resources.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90">Remove</button>
        </div>
      </Dialog>

      <Dialog open={which === "d26"} onClose={close}>
        <IconWrap color="bg-green-100 dark:bg-green-900/30">
          <svg className="h-6 w-6 text-success dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Confirm Payment</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          You are about to be charged <strong>$49.00</strong> for the Pro plan.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-success px-4 py-2 text-sm font-medium text-white hover:bg-success/90">Pay $49</button>
        </div>
      </Dialog>

      <Dialog open={which === "d28"} onClose={close}>
        <h2 className="mb-4 text-center text-lg font-semibold">Share</h2>
        <div className="flex justify-center gap-3">
          {["Email", "Link", "Twitter", "Slack"].map((s) => (
            <button key={s} className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
              {s.slice(0, 2)}
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input type="text" readOnly value="https://example.com/share/abc123" className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-xs dark:border-zinc-600 dark:bg-zinc-800" />
          <button className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary/90">Copy</button>
        </div>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Close</button>
        </div>
      </Dialog>

      <Dialog open={which === "d30"} onClose={close}>
        <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
          <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">New: AI Assistant</h2>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Generate code, write docs, and get answers — all powered by AI. Try it with Ctrl+Shift+A.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Skip</button>
          <button onClick={close} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Try Now</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
