"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
} from "@/components/docs";
import {
  NavigationMenuExample,
  SettingsPanelExample,
  ExpandCollapseExample,
  DisabledItemsExample,
  BadgesExample,
  DescriptionExample,
  VariantsExample,
  SingleModeExample,
  FAQExample,
  CodeBlocksExample,
  OnboardingExample,
  NestedExample,
  InteractiveContentExample,
  GroupedExample,
  RichContentExample,
} from "@/components/ui/Accordion/examples";
import { cn } from "@/lib/cn";

const ACCORDION_SOURCE = `"use client";

import { ReactNode, useId, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
  badge?: string;
}

export type AccordionVariant = "bordered" | "ghost" | "separated" | "boxed";

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  variant?: AccordionVariant;
  className?: string;
  defaultOpen?: number[];
}

const containerClasses: Record<AccordionVariant, string> = {
  bordered: "rounded-xl border border-border overflow-hidden",
  ghost: "",
  separated: "flex flex-col gap-2",
  boxed: "flex flex-col gap-1.5",
};

const itemClasses: Record<AccordionVariant, string> = {
  bordered: "",
  ghost: "",
  separated: "rounded-xl border border-border overflow-hidden bg-background",
  boxed: "rounded-xl border border-border bg-background overflow-hidden",
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

const Accordion = ({
  items,
  multiple = false,
  variant = "bordered",
  className,
  defaultOpen,
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<number[]>(defaultOpen ?? []);
  const uid = useId();

  const toggle = useCallback(
    (index: number) => {
      if (items[index].disabled) return;
      setOpenIds((prev) => {
        if (prev.includes(index)) return prev.filter((id) => id !== index);
        if (multiple) return [...prev, index];
        return [index];
      });
    },
    [items, multiple],
  );

  return (
    <div className={cn(containerClasses[variant], className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(index);
        const panelId = \`\${uid}-\${index}\`;
        const buttonId = \`\${panelId}-trigger\`;
        return (
          <div
            key={item.title}
            className={cn(
              itemClasses[variant],
              variant === "bordered" &&
                index < items.length - 1 &&
                "border-b border-border last:border-b-0",
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(index)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3.5 text-left",
                "text-sm font-medium text-foreground",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-40",
                !isOpen && "hover:bg-muted/60",
                isOpen && variant === "bordered" && "bg-muted/40",
                isOpen && variant === "ghost" && "bg-muted/40",
                variant === "ghost" && "rounded-lg",
              )}
            >
              {item.icon && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {item.icon}
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium leading-none">
                  {item.title}
                </span>
                {item.description && (
                  <span className="truncate text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </span>
                )}
              </div>
              {item.badge && (
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
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
                <div
                  aria-hidden={!isOpen}
                  className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed"
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = "Accordion";
export { Accordion };`;

const examples = [
  { id: "navigation", title: "Navigation Menu", description: "Expandable navigation with icons", category: "basic" },
  { id: "settings", title: "Settings Panel", description: "Settings categories with descriptions", category: "basic" },
  { id: "variants", title: "Variants", description: "Bordered, ghost, separated, and boxed styles", category: "variants" },
  { id: "modes", title: "Single vs Multi", description: "Open one or multiple sections at a time", category: "interactive" },
  { id: "expand-collapse", title: "Expand / Collapse", description: "Toggle all sections open or closed", category: "interactive" },
  { id: "disabled", title: "Disabled Items", description: "Lock items so they cannot be expanded", category: "interactive" },
  { id: "badges", title: "Badges", description: "Notification count badges on items", category: "advanced" },
  { id: "descriptions", title: "Descriptions", description: "Subtitle text under accordion titles", category: "advanced" },
  { id: "faq", title: "FAQ Section", description: "Frequently asked questions with multi-open", category: "patterns" },
  { id: "code-blocks", title: "Code Blocks", description: "Accordion with code snippets inside", category: "patterns" },
  { id: "onboarding", title: "Onboarding Steps", description: "Step-by-step setup guide pattern", category: "patterns" },
  { id: "nested", title: "Nested", description: "Accordions nested inside other accordions", category: "patterns" },
  { id: "interactive", title: "Interactive Content", description: "Forms, toggles, and inputs inside panels", category: "advanced" },
  { id: "grouped", title: "Grouped Sections", description: "Labeled categories with grouped items", category: "layout" },
  { id: "rich", title: "Rich Content", description: "Metrics, activity feeds, and grids inside", category: "advanced" },
];

const componentMap: Record<string, React.FC> = {
  navigation: NavigationMenuExample,
  settings: SettingsPanelExample,
  variants: VariantsExample,
  modes: SingleModeExample,
  "expand-collapse": ExpandCollapseExample,
  disabled: DisabledItemsExample,
  badges: BadgesExample,
  descriptions: DescriptionExample,
  faq: FAQExample,
  "code-blocks": CodeBlocksExample,
  onboarding: OnboardingExample,
  nested: NestedExample,
  interactive: InteractiveContentExample,
  grouped: GroupedExample,
  rich: RichContentExample,
};

export default function AccordionMenuPage() {
  const [activeExample, setActiveExample] = useState("navigation");
  const currentExample = examples.find((e) => e.id === activeExample);
  const ActiveComponent = componentMap[activeExample];

  return (
    <ComponentDocPage
      name="Accordion Menu"
      category="Navigation"
      description="Multi-level accordion navigation with expand/collapse animations, 4 variants, icons, badges, descriptions, and full keyboard navigation."
    >
      <PreviewPanel filename="AccordionMenu.tsx">
        <NavigationMenuExample />
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_SOURCE}
        filename="components/ui/Accordion.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Examples
          </h2>

          <div className="hidden gap-1 overflow-x-auto sm:flex">
            {examples.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setActiveExample(ex.id)}
                className={cn(
                  "inline-flex shrink-0 items-center rounded-md px-3 py-1.5",
                  "text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  activeExample === ex.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {ex.title}
              </button>
            ))}
          </div>

          <div className="sm:hidden">
            <select
              value={activeExample}
              onChange={(e) => setActiveExample(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-border bg-background px-3 py-2",
                "text-sm text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring",
              )}
            >
              {examples.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentExample && ActiveComponent && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {currentExample.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {currentExample.description}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex min-h-48 items-start justify-center bg-gradient-to-br from-muted/30 via-background to-muted/30 p-8">
                <ActiveComponent />
              </div>
            </div>
          </div>
        )}
      </section>
    </ComponentDocPage>
  );
}
