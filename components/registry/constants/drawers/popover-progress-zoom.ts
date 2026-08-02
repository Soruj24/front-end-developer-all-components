import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const popoverProgressZoom: RegistryEntry = entry({
    id: "popover-progress-zoom",
    title: "Progress & Zoom",
    description: "Range inputs for progress and zoom levels.",
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

function ProgressContent() {
  const [p, setP] = useState(50);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-zinc-500">Progress {p}%</p>
      <input type="range" min={0} max={100} value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-primary" />
      <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="h-1.5 rounded-full bg-indigo-500 transition-all" style={{ width: \`\${p}%\` }} />
      </div>
    </div>
  );
}

function ZoomContent() {
  const [z, setZ] = useState(100);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-zinc-500">Zoom {z}%</p>
      <div className="flex items-center gap-2">
        <button onClick={() => setZ(Math.max(25, z - 25))} className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">-</button>
        <input type="range" min={25} max={400} value={z} onChange={(e) => setZ(Number(e.target.value))} className="w-full accent-primary" />
        <button onClick={() => setZ(Math.min(400, z + 25))} className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">+</button>
      </div>
    </div>
  );
}

export default function PopoverProgressZoom() {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Progress</button>
        <Popover open={open === 0} onClose={() => setOpen(null)} placement="bottom">
          <ProgressContent />
        </Popover>
      </div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Zoom</button>
        <Popover open={open === 1} onClose={() => setOpen(null)} placement="top">
          <ZoomContent />
        </Popover>
      </div>
    </div>
  );
}`,
  });
