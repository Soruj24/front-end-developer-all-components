import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalConfirm: RegistryEntry = entry({
    id: "modal-confirm",
    title: "Confirm Dialogs",
    description: "Standard, destructive, and warning confirmation dialogs.",
    source: `import { useEffect, useRef, useState } from "react";

const VARIANTS = [
  { label: "Standard", variant: "indigo", desc: "Confirm an action" },
  { label: "Destructive", variant: "red", desc: "Delete or irreversible" },
  { label: "Warning", variant: "amber", desc: "Caution required" },
];

const BUTTONS = {
  indigo: "bg-primary hover:bg-primary/90",
  red: "bg-danger hover:bg-danger/90",
  amber: "bg-warning hover:bg-amber-700",
};

const TITLES = {
  indigo: "Confirm Action",
  red: "Delete Item",
  amber: "Unsaved Changes",
};

const MESSAGES = {
  indigo: "Are you sure you want to proceed with this action?",
  red: "This item will be permanently deleted. This cannot be undone.",
  amber: "You have unsaved changes. Do you want to leave without saving?",
};

const CONFIRM_TEXTS = {
  indigo: "Confirm",
  red: "Delete",
  amber: "Leave",
};

function ConfirmModal({ open, onClose, variant }) {
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
        className={\`relative z-10 mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 \${anim ? "scale-100 opacity-100" : "scale-90 opacity-0"}\`}
      >
        <h2 className="text-lg font-semibold">{TITLES[variant]}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{MESSAGES[variant]}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className={\`rounded-lg px-4 py-2 text-sm font-medium text-white \${BUTTONS[variant]}\`}
          >
            {CONFIRM_TEXTS[variant]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModalConfirm() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("indigo");
  const close = () => setOpen(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {VARIANTS.map((c) => (
          <button
            key={c.label}
            onClick={() => {
              setVariant(c.variant);
              setOpen(true);
            }}
            className="rounded-xl border border-zinc-200 p-5 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
          >
            <div className="text-sm font-medium">{c.label}</div>
            <div className="mt-1 text-xs text-zinc-500">{c.desc}</div>
          </button>
        ))}
      </div>
      <ConfirmModal open={open} onClose={close} variant={variant} />
    </div>
  );
}`,
  });
