import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const popoverForms: RegistryEntry = entry({
    id: "popover-forms",
    title: "Forms & Search",
    description: "Quick forms, inline search, and mention inputs inside popovers.",
    source: `import { useEffect, useRef, useState } from "react";

const PLACEMENT_STYLES = {
  bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
  top: "left-1/2 -translate-x-1/2 bottom-full mb-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_STYLES = {
  bottom: "-top-1 left-1/2 -translate-x-1/2 border-l border-t",
  top: "-bottom-1 left-1/2 -translate-x-1/2 border-r border-b",
  left: "-right-1 top-1/2 -translate-y-1/2 border-t border-r",
  right: "-left-1 top-1/2 -translate-y-1/2 border-l border-b",
};

function Popover({ open, onClose, placement = "bottom", showArrow = true, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) {
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={\`absolute z-40 w-56 rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 \${PLACEMENT_STYLES[placement]}\`}>
      {showArrow && <div className={\`absolute h-2 w-2 rotate-45 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 \${ARROW_STYLES[placement]}\`} />}
      {children}
    </div>
  );
}

function FormContent() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
      <p className="text-xs font-medium text-zinc-500">Quick Form</p>
      <input placeholder="Name" className="rounded-lg border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800" />
      <input placeholder="Email" className="rounded-lg border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800" />
      <button type="submit" className="rounded bg-primary px-2 py-1.5 text-xs text-white hover:bg-primary/90">Submit</button>
    </form>
  );
}

function SearchContent() {
  return (
    <div className="flex flex-col gap-1">
      <input autoFocus placeholder="Type to search..." className="w-full rounded border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800" />
      <div className="mt-1 flex flex-col gap-0.5">
        {["Dashboard", "Settings", "Profile", "Logs"].map((r) => (
          <button key={r} className="rounded px-2 py-1 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">{r}</button>
        ))}
      </div>
    </div>
  );
}

function MentionContent() {
  const users = ["Alice", "Bob", "Carol", "Dave"];
  const [q, setQ] = useState("");
  const filtered = users.filter((u) => u.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="flex flex-col gap-1">
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mention someone..." className="w-full rounded border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800" />
      <div className="mt-1 flex flex-col gap-0.5">
        {filtered.map((u) => (
          <button key={u} className="flex items-center gap-1.5 rounded px-2 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <span>@</span>{u}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PopoverForms() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Quick Form</button>
        <Popover open={open === 0} onClose={() => setOpen(null)} placement="bottom">
          <FormContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Search</button>
        <Popover open={open === 1} onClose={() => setOpen(null)} placement="bottom">
          <SearchContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(2)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Mention</button>
        <Popover open={open === 2} onClose={() => setOpen(null)} placement="bottom">
          <MentionContent />
        </Popover>
      </div>
    </div>
  );
}`,
  });
