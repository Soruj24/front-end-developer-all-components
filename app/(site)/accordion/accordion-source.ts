 
export const ACCORDION_SOURCE = `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  id?: string;
  title: React.ReactNode;
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

  /**
   * Allow multiple accordion items to remain open.
   */
  multi?: boolean;

  /**
   * Visual style of the accordion.
   */
  variant?: AccordionVariant;

  /**
   * Initial open item indexes for uncontrolled usage.
   */
  defaultOpen?: number[];

  /**
   * Controlled open item indexes.
   */
  openItems?: number[];

  /**
   * Called whenever the open items change.
   */
  onChange?: (openItems: number[]) => void;

  /**
   * Additional class names for the root element.
   */
  className?: string;

  /**
   * Additional class names for each accordion item.
   */
  itemClassName?: string;

  /**
   * Additional class names for accordion triggers.
   */
  triggerClassName?: string;

  /**
   * Additional class names for accordion content.
   */
  contentClassName?: string;

  /**
   * Disable the entire accordion.
   */
  disabled?: boolean;
}

const containerClasses: Record<AccordionVariant, string> = {
  bordered:
    "overflow-hidden rounded-xl border border-border bg-background",

  ghost:
    "bg-transparent",

  boxed:
    "flex flex-col gap-2",

  separated:
    "flex flex-col gap-3",

  minimal:
    "bg-transparent",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 text-muted-foreground",
        "transition-transform duration-200",
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function normalizeIndexes(
  indexes: number[],
  itemCount: number,
  multi: boolean,
) {
  const validIndexes = indexes.filter(
    (index) =>
      Number.isInteger(index) &&
      index >= 0 &&
      index < itemCount,
  );

  const uniqueIndexes = [...new Set(validIndexes)];

  return multi
    ? uniqueIndexes
    : uniqueIndexes.slice(0, 1);
}

export function Accordion({
  items,
  multi = false,
  variant = "bordered",
  defaultOpen = [0],
  openItems: controlledOpenItems,
  onChange,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  disabled = false,
}: AccordionProps) {
  const baseId = React.useId();

  const isControlled =
    controlledOpenItems !== undefined;

  const normalizedDefaultOpen = React.useMemo(
    () =>
      normalizeIndexes(
        defaultOpen,
        items.length,
        multi,
      ),
    [defaultOpen, items.length, multi],
  );

  const [internalOpenItems, setInternalOpenItems] =
    React.useState<number[]>(
      normalizedDefaultOpen,
    );

  const openItems = isControlled
    ? normalizeIndexes(
        controlledOpenItems,
        items.length,
        multi,
      )
    : internalOpenItems;

  const updateOpenItems = React.useCallback(
    (nextItems: number[]) => {
      const normalized = normalizeIndexes(
        nextItems,
        items.length,
        multi,
      );

      if (!isControlled) {
        setInternalOpenItems(normalized);
      }

      onChange?.(normalized);
    },
    [
      items.length,
      multi,
      isControlled,
      onChange,
    ],
  );

  const toggle = React.useCallback(
    (index: number) => {
      const item = items[index];

      if (!item || item.disabled || disabled) {
        return;
      }

      const isOpen = openItems.includes(index);

      if (multi) {
        updateOpenItems(
          isOpen
            ? openItems.filter(
                (itemIndex) => itemIndex !== index,
              )
            : [...openItems, index],
        );

        return;
      }

      updateOpenItems(
        isOpen ? [] : [index],
      );
    },
    [
      items,
      disabled,
      multi,
      openItems,
      updateOpenItems,
    ],
  );

  const handleKeyDown = React.useCallback(
    (
      event: React.KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      const enabledIndexes = items
        .map((item, itemIndex) =>
          item.disabled || disabled
            ? -1
            : itemIndex,
        )
        .filter((itemIndex) => itemIndex !== -1);

      if (!enabledIndexes.length) {
        return;
      }

      const currentPosition =
        enabledIndexes.indexOf(index);

      let nextPosition = currentPosition;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();

          nextPosition =
            (currentPosition + 1) %
            enabledIndexes.length;

          break;

        case "ArrowUp":
          event.preventDefault();

          nextPosition =
            (currentPosition - 1 +
              enabledIndexes.length) %
            enabledIndexes.length;

          break;

        case "Home":
          event.preventDefault();
          nextPosition = 0;
          break;

        case "End":
          event.preventDefault();
          nextPosition =
            enabledIndexes.length - 1;
          break;

        default:
          return;
      }

      const nextIndex =
        enabledIndexes[nextPosition];

      document
        .getElementById(
          \`\${baseId}-trigger-\${nextIndex}\`,
        )
        ?.focus();
    },
    [items, disabled, baseId],
  );

  const isCardVariant =
    variant === "boxed" ||
    variant === "separated";

  if (!items.length) {
    return null;
  }

  return (
    <div
      className={cn(
        containerClasses[variant],
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      data-slot="accordion"
      data-variant={variant}
      data-disabled={disabled || undefined}
    >
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        const isDisabled =
          disabled || Boolean(item.disabled);

        const itemId =
          item.id ??
          \`\${baseId}-item-\${index}\`;

        const triggerId =
          \`\${baseId}-trigger-\${index}\`;

        const contentId =
          \`\${baseId}-content-\${index}\`;

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
              itemClassName,
            )}
            data-slot="accordion-item"
            data-state={
              isOpen ? "open" : "closed"
            }
            data-disabled={
              isDisabled || undefined
            }
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              aria-disabled={
                isDisabled || undefined
              }
              disabled={isDisabled}
              onClick={() => toggle(index)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
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

                !isDisabled &&
                  !isOpen &&
                  "hover:bg-muted/60",

                isOpen &&
                  "bg-muted/40",

                triggerClassName,
              )}
              data-slot="accordion-trigger"
              data-state={
                isOpen ? "open" : "closed"
              }
              data-disabled={
                isDisabled || undefined
              }
            >
              {item.icon && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0",
                    "text-muted-foreground",
                    "transition-colors",
                    "duration-200",
                  )}
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
              aria-hidden={!isOpen}
              className={cn(
                "grid overflow-hidden",
                "transition-[grid-template-rows]",
                "duration-300",
                "ease-[cubic-bezier(0.87,0,0.13,1)]",
                isOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]",
              )}
              data-slot="accordion-content"
              data-state={
                isOpen ? "open" : "closed"
              }
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={cn(
                    "px-4 pb-4 pt-1",
                    "text-sm leading-6",
                    "text-muted-foreground",
                    "sm:px-5 sm:pb-5",
                    contentClassName,
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
    body: (
      <p>
        React is a JavaScript library for
        building user interfaces.
      </p>
    ),
  },
  {
    title: "What is Next.js?",
    body: (
      <p>
        Next.js is a React framework for
        building full-stack web applications.
      </p>
    ),
  },
  {
    title: "What is Tailwind CSS?",
    body: (
      <p>
        Tailwind CSS is a utility-first
        CSS framework.
      </p>
    ),
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
const items = [
  {
    title: "What is React?",
    body: "React is a JavaScript library.",
  },
  {
    title: "What is Next.js?",
    body: "Next.js is a React framework.",
  },
  {
    title: "What is Tailwind CSS?",
    body: "Tailwind CSS is a utility-first CSS framework.",
  },
];

{/* Single item at a time */}
<Accordion
  items={items}
  multi={false}
/>

{/* Multiple items at the same time */}
<Accordion
  items={items}
  multi
/>
`;

export const CONTROLS_EXAMPLE = `
{/* First item open by default */}
<Accordion
  items={faqItems}
  defaultOpen={[0]}
/>

{/* Second item open by default */}
<Accordion
  items={faqItems}
  defaultOpen={[1]}
/>

{/* Multiple items open by default */}
<Accordion
  items={faqItems}
  multi
  defaultOpen={[0, 1]}
/>

{/* Everything closed */}
<Accordion
  items={faqItems}
  defaultOpen={[]}
/>
`;

export const CONTROLLED_EXAMPLE = `
const [openItems, setOpenItems] =
  useState<number[]>([0]);

<Accordion
  items={faqItems}
  openItems={openItems}
  onChange={setOpenItems}
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
  defaultOpen={[]}
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
    body:
      "Manage security settings and authentication.",
    icon: (
      <ShieldCheck className="h-4 w-4" />
    ),
  },
  {
    title: "AI Features",
    body:
      "Configure AI-powered features for your application.",
    icon: (
      <Sparkles className="h-4 w-4" />
    ),
  },
  {
    title: "Settings",
    body:
      "Manage your application preferences.",
    icon: (
      <Settings className="h-4 w-4" />
    ),
  },
];

<Accordion
  items={itemsWithIcons}
  variant="boxed"
  defaultOpen={[]}
/>
`;

export const LONG_EXAMPLE = `
const longItems = [
  {
    title: "Terms and Conditions",
    body: (
      <div className="space-y-3">
        <p>
          These terms and conditions explain
          the rules and regulations for using
          this application.
        </p>

        <p>
          By accessing this application, you
          agree to be bound by these terms and
          conditions.
        </p>

        <p>
          If you disagree with any part of
          these terms, you should not use the
          application.
        </p>
      </div>
    ),
  },
];

<Accordion
  items={longItems}
  defaultOpen={[]}
/>
`;

export const CUSTOM_CONTENT_EXAMPLE = `
const items = [
  {
    title: "Account Information",
    body: (
      <div className="space-y-4">
        <p>
          Manage your account information
          and preferences.
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

export const CUSTOM_STYLING_EXAMPLE = `
<Accordion
  items={faqItems}
  variant="bordered"
  className="max-w-2xl"
  itemClassName="bg-background"
  triggerClassName="hover:bg-accent"
  contentClassName="text-sm"
/>
`;

export const KEYBOARD_NAVIGATION_EXAMPLE = `
<Accordion
  items={faqItems}
  defaultOpen={[]}
/>

{/* Supported keyboard controls:

  ArrowDown → Move to next item
  ArrowUp   → Move to previous item
  Home      → Move to first item
  End       → Move to last item
  Enter     → Toggle current item
  Space     → Toggle current item
*/}
`;
 