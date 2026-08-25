"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HOLY_GRAIL_SOURCE } from "./holy-grail-layout-source";
import {
  ClassicDemo,
  RichHeaderDemo,
  RichFooterDemo,
  BothSidebarsDemo,
  AsymmetricDemo,
  FullFeaturedDemo,
  CenteredContentDemo,
  ResponsiveDemo,
} from "./holy-grail-layout-demos";

const CODE_BLOCKS = {
  classic: '<HolyGrail header={<Header />} sidebar={<Nav />} footer={<Footer />} sidebarSide="left">\n  <main>Content</main>\n</HolyGrail>',
  both: '<HolyGrail header={<Header />} sidebar={<Left />} sidebarRight={<Right />} sidebarSide="both">\n  <main>Content</main>\n</HolyGrail>',
  asymmetric: '<HolyGrail sidebar={<WideNav />} sidebarSide="left" sidebarWidth={200}>\n  <main>Content</main>\n</HolyGrail>',
  richHeader: '<HolyGrail\n  header={<div className="flex h-14 items-center justify-between px-4">...</div>}\n  sidebar={<SidebarNav />}\n  sidebarSide="left"\n>\n  <main>Content</main>\n</HolyGrail>',
  richFooter: '<HolyGrail\n  header={<Header />}\n  sidebar={<Nav />}\n  footer={<div className="flex h-16 items-center justify-between px-4">...</div>}\n  sidebarSide="left"\n>\n  <main>Content</main>\n</HolyGrail>',
  full: '<HolyGrail header={...} sidebar={...} sidebarRight={...} sidebarSide="both" sticky>\n  <div className="grid grid-cols-3 gap-2">...</div>\n</HolyGrail>',
  centered: '<HolyGrail sidebar={<Nav />} sidebarSide="left">\n  <div className="mx-auto max-w-md flex items-center justify-center">\n    Centered Content\n  </div>\n</HolyGrail>',
  responsive: '<HolyGrail sidebar={...} sidebarRight={...} sidebarSide="both" sidebarWidth={240} sidebarRightWidth={240} sticky>\n  {children}\n</HolyGrail>',
};

export default function HolyGrailLayoutPage() {
  return (
    <ComponentDocPage
      name="Holy Grail Layout"
      category="Layout"
      description="The classic web layout pattern with header, footer, sidebar(s), and main content area. A time-tested structure for applications and content-heavy sites."
    >
      <PreviewPanel filename="holy-grail-layout.tsx">
        <ClassicDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HOLY_GRAIL_SOURCE}
        filename="components/ui/HolyGrail/HolyGrail.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Classic Holy Grail" description="The traditional header-sidebar-content-footer layout." code={CODE_BLOCKS.classic}>
          <ClassicDemo />
        </ExampleBlock>

        <ExampleBlock title="Rich Header" description="Header with navigation, logo, and user actions." code={CODE_BLOCKS.richHeader}>
          <RichHeaderDemo />
        </ExampleBlock>

        <ExampleBlock title="Rich Footer" description="Footer with copyright, links, and legal information." code={CODE_BLOCKS.richFooter}>
          <RichFooterDemo />
        </ExampleBlock>

        <ExampleBlock title="Both Sidebars" description="Left and right sidebars with the main content area in between." code={CODE_BLOCKS.both}>
          <BothSidebarsDemo />
        </ExampleBlock>

        <ExampleBlock title="Asymmetric Widths" description="Different widths for left and right sidebars." code={CODE_BLOCKS.asymmetric}>
          <AsymmetricDemo />
        </ExampleBlock>

        <ExampleBlock title="Full Featured" description="Complete layout with all sections, rich header, sidebars, and dashboard content." code={CODE_BLOCKS.full}>
          <FullFeaturedDemo />
        </ExampleBlock>

        <ExampleBlock title="Centered Content" description="Content area with max-width constraint for readability." code={CODE_BLOCKS.centered}>
          <CenteredContentDemo />
        </ExampleBlock>

        <ExampleBlock title="Responsive Behavior" description="Layout adapts across mobile, tablet, and desktop breakpoints." code={CODE_BLOCKS.responsive}>
          <ResponsiveDemo />
        </ExampleBlock>
      </div>


    </ComponentDocPage>
  );
}
