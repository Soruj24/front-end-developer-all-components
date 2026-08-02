import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogFeedbackRating: RegistryEntry = entry({
    id: "dialog-feedback-rating",
    title: "Feedback & Rating Dialogs",
    description: "Rate your experience and send feedback.",
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
  { id: "d9", label: "Rating Dialog", desc: "Rate your experience", badge: "1" },
  { id: "d10", label: "Feedback Dialog", desc: "Send feedback message", badge: "2" },
];

export default function DialogFeedbackRating() {
  const [which, setWhich] = useState(null);
  const [rating, setRating] = useState(0);
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

      <Dialog open={which === "d9"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <svg className="h-6 w-6 text-warning dark:text-warning" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </IconWrap>
        <h2 className="mb-2 text-center text-lg font-semibold">Rate Your Experience</h2>
        <p className="mb-4 text-center text-sm text-zinc-600 dark:text-zinc-400">How would you rate our service?</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={\`h-10 w-10 rounded-full text-sm font-medium transition-colors \${
                r <= rating
                  ? "bg-warning text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }\`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Submit</button>
        </div>
      </Dialog>

      <Dialog open={which === "d10"} onClose={close}>
        <h2 className="mb-4 text-center text-lg font-semibold">Send Feedback</h2>
        <textarea
          placeholder="Tell us what you think..."
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring dark:border-zinc-600 dark:bg-zinc-800"
          rows={4}
        />
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Send</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
