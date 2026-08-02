import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalNotifications: RegistryEntry = entry({
    id: "modal-notifications",
    title: "Notification Modals",
    description: "Notification cards that open a detail modal.",
    source: `import { useEffect, useRef, useState } from "react";

const NOTIFICATIONS = [
  { title: "New message", desc: "You have 3 unread messages from your team." },
  { title: "Update available", desc: "Version 4.2.1 is ready to install." },
  { title: "Payment received", desc: "$249.00 has been credited to your account." },
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

export default function ModalNotifications() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(NOTIFICATIONS[0]);
  const current = NOTIFICATIONS.find((n) => n.title === data.title);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {NOTIFICATIONS.map((n, i) => (
          <button
            key={i}
            onClick={() => {
              setData(n);
              setOpen(true);
            }}
            className="rounded-xl border border-zinc-200 p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
          >
            <div className="text-sm font-medium">{n.title}</div>
            <div className="mt-1 text-xs text-zinc-500">{n.desc}</div>
          </button>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={current?.title} size="sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{current?.desc}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Dismiss
          </button>
        </div>
      </Modal>
    </div>
  );
}`,
  });
