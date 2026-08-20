"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Breadcrumb } from "@/components/_breadcrumb";
import type { BreadcrumbItem } from "@/components/_breadcrumb";

const BREADCRUMB_SOURCE = `import * as React from "react";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  variant?: "default" | "pill" | "muted";
  className?: string;
  itemClassName?: string;
  activeIndex?: number;
}

const BREADCRUMB_STYLES: Record<string, string> = {
  base: "flex items-center gap-1.5 text-sm",
  basePill: "flex items-center gap-1.5 text-sm",
  baseMuted: "flex items-center gap-1.5 text-sm",
  item: "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  itemActive: "font-medium text-foreground",
  itemActivePill: "font-medium text-foreground bg-muted",
  itemDisabled: "cursor-not-allowed opacity-40 pointer-events-none",
  separator: "flex-shrink-0 text-muted-foreground/40",
  icon: "flex-shrink-0 h-3.5 w-3.5",
  link: "cursor-pointer",
};

export function Breadcrumb({
  items,
  separator,
  variant = "default",
  className,
  itemClassName,
  activeIndex,
}: BreadcrumbProps) {
  const defaultSeparator = separator ?? <ChevronSeparator />;
  const isPill = variant === "pill";
  const isMuted = variant === "muted";

  return (
    <nav aria-label="breadcrumb" className={cn(isPill ? BREADCRUMB_STYLES.basePill : isMuted ? BREADCRUMB_STYLES.baseMuted : BREADCRUMB_STYLES.base, className)}>
      <ol className="contents">
        {items.map((item, idx) => {
          const isActive = activeIndex !== undefined ? idx === activeIndex : idx === items.length - 1;
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <span className={cn(BREADCRUMB_STYLES.separator, isPill && "px-0.5 text-muted-foreground/30")} aria-hidden="true">{defaultSeparator}</span>}
              <span className={cn(BREADCRUMB_STYLES.item, isActive && (isPill ? BREADCRUMB_STYLES.itemActivePill : BREADCRUMB_STYLES.itemActive), itemClassName)}
                onClick={item.onClick} aria-current={isActive ? "page" : undefined}>
                {item.icon && <span className={BREADCRUMB_STYLES.icon}>{item.icon}</span>}
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}`;

const BASIC_EXAMPLE = `import { Breadcrumb } from "@/components/_breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>`;

const DEEP_NESTED_EXAMPLE = `import { Breadcrumb } from "@/components/_breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Website Redesign", href: "/projects/website" },
    { label: "Assets", href: "/projects/website/assets" },
    { label: "Images" },
  ]}
/>`;

const TRUNCATED_EXAMPLE = `import { Breadcrumb } from "@/components/_breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "...", href: "/collapsed" },
    { label: "Deeply", href: "/a/b/c/deeply" },
    { label: "Nested", href: "/a/b/c/deeply/nested" },
    { label: "Page" },
  ]}
/>`;

const VARIANTS_EXAMPLE = `import { Breadcrumb } from "@/components/_breadcrumb";

<Breadcrumb variant="pill" items={items} />
<Breadcrumb variant="muted" items={items} />`;

const SEPARATORS_EXAMPLE = `<Breadcrumb items={items} separator="/" />
<Breadcrumb items={items} separator="→" />
<Breadcrumb items={items} separator="·" />`;

const PLAYGROUND_EXAMPLE = `<Breadcrumb
  items={DEMO_ITEMS}
  variant={variant}
  activeIndex={active}
/>`;

const basicItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" },
];

const deepItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Website Redesign", href: "/projects/website" },
  { label: "Assets", href: "/projects/website/assets" },
  { label: "Images" },
];

const truncatedItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "...", href: "/collapsed" },
  { label: "Deeply", href: "/a/b/c/deeply" },
  { label: "Nested", href: "/a/b/c/deeply/nested" },
  { label: "Page" },
];

const separatorItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings" },
];

const separators = [
  { label: "Chevron", sep: undefined },
  { label: "Slash", sep: "/" },
  { label: "Arrow", sep: "\u2192" },
  { label: "Dot", sep: "\u00b7" },
  { label: "Pipe", sep: "|" },
];

const playgroundItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Website Redesign", href: "/projects/website" },
  { label: "Assets", href: "/projects/website/assets" },
  { label: "Images" },
];

export default function BreadcrumbPage() {
  const [active, setActive] = useState<number | undefined>(undefined);
  const [variant, setVariant] = useState<"default" | "pill" | "muted">("default");

  return (
    <ComponentDocPage
      name="Breadcrumb"
      category="Navigation"
      description="Displays the current page location within a hierarchy. Helps users understand where they are and navigate back to parent pages."
    >
      <PreviewPanel filename="breadcrumb-preview.tsx">
        <Breadcrumb items={basicItems} />
      </PreviewPanel>

      <SourceCodeViewer
        source={BREADCRUMB_SOURCE}
        filename="components/_breadcrumb/Breadcrumb.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Basic"
          description="Simple breadcrumb with linked and active items."
          code={BASIC_EXAMPLE}
        >
          <Breadcrumb items={basicItems} />
        </ExampleBlock>

        <ExampleBlock
          title="Deep Nested"
          description="Works well with deeply nested navigation paths."
          code={DEEP_NESTED_EXAMPLE}
        >
          <Breadcrumb items={deepItems} />
        </ExampleBlock>

        <ExampleBlock
          title="Truncated Path"
          description='Use "..." as a label to indicate collapsed intermediate items.'
          code={TRUNCATED_EXAMPLE}
        >
          <Breadcrumb items={truncatedItems} />
        </ExampleBlock>

        <ExampleBlock
          title="Variants"
          description="Three visual styles: default with hover backgrounds, pill with rounded badges, and muted without hover."
          code={VARIANTS_EXAMPLE}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Default</span>
              <Breadcrumb items={separatorItems} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Pill</span>
              <Breadcrumb items={separatorItems} variant="pill" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Muted</span>
              <Breadcrumb items={separatorItems} variant="muted" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Separators"
          description="Customizable separator between items."
          code={SEPARATORS_EXAMPLE}
        >
          <div className="flex flex-col gap-4">
            {separators.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
                <Breadcrumb items={separatorItems} separator={item.sep} />
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Interactively change variant and active index."
          code={PLAYGROUND_EXAMPLE}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Variant
              </span>
              {(["default", "pill", "muted"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    variant === v
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Active Index
              </span>
              <button
                onClick={() => setActive(undefined)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  active === undefined
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Last
              </button>
              {playgroundItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    active === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <Breadcrumb
                items={playgroundItems}
                variant={variant}
                activeIndex={active}
              />
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
