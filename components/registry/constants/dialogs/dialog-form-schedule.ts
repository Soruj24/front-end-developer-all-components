import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dialogFormSchedule: RegistryEntry = entry({
    id: "dialog-form-schedule",
    title: "Form & Schedule Dialogs",
    description: "Profile, schedule, and reminder dialogs with input fields.",
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
  { id: "d8", label: "Form Dialog", desc: "Inline form with name/email fields", badge: "1" },
  { id: "d27", label: "Schedule Dialog", desc: "Schedule an event", badge: "2" },
  { id: "d29", label: "Reminder Dialog", desc: "Set a reminder", badge: "3" },
];

const inputClass =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring dark:border-zinc-600 dark:bg-zinc-800";

export default function DialogFormSchedule() {
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

      <Dialog open={which === "d8"} onClose={close}>
        <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
          <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </IconWrap>
        <h2 className="mb-4 text-center text-lg font-semibold">Edit Profile</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
            <input type="text" placeholder="Enter name" className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">Email</label>
            <input type="email" placeholder="Enter email" className={inputClass} />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Save</button>
        </div>
      </Dialog>

      <Dialog open={which === "d27"} onClose={close}>
        <IconWrap color="bg-indigo-100 dark:bg-indigo-900/30">
          <svg className="h-6 w-6 text-primary dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </IconWrap>
        <h2 className="mb-4 text-center text-lg font-semibold">Schedule Event</h2>
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Event title" className={inputClass} />
          <input type="date" className={inputClass} />
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={close} className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Cancel</button>
          <button onClick={close} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Create</button>
        </div>
      </Dialog>

      <Dialog open={which === "d29"} onClose={close}>
        <IconWrap color="bg-amber-100 dark:bg-amber-900/30">
          <svg className="h-6 w-6 text-warning dark:text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </IconWrap>
        <h2 className="mb-4 text-center text-lg font-semibold">Set Reminder</h2>
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Reminder text" className={inputClass} />
          <select className={inputClass}>
            <option>In 1 hour</option>
            <option>In 3 hours</option>
            <option>Tomorrow</option>
            <option>Next week</option>
          </select>
        </div>
        <div className="mt-6">
          <button onClick={close} className="w-full rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">Set</button>
        </div>
      </Dialog>
    </div>
  );
}`,
  });
