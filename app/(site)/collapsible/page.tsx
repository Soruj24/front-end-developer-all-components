"use client";

import { useState, useCallback } from "react";
import { Collapsible } from "@/components/ui/Collapsible";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const COLLAPSIBLE_SOURCE = `"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Collapsible({
  open: controlledOpen,
  onOpenChange,
  trigger,
  children,
  defaultOpen = false,
  disabled = false,
  className,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

  const setIsOpen = useCallback((next: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);

  const toggle = useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
  }, [disabled, isOpen, setIsOpen]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      setHeight(el.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(timer);
    } else {
      setHeight(el.scrollHeight);
      requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
    }
  }, [isOpen]);

  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card", disabled && "opacity-50", className)}>
      <button type="button" onClick={toggle} disabled={disabled} aria-expanded={isOpen}
        className={cn("flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground",
          "transition-colors duration-150 hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.99]", disabled && "cursor-not-allowed")}>
        {trigger}
        <svg className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-in-out", isOpen && "rotate-180")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div ref={contentRef} role="region" style={{ height: height !== undefined ? \`\${height}px\` : undefined }}
        className="overflow-hidden transition-[height] duration-200 ease-in-out">
        <div className="border-t border-border px-4 py-3">{children}</div>
      </div>
    </div>
  );
}`;

const BASIC_CODE = `import { Collapsible } from "@/components/ui/Collapsible";

<Collapsible trigger={<span>Click to toggle</span>}>
  <p className="text-sm text-muted-foreground">Content here</p>
</Collapsible>`;

const CONTROLLED_CODE = `"use client";
import { useState } from "react";
import { Collapsible } from "@/components/ui/Collapsible";

function ControlledExample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Collapsible open={open} onOpenChange={setOpen} trigger={<span>Controlled</span>}>
        <p className="text-sm text-muted-foreground">State: {open ? "open" : "closed"}</p>
      </Collapsible>
      <div className="flex gap-2">
        <button onClick={() => setOpen(true)}>Open</button>
        <button onClick={() => setOpen(false)}>Close</button>
        <button onClick={() => setOpen(!open)}>Toggle</button>
      </div>
    </div>
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
      <p className="text-sm text-muted-foreground">{item.a}</p>
    </Collapsible>
  ));
}`;

const DEFAULT_OPEN_CODE = `import { Collapsible } from "@/components/ui/Collapsible";

<Collapsible defaultOpen trigger={<span>Starts open</span>}>
  <p className="text-sm text-muted-foreground">This content is visible by default.</p>
</Collapsible>`;

const DISABLED_CODE = `import { Collapsible } from "@/components/ui/Collapsible";

<Collapsible disabled trigger={<span>Disabled</span>}>
  <p className="text-sm text-muted-foreground">You cannot see this.</p>
</Collapsible>`;

const ACCORDION_CODE = `"use client";
import { useState } from "react";
import { Collapsible } from "@/components/ui/Collapsible";

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { q: "What is this?", a: "An accordion built with collapsibles." },
    { q: "How does it work?", a: "Only one item can be open at a time." },
    { q: "Is it accessible?", a: "Yes, with proper ARIA attributes." },
  ];

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <Collapsible key={item.q} open={openIndex === i} onOpenChange={(v) => setOpenIndex(v ? i : null)}
          trigger={<span>{item.q}</span>}>
          <p className="text-sm text-muted-foreground">{item.a}</p>
        </Collapsible>
      ))}
    </div>
  );
}`;

export default function CollapsiblePage() {
  const [open1, setOpen1] = useState(false);
  const [accordionIndex, setAccordionIndex] = useState<number | null>(null);

  const handleAccordion = useCallback((index: number, open: boolean) => {
    setAccordionIndex(open ? index : null);
  }, []);

  return (
    <ComponentDocPage
      name="Collapsible"
      category="Layout"
      description="An interactive component that expands and collapses to show or hide content with smooth height animation. Supports controlled/uncontrolled modes, disabled state, and nested collapsibles."
    >
      <PreviewPanel filename="collapsible-demo.tsx">
        <div className="w-full">
          <Collapsible trigger={<span>Click to toggle</span>}>
            <p className="text-sm text-muted-foreground">
              This is the collapsible content. You can put anything here.
            </p>
          </Collapsible>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COLLAPSIBLE_SOURCE}
        filename="components/ui/Collapsible/Collapsible.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          code={BASIC_CODE}
          filename="basic.tsx"
        >
          <div className="w-full">
            <Collapsible trigger={<span>Click to toggle</span>}>
              <p className="text-sm text-muted-foreground">
                This is the collapsible content.
              </p>
            </Collapsible>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control open state externally via open and onOpenChange props."
          code={CONTROLLED_CODE}
          filename="controlled.tsx"
        >
          <div className="flex w-full flex-col gap-3">
            <Collapsible
              open={open1}
              onOpenChange={setOpen1}
              trigger={<span>Controlled collapsible</span>}
            >
              <p className="text-sm text-muted-foreground">
                This collapsible is controlled externally. State:{" "}
                {open1 ? "open" : "closed"}
              </p>
            </Collapsible>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpen1(true)}
                className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Open
              </button>
              <button
                type="button"
                onClick={() => setOpen1(false)}
                className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setOpen1(!open1)}
                className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Toggle
              </button>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="FAQ Pattern"
          description="Common use case for frequently asked questions."
          code={FAQ_CODE}
          filename="faq.tsx"
        >
          <div className="flex w-full flex-col gap-2">
            {[
              {
                q: "What is this component?",
                a: "A collapsible is an interactive element that expands and collapses to show or hide content.",
              },
              {
                q: "When should I use it?",
                a: "Use collapsibles for FAQs, navigation menus, settings panels, or anywhere you want to progressively disclose content.",
              },
              {
                q: "Is it accessible?",
                a: "Yes! It uses proper ARIA attributes and keyboard navigation.",
              },
            ].map((item) => (
              <Collapsible
                key={item.q}
                trigger={<span>{item.q}</span>}
              >
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </Collapsible>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Accordion"
          description="Only one collapsible open at a time, controlled externally."
          code={ACCORDION_CODE}
          filename="accordion.tsx"
        >
          <div className="flex w-full flex-col gap-2">
            {[
              {
                q: "What is this?",
                a: "An accordion built with collapsibles.",
              },
              {
                q: "How does it work?",
                a: "Only one item can be open at a time.",
              },
              {
                q: "Is it accessible?",
                a: "Yes, with proper ARIA attributes.",
              },
            ].map((item, i) => (
              <Collapsible
                key={item.q}
                open={accordionIndex === i}
                onOpenChange={(v) => handleAccordion(i, v)}
                trigger={<span>{item.q}</span>}
              >
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </Collapsible>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Default Open"
          description="Starts in the expanded state."
          code={DEFAULT_OPEN_CODE}
          filename="default-open.tsx"
        >
          <div className="w-full">
            <Collapsible defaultOpen trigger={<span>Starts open</span>}>
              <p className="text-sm text-muted-foreground">
                This content is visible by default.
              </p>
            </Collapsible>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive collapsible with reduced opacity."
          code={DISABLED_CODE}
          filename="disabled.tsx"
        >
          <div className="w-full">
            <Collapsible disabled trigger={<span>Disabled</span>}>
              <p className="text-sm text-muted-foreground">
                You cannot see this.
              </p>
            </Collapsible>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
