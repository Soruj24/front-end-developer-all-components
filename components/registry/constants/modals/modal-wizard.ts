import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalWizard: RegistryEntry = entry({
    id: "modal-wizard",
    title: "Multi-Step Wizard",
    description: "A three-step wizard with a progress indicator.",
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

export default function ModalWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const close = () => {
    setOpen(false);
    setStep(1);
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
        >
          Open Wizard
        </button>
      </div>
      <Modal open={open} onClose={close} title={\`Step \${step} of 3\`} size="md">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your project details to get started.</p>
            <input className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Project name" />
            <textarea className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800" placeholder="Description" rows={3} />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose your template and preferences.</p>
            <div className="flex gap-3">
              {["Basic", "Advanced", "Custom"].map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-700">
                  <input type="radio" name="template" className="accent-primary" />
                  {t}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Review and confirm your selections.</p>
            <div className="rounded-lg bg-zinc-50 p-3 text-sm dark:bg-zinc-800">
              <p>
                <strong>Project:</strong> My Project
              </p>
              <p>
                <strong>Template:</strong> Basic
              </p>
            </div>
          </div>
        )}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={\`h-1.5 w-6 rounded-full \${s <= step ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-700"}\`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Next
              </button>
            ) : (
              <button
                onClick={close}
                className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-white hover:bg-success/90"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}`,
  });
