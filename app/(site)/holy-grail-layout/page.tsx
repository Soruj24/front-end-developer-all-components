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

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">header</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Top header slot</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">footer</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Bottom footer slot</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">sidebar</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Left sidebar content</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">sidebarRight</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Right sidebar content</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">sidebarSide</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;left&quot; | &quot;right&quot; | &quot;both&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;left&quot;</td>
                <td className="px-4 py-3">Which sidebar(s) to show</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">sidebarWidth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">240</td>
                <td className="px-4 py-3">Left sidebar width in px</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">sidebarRightWidth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">240</td>
                <td className="px-4 py-3">Right sidebar width in px</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">sticky</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">Sticky header and sidebars</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
