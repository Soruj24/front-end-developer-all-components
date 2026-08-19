"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import Breadcrumb from "@/components/ui/Breadcrumb";

const BREADCRUMB_SOURCE = `import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg className="h-4 w-4 shrink-0 text-subtle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            {isLast || !item.href ? (
              <span className={isLast ? "font-medium text-foreground" : ""}>{item.label}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-foreground">{item.label}</Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;`;

const BASIC_SOURCE = `import Breadcrumb from "@/components/ui/Breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>`;

const DEEP_NESTED_SOURCE = `import Breadcrumb from "@/components/ui/Breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Website Redesign", href: "/projects/website" },
    { label: "Assets", href: "/projects/website/assets" },
    { label: "Images" },
  ]}
/>`;

const TRUNCATED_SOURCE = `import Breadcrumb from "@/components/ui/Breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "...", href: "/collapsed" },
    { label: "Deeply", href: "/a/b/c/deeply" },
    { label: "Nested", href: "/a/b/c/deeply/nested" },
    { label: "Page" },
  ]}
/>`;

const CUSTOM_STYLES_SOURCE = `import Breadcrumb from "@/components/ui/Breadcrumb";

<div className="rounded-lg bg-zinc-100 px-4 py-2">
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Analytics" },
    ]}
  />
</div>`;

export default function BreadcrumbPage() {
  return (
    <ComponentDocPage
      name="Breadcrumb"
      category="Navigation"
      description="Displays the current page location within a hierarchy. Helps users understand where they are and navigate back to parent pages."
    >
      <PreviewPanel filename="breadcrumb-preview.tsx">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb" },
          ]}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={BREADCRUMB_SOURCE}
        filename="components/ui/Breadcrumb.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic"
          description="Simple breadcrumb with linked and active items."
          code={BASIC_SOURCE}
          filename="basic.tsx"
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Breadcrumb" },
            ]}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Deep Nested"
          description="Works well with deeply nested navigation paths."
          code={DEEP_NESTED_SOURCE}
          filename="deep-nested.tsx"
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Website Redesign", href: "/projects/website" },
              { label: "Assets", href: "/projects/website/assets" },
              { label: "Images" },
            ]}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Truncated Path"
          description='Use "..." as a label to indicate collapsed intermediate items.'
          code={TRUNCATED_SOURCE}
          filename="truncated.tsx"
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "...", href: "/collapsed" },
              { label: "Deeply", href: "/a/b/c/deeply" },
              { label: "Nested", href: "/a/b/c/deeply/nested" },
              { label: "Page" },
            ]}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Styles"
          description="Wrap the breadcrumb in a container for custom appearance."
          code={CUSTOM_STYLES_SOURCE}
          filename="custom-styles.tsx"
        >
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Analytics" },
                ]}
              />
            </div>
            <div className="rounded-full border px-4 py-2">
              <Breadcrumb
                items={[
                  { label: "Acme Inc", href: "/" },
                  { label: "Team", href: "/team" },
                  { label: "Members" },
                ]}
              />
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
