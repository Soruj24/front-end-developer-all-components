export const ACCORDION_SOURCE = `"use client";

import { useId, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface AccordionItemData {
  title: string;
  body: string;
  disabled?: boolean;
}

type AccordionVariant = "bordered" | "ghost" | "boxed" | "separated" | "minimal";

const containerClasses: Record<AccordionVariant, string> = {
  bordered: "rounded-xl border border-border overflow-hidden",
  ghost: "",
  boxed: "flex flex-col gap-1.5",
  separated: "flex flex-col gap-2",
  minimal: "",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
        open && "rotate-180",
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Accordion({
  items,
  multi = false,
  variant = "bordered",
  startOpen = 0,
}: {
  items: AccordionItemData[];
  multi?: boolean;
  variant?: AccordionVariant;
  startOpen?: number;
}) {
  const [open, setOpen] = useState<number[]>([startOpen]);
  const uid = useId();

  const toggle = useCallback(
    (i: number) => {
      if (items[i].disabled) return;
      setOpen((prev) => {
        if (!multi) return prev.includes(i) ? [] : [i];
        return prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i];
      });
    },
    [items, multi],
  );

  const isCard = variant === "boxed" || variant === "separated";

  return (
    <div className={containerClasses[variant]}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const panelId = \`\${uid}-\${i}\`;
        const buttonId = \`\${panelId}-trigger\`;
        return (
          <div
            key={item.title}
            className={cn(
              isCard && "rounded-xl border border-border bg-background overflow-hidden",
              !isCard && variant !== "minimal" && i < items.length - 1 && "border-b border-border",
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(i)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3.5 text-left",
                "text-sm font-medium text-foreground",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-40",
                !isOpen && "hover:bg-muted/60",
                isOpen && "bg-muted/40",
              )}
            >
              <span className="flex-1">{item.title}</span>
              <ChevronIcon open={isOpen} />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`;

export const VARIANTS_EXAMPLE = `<Accordion items={faqItems} variant="bordered" />
<Accordion items={faqItems} variant="ghost" />
<Accordion items={simpleItems} variant="boxed" />
<Accordion items={simpleItems} variant="separated" />
<Accordion items={faqItems} variant="minimal" />`;

export const OPEN_MODE_EXAMPLE = `<Accordion items={faqItems} />
<Accordion items={faqItems} multi />`;

export const CONTROLS_EXAMPLE = `<Accordion items={faqItems} multi startOpen={expanded ? 0 : -1} />`;

export const DISABLED_EXAMPLE = `<Accordion items={disabledItems} startOpen={-1} />`;

export const LONG_EXAMPLE = `<Accordion items={longItems} startOpen={-1} />`;

export const ICONS_EXAMPLE = `<Accordion items={itemsWithIcons} startOpen={-1} />`;

export const GROUPED_EXAMPLE = `<Accordion items={section.items} variant="boxed" startOpen={-1} />`;

export const USECASES_EXAMPLE = `<Accordion items={useCase.items} variant="boxed" startOpen={-1} />`;

export const NESTED_EXAMPLE = `<Accordion items={nestedData} startOpen={-1} />`;

export const FAQ_EXAMPLE = `<AccordionItem title={item.q} body={item.a} />`;
