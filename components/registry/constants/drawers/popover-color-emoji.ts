import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const popoverColorEmoji: RegistryEntry = entry({
    id: "popover-color-emoji",
    title: "Color & Emoji",
    description: "Color swatches and emoji pickers for theming.",
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

function ColorContent() {
  const colors = [
    { name: "Red", value: "bg-danger" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Amber", value: "bg-warning" },
    { name: "Green", value: "bg-success-soft0" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Indigo", value: "bg-indigo-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Pink", value: "bg-pink-500" },
  ];
  const [sel, setSel] = useState("bg-blue-500");
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-zinc-500">Cover</p>
      <div className="grid grid-cols-4 gap-2">
        {colors.map((c) => (
          <button key={c.name} onClick={() => setSel(c.value)} className={\`flex h-8 w-8 items-center justify-center rounded-md text-[10px] text-white \${c.value} ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 \${sel === c.value ? "ring-2 ring-zinc-900 dark:ring-white" : ""}\`} />
        ))}
      </div>
    </div>
  );
}

function EmojiContent() {
  const emojis = ["\u{1F600}", "\u{1F601}", "\u{1F602}", "\u{1F60D}", "\u{1F44D}", "\u{1F44E}", "\u{1F4AF}", "\u{2728}"];
  const [sel, setSel] = useState("\u{1F44D}");
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-zinc-500">Reaction</p>
      <div className="grid grid-cols-4 gap-2">
        {emojis.map((e) => (
          <button key={e} onClick={() => setSel(e)} className={\`flex h-8 w-8 items-center justify-center rounded-md text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 \${sel === e ? "ring-2 ring-indigo-500" : ""}\`}>{e}</button>
        ))}
      </div>
    </div>
  );
}

export default function PopoverColorEmoji() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Color</button>
        <Popover open={open === 0} onClose={() => setOpen(null)} placement="bottom">
          <ColorContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Emoji</button>
        <Popover open={open === 1} onClose={() => setOpen(null)} placement="bottom">
          <EmojiContent />
        </Popover>
      </div>
    </div>
  );
}`,
  });
