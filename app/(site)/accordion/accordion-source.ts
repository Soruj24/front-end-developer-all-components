export const ACCORDION_SOURCE = `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  id?: string;
  title: string;
  body: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type AccordionVariant =
  | "bordered"
  | "ghost"
  | "boxed"
  | "separated"
  | "minimal";

export interface AccordionProps {
  items: AccordionItemData[];
  multi?: boolean;
  variant?: AccordionVariant;
  startOpen?: number;
  className?: string;
  onChange?: (openItems: number[]) => void;
}

const containerClasses: Record<AccordionVariant, string> = {
  bordered:
    "overflow-hidden rounded-xl border border-border bg-background",

  ghost:
    "bg-transparent",

  boxed:
    "flex flex-col gap-1.5",

  separated:
    "flex flex-col gap-2",

  minimal:
    "bg-transparent",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 text-muted-foreground",
        "transition-transform duration-300",
        "ease-[cubic-bezier(0.87,0,0.13,1)]",
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
  className,
  onChange,
}: AccordionProps) {
  const initialOpen =
    startOpen >= 0 && startOpen < items.length
      ? [startOpen]
      : [];

  const [openItems, setOpenItems] =
    React.useState<number[]>(initialOpen);

  const baseId = React.useId();

  const toggle = React.useCallback(
    (index: number) => {
      const item = items[index];

      if (!item || item.disabled) {
        return;
      }

      setOpenItems((previous) => {
        let next: number[];

        if (multi) {
          next = previous.includes(index)
            ? previous.filter((itemIndex) => itemIndex !== index)
            : [...previous, index];
        } else {
          next = previous.includes(index) ? [] : [index];
        }

        onChange?.(next);

        return next;
      });
    },
    [items, multi, onChange],
  );

  const isCardVariant =
    variant === "boxed" || variant === "separated";

  return (
    <div
      className={cn(
        containerClasses[variant],
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);

        const itemId =
          item.id ?? \`\${baseId}-item-\${index}\`;

        const triggerId =
          \`\${itemId}-trigger\`;

        const contentId =
          \`\${itemId}-content\`;

        return (
          <div
            key={itemId}
            className={cn(
              "group",
              isCardVariant && [
                "overflow-hidden rounded-xl",
                "border border-border",
                "bg-background",
              ],
              !isCardVariant &&
                variant !== "minimal" &&
                index < items.length - 1 &&
                "border-b border-border",
            )}
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              disabled={item.disabled}
              onClick={() => toggle(index)}
              className={cn(
                "flex w-full items-center gap-3",
                "px-4 py-3.5 sm:px-5 sm:py-4",
                "text-left text-sm font-medium",
                "text-foreground",
                "transition-colors duration-150",

                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "focus-visible:ring-inset",

                "disabled:cursor-not-allowed",
                "disabled:opacity-40",

                !item.disabled &&
                  !isOpen &&
                  "hover:bg-muted/60",

                isOpen && "bg-muted/40",
              )}
            >
              {item.icon && (
                <span
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground"
                >
                  {item.icon}
                </span>
              )}

              <span className="min-w-0 flex-1">
                {item.title}
              </span>

              <ChevronIcon open={isOpen} />
            </button>

            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid overflow-hidden",
                "transition-[grid-template-rows]",
                "duration-300",
                "ease-[cubic-bezier(0.87,0,0.13,1)]",
                isOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={cn(
                    "px-4 pb-4 pt-1",
                    "text-sm leading-6",
                    "text-muted-foreground",
                    "sm:px-5 sm:pb-5",
                  )}
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
`;
export const BASIC_EXAMPLE = `
const items = [
  {
    title: "What is React?",
    body: "React is a JavaScript library for building user interfaces.",
  },
  {
    title: "What is Next.js?",
    body: "Next.js is a React framework for building full-stack web applications.",
  },
  {
    title: "What is Tailwind CSS?",
    body: "Tailwind CSS is a utility-first CSS framework.",
  },
];

<Accordion items={items} />
`;

export const VARIANTS_EXAMPLE = `
<Accordion
  items={faqItems}
  variant="bordered"
/>

<Accordion
  items={faqItems}
  variant="ghost"
/>

<Accordion
  items={faqItems}
  variant="boxed"
/>

<Accordion
  items={faqItems}
  variant="separated"
/>

<Accordion
  items={faqItems}
  variant="minimal"
/>
`;

export const OPEN_MODE_EXAMPLE = `
{/* Only one item can be open */}
<Accordion
  items={faqItems}
/>

{/* Multiple items can be open */}
<Accordion
  items={faqItems}
  multi
/>
`;

export const CONTROLS_EXAMPLE = `
{/* First item open */}
<Accordion
  items={faqItems}
  startOpen={0}
/>

{/* Second item open */}
<Accordion
  items={faqItems}
  startOpen={1}
/>

{/* Everything closed */}
<Accordion
  items={faqItems}
  startOpen={-1}
/>
`;

export const DISABLED_EXAMPLE = `
const disabledItems = [
  {
    title: "Available feature",
    body: "This section can be opened.",
  },
  {
    title: "Disabled feature",
    body: "This section is currently unavailable.",
    disabled: true,
  },
  {
    title: "Another feature",
    body: "This section can also be opened.",
  },
];

<Accordion
  items={disabledItems}
  startOpen={-1}
/>
`;

export const ICONS_EXAMPLE = `
import {
  ShieldCheck,
  Sparkles,
  Settings,
} from "lucide-react";

const itemsWithIcons = [
  {
    title: "Security",
    body: "Manage security settings and authentication.",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: "AI Features",
    body: "Configure AI-powered features for your application.",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "Settings",
    body: "Manage your application preferences.",
    icon: <Settings className="h-4 w-4" />,
  },
];

<Accordion
  items={itemsWithIcons}
  variant="boxed"
  startOpen={-1}
/>
`;

export const LONG_EXAMPLE = `
const longItems = [
  {
    title: "Terms and Conditions",
    body: (
      <div className="space-y-3">
        <p>
          These terms and conditions explain the rules and
          regulations for using this application.
        </p>

        <p>
          By accessing this application, you agree to be
          bound by these terms and conditions.
        </p>

        <p>
          If you disagree with any part of these terms,
          you should not use the application.
        </p>
      </div>
    ),
  },
];

<Accordion
  items={longItems}
  startOpen={-1}
/>
`;

export const CUSTOM_CONTENT_EXAMPLE = `
const items = [
  {
    title: "Account Information",
    body: (
      <div className="space-y-4">
        <p>
          Manage your account information and preferences.
        </p>

        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">
            Account status
          </p>

          <p className="mt-1 font-medium text-foreground">
            Active
          </p>
        </div>
      </div>
    ),
  },
];

<Accordion
  items={items}
  variant="boxed"
/>
`;