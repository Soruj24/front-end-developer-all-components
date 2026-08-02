import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalInteractive: RegistryEntry = entry({
    id: "modal-interactive",
    title: "Interactive Demo",
    description:
      "A configurable modal with focus trap, keyboard navigation, and enter/exit animations.",
    source: `import { useEffect, useRef, useState } from "react";

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

export default function ModalInteractive() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          Open Modal
        </button>
      </div>
      <Modal open={open} onClose={close} title="Interactive Demo" size="lg">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This modal demonstrates focus trap, keyboard navigation (Tab/Escape), and smooth enter/exit animations.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">Focus trap</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">Escape dismiss</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">Scale animation</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">Backdrop click</span>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={close}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}`,
  });
