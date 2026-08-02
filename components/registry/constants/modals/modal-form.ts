import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalForm: RegistryEntry = entry({
    id: "modal-form",
    title: "Form Modal",
    description: "A create-user modal with name, email, and role fields.",
    source: `import { useEffect, useRef, useState } from "react";

function FormModal({ open, onClose }) {
  const ref = useRef(null);
  const previous = useRef(null);
  const [anim, setAnim] = useState(false);
  const [data, setData] = useState({ name: "", email: "", role: "user" });

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
        className={\`relative z-10 mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl transition-all duration-200 dark:bg-zinc-900 \${anim ? "scale-100 opacity-100" : "scale-95 opacity-0"}\`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">New User</h2>
          <button
            onClick={onClose}
            className="text-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            &times;
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Name</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Email</label>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="john@example.com"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Role</label>
            <select
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ModalForm() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
        >
          Open Form Modal
        </button>
      </div>
      <FormModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}`,
  });
