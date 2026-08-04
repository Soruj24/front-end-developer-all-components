import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const collapsibleSidebar: RegistryEntry = entry({
  id: "collapsible-sidebar",
  title: "Sidebar",
  description: "Collapsible navigation sidebar.",
  source: `import {
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

export default function CollapsibleSidebar() {
  return (
    <div className="flex gap-4">
      <div className="w-64 rounded-lg border p-4">
        <Collapsible defaultOpen>
          <CollapsibleHeader>
            <CollapsibleTitle className="text-sm font-semibold">Navigation</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon open={true} />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <div className="flex flex-col gap-1 pl-2">
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Dashboard</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Projects</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Settings</a>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleHeader>
            <CollapsibleTitle className="text-sm font-semibold">Team</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon open={false} />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <div className="flex flex-col gap-1 pl-2">
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Members</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Roles</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Permissions</a>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleHeader>
            <CollapsibleTitle className="text-sm font-semibold">Billing</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon open={false} />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <div className="flex flex-col gap-1 pl-2">
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Plans</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Payment</a>
              <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Invoices</a>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="flex-1 rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">Main content area. Click sidebar sections to expand/collapse.</p>
      </div>
    </div>
  );
}`,
});
