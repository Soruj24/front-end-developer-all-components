"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PreviewPanel, SourceCodeViewer } from "@/components/docs";
import { BasicNavDemo, StickyNavDemo } from "./demos/TopNavDemos";
import {
  ProgressDemo,
  ScrollSpyDemo,
  BreadcrumbsDemo,
  TabsDemo,
  PaginationDemo,
} from "./demos/UtilityDemos";
import { SidebarShowcase } from "./demos/SidebarShowcase";
import { NavPlayground } from "./demos/NavPlayground";
import { ApiReference } from "./demos/ApiReference";
import { SIDEBAR_SOURCE } from "./demos/source-core";
import { SECTION_SOURCE, NAV_LINK_SOURCE } from "./demos/source-nav";
import {
  BRAND_SOURCE,
  SEARCH_SOURCE,
  TOGGLE_SOURCE,
  BACKDROP_SOURCE,
  FOOTER_SOURCE,
} from "./demos/source-chrome";

const installCommand = `npx component-library@latest add navigation`;

const usageCode = `import { CompassIcon } from "lucide-react";
import { Sidebar } from "@/components/navigation";
import type { NavSection } from "@/types/navigation";

const sections: NavSection[] = [
  {
    title: "Getting Started",
    icon: <CompassIcon className="h-3.5 w-3.5" />,
    links: [{ label: "Introduction", href: "/introduction" }],
  },
];

<Sidebar sections={sections} />`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function NavigationPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Navigation</h1>
          <Badge variant="primary">6 patterns</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Premium navigation patterns — a searchable accordion sidebar, nav bars,
          mega menus, tabs, breadcrumbs, pagination, scroll spy, and progress
          indicators. Fully keyboard accessible and theme aware.
        </p>
      </header>

      {/* Installation */}
      <Section title="Installation">
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </Section>

      {/* Usage */}
      <Section title="Usage">
        <CodeBlock code={usageCode} filename="layout.tsx" label="tsx" />
      </Section>

      {/* Live Preview */}
      <Section title="Live Preview">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The real sidebar sub-components composed inside a static frame — try the
          search, toggle the accordions, and notice the active &ldquo;Navigation&rdquo; link.
        </p>
        <PreviewPanel filename="sidebar-preview.tsx">
          <SidebarShowcase />
        </PreviewPanel>
      </Section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <ComponentPreview id="navigation-basic">
          <BasicNavDemo />
        </ComponentPreview>

        <ComponentPreview id="navigation-sticky">
          <StickyNavDemo />
        </ComponentPreview>

        <ComponentPreview id="navigation-progress">
          <ProgressDemo />
        </ComponentPreview>

        <ComponentPreview id="navigation-scrollspy">
          <ScrollSpyDemo />
        </ComponentPreview>

        <ComponentPreview id="navigation-breadcrumbs">
          <BreadcrumbsDemo />
        </ComponentPreview>

        <ComponentPreview id="navigation-tabs">
          <TabsDemo />
        </ComponentPreview>

        <ComponentPreview id="navigation-pagination">
          <PaginationDemo />
        </ComponentPreview>
      </section>

      {/* Playground */}
      <Section title="Playground">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Drive the sidebar interactively — filter with search, collapse sections,
          or reset to see the empty state.
        </p>
        <PreviewPanel filename="sidebar-playground.tsx">
          <NavPlayground />
        </PreviewPanel>
      </Section>

      {/* Code Viewer */}
      <Section title="Code Viewer">
        <p className="max-w-2xl text-sm text-muted-foreground">
          The actual updated Tailwind CSS source behind the redesign — every color,
          radius, shadow, and motion curve comes from the design tokens.
        </p>
        <SourceCodeViewer
          source={SIDEBAR_SOURCE}
          filename="components/navigation/Sidebar/Sidebar.tsx"
          defaultExpanded
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <SourceCodeViewer source={SECTION_SOURCE} filename="components/navigation/Sidebar/SidebarSection.tsx" />
          <SourceCodeViewer source={NAV_LINK_SOURCE} filename="components/navigation/Sidebar/SidebarNavLink.tsx" />
          <SourceCodeViewer source={BRAND_SOURCE} filename="components/navigation/Sidebar/SidebarBrand.tsx" />
          <SourceCodeViewer source={SEARCH_SOURCE} filename="components/navigation/Sidebar/SidebarSearch.tsx" />
          <SourceCodeViewer source={TOGGLE_SOURCE} filename="components/navigation/Sidebar/SidebarToggle.tsx" />
          <SourceCodeViewer source={BACKDROP_SOURCE} filename="components/navigation/Sidebar/SidebarBackdrop.tsx" />
          <SourceCodeViewer source={FOOTER_SOURCE} filename="components/navigation/Sidebar/SidebarFooter.tsx" />
        </div>
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <ApiReference />
      </Section>
    </div>
  );
}
