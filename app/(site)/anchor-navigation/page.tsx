"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ANCHOR_NAVIGATION_SOURCE, SIDEBAR_EXAMPLE, PILLS_EXAMPLE, UNDERLINE_EXAMPLE, TOC_EXAMPLE, STICKY_EXAMPLE, STEPS_EXAMPLE, DROPDOWN_EXAMPLE } from "./anchor-navigation-source";
import { SidebarNavDemo, PillsNavDemo, UnderlineNavDemo, TableOfContentsDemo, StickySidebarDemo, DropdownAnchorDemo, BreadcrumbNavDemo, docAnchors, apiAnchors } from "./anchor-navigation-demos";

export default function AnchorNavigationPage() {
  return (
    <ComponentDocPage
      name="Anchor Navigation"
      category="Navigation"
      description="In-page anchor navigation with scroll-spy, sticky positioning, and multiple layout variants for long-form content."
    >
      <PreviewPanel filename="anchor-navigation.tsx">
        <SidebarNavDemo items={docAnchors} />
      </PreviewPanel>

      <SourceCodeViewer
        source={ANCHOR_NAVIGATION_SOURCE}
        filename="components/ui/AnchorNavigation/AnchorNavigation.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Sidebar Navigation" description="Vertical navigation with icons and badges, ideal for documentation sidebars." code={SIDEBAR_EXAMPLE}>
          <SidebarNavDemo items={docAnchors} />
        </ExampleBlock>
        <ExampleBlock title="Pills Navigation" description="Horizontal pill-style navigation for filtering or section switching." code={PILLS_EXAMPLE}>
          <PillsNavDemo items={apiAnchors} />
        </ExampleBlock>
        <ExampleBlock title="Underline Navigation" description="Tab-style underline navigation for top-level page sections." code={UNDERLINE_EXAMPLE}>
          <UnderlineNavDemo items={apiAnchors} />
        </ExampleBlock>
        <ExampleBlock title="Table of Contents" description="Numbered table of contents with descriptions for long-form documentation." code={TOC_EXAMPLE}>
          <TableOfContentsDemo />
        </ExampleBlock>
        <ExampleBlock title="Sticky Sidebar with Content" description="Sticky sidebar paired with content area, common in API documentation." code={STICKY_EXAMPLE}>
          <StickySidebarDemo />
        </ExampleBlock>
        <ExampleBlock title="Step Progress" description="Breadcrumb-style step navigation for multi-step workflows." code={STEPS_EXAMPLE}>
          <BreadcrumbNavDemo />
        </ExampleBlock>
        <ExampleBlock title="Dropdown Anchor" description="Dropdown menu for quick section jumping in compact layouts." code={DROPDOWN_EXAMPLE}>
          <DropdownAnchorDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}