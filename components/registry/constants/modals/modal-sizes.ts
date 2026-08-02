import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalSizes: RegistryEntry = entry({
    id: "modal-sizes",
    title: "Modal Sizes",
    description: "Four widths — small, medium, large, and extra large.",
    source: `import { useEffect, useRef, useState } from "react";

const SIZE = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };

const SIZES = [
  { key: "sm", label: "SM", desc: "Narrow modal" },
  { key: "md", label: "MD", desc: "Default modal" },
  { key: "lg", label: "LG", desc: "Wide modal" },
  { key: "xl", label: "XL", desc: "Extra wide modal" },
];

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

export default function ModalSizes() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("md");
  const close = () => setOpen(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {SIZES.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              setSize(s.key);
              setOpen(true);
            }}
            className="rounded-xl border border-zinc-200 p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-primary dark:bg-indigo-900/30 dark:text-indigo-400">
              {s.label.slice(0, 2)}
            </div>
            <div className="text-sm font-medium">{s.label}</div>
            <div className="mt-0.5 text-xs text-zinc-500">{s.desc}</div>
          </button>
        ))}
      </div>
      <Modal open={open} onClose={close} title={\`\${size.toUpperCase()} Modal\`} size={size}>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This modal uses the {size} width variant.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={close}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}`,
  });
