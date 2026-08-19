"use client";

import { useState } from "react";
import { Collapsible } from "@/components/ui/Collapsible";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const COLLAPSIBLE_SOURCE = `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { CollapsibleProps } from "./Collapsible.types";

export function Collapsible({
  open: controlledOpen,
  onOpenChange,
  trigger,
  children,
  className,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledOpen;
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={cn("w-full", className)}>
      <button type="button" onClick={toggle} className="flex w-full items-center justify-between">
        {trigger}
        <svg className={cn("h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="mt-2 overflow-hidden animate-in slide-in-from-top-1">{children}</div>}
    </div>
  );
}`;

const BASIC_CODE = `import { Collapsible } from "@/components/ui/Collapsible";

<Collapsible trigger={<span>Click to toggle</span>}>
  <div className="rounded-md border p-4 text-sm">Content here</div>
</Collapsible>`;

const CONTROLLED_CODE = `"use client";
import { useState } from "react";
import { Collapsible } from "@/components/ui/Collapsible";

function ControlledExample() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} trigger={<span>Controlled</span>}>
      <div className="border p-4 text-sm">State: {open ? "open" : "closed"}</div>
    </Collapsible>
  );
}`;

const FAQ_CODE = `import { Collapsible } from "@/components/ui/Collapsible";

const items = [
  { q: "What is this?", a: "A collapsible expands and collapses content." },
  { q: "When to use?", a: "For FAQs, menus, and progressive disclosure." },
];

function FAQ() {
  return items.map((item) => (
    <Collapsible key={item.q} trigger={<span>{item.q}</span>}>
      <p className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</p>
    </Collapsible>
  ));
}`;

export default function CollapsiblePage() {
  const [open1, setOpen1] = useState(false);

  return (
    <ComponentDocPage
      name="Collapsible"
      category="Layout"
      description="An interactive component that expands and collapses to show or hide content. Use collapsibles to progressively disclose information and reduce visual clutter."
    >
      <PreviewPanel filename="collapsible-demo.tsx">
        <Collapsible trigger={<span className="text-sm font-medium">Click to toggle</span>}>
          <div className="rounded-md border p-4 text-sm">
            This is the collapsible content. You can put anything here.
          </div>
        </Collapsible>
      </PreviewPanel>

      <SourceCodeViewer source={COLLAPSIBLE_SOURCE} filename="Collapsible.tsx" defaultExpanded />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <Collapsible trigger={<span className="text-sm font-medium">Click to toggle</span>}>
          <div className="rounded-md border p-4 text-sm">This is the collapsible content.</div>
        </Collapsible>
      </ExampleBlock>

      <ExampleBlock title="Controlled" description="Control open state externally via open and onOpenChange props." code={CONTROLLED_CODE}>
        <div className="flex w-full flex-col gap-3">
          <Collapsible open={open1} onOpenChange={setOpen1} trigger={<span className="text-sm font-medium">Controlled collapsible</span>}>
            <div className="rounded-md border p-4 text-sm">
              This collapsible is controlled externally. State: {open1 ? "open" : "closed"}
            </div>
          </Collapsible>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpen1(true)} className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">Open</button>
            <button type="button" onClick={() => setOpen1(false)} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Close</button>
            <button type="button" onClick={() => setOpen1(!open1)} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">Toggle</button>
          </div>
        </div>
      </ExampleBlock>

      <ExampleBlock title="FAQ Pattern" description="Common use case for frequently asked questions." code={FAQ_CODE}>
        <div className="flex w-full flex-col gap-2">
          {[
            { q: "What is this component?", a: "A collapsible is an interactive element that expands and collapses to show or hide content." },
            { q: "When should I use it?", a: "Use collapsibles for FAQs, navigation menus, settings panels, or anywhere you want to progressively disclose content." },
            { q: "Is it accessible?", a: "Yes! It uses proper ARIA attributes and keyboard navigation." },
          ].map((item) => (
            <Collapsible key={item.q} trigger={<span className="text-sm font-medium">{item.q}</span>} className="rounded-md border px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <div className="pb-2 text-sm text-muted-foreground">{item.a}</div>
            </Collapsible>
          ))}
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
