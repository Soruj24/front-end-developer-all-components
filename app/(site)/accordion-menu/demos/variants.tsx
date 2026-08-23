"use client";

import { Accordion, AccordionItem } from "./accordion";
import { FileText, Users, BarChart3 } from "lucide-react";

const items: AccordionItem[] = [
  {
    title: "Documents",
    icon: <FileText className="h-4 w-4" />,
    content: <p className="text-sm">Access and manage your document library.</p>,
  },
  {
    title: "Team Members",
    icon: <Users className="h-4 w-4" />,
    content: <p className="text-sm">View and invite team members.</p>,
  },
  {
    title: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    content: <p className="text-sm">Track usage and performance metrics.</p>,
  },
];

export function VariantsDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Bordered</p>
        <Accordion items={items} variant="bordered" defaultOpen={[0]} />
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Separated</p>
        <Accordion items={items} variant="separated" defaultOpen={[0]} />
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Boxed</p>
        <Accordion items={items} variant="boxed" defaultOpen={[0]} />
      </div>
    </div>
  );
}
