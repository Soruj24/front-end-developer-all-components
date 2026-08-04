import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleControlled: RegistryEntry = entry({
  id: "collapsible-controlled",
  title: "Controlled",
  description: "Collapsible with externally managed state.",
  source: `import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleHeader,
  CollapsibleTitle,
  CollapsibleContent,
} from "@/components/_collapsible";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={\`h-4 w-4 transition-transform \${open ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function CollapsibleControlled() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleHeader>
          <CollapsibleTitle>Controlled collapsible</CollapsibleTitle>
          <CollapsibleTrigger>
            <ChevronIcon open={open} />
          </CollapsibleTrigger>
        </CollapsibleHeader>
        <CollapsibleContent>
          <div className="rounded-md border p-4 text-sm">
            This collapsible is controlled externally. State: {open ? "open" : "closed"}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className="flex gap-2">
        <button type="button" onClick={() => setOpen(true)} className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
          Open
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Close
        </button>
        <button type="button" onClick={() => setOpen(!open)} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Toggle
        </button>
      </div>
    </div>
  );
}`,
});
