"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SIDEBAR_SOURCE } from "./sidebar-layout-source";
import {
  LeftSidebarDemo,
  RightSidebarDemo,
  CollapsibleSidebarDemo,
  HeaderFooterSidebarDemo,
  NestedNavSidebarDemo,
  RichContentSidebarDemo,
  WidthVariantsSidebarDemo,
} from "./sidebar-layout-demos";

const DEMO_CODE = [
  '<Sidebar side="left" width={220}>',
  '  <SidebarHeader>',
  '    <div className="flex items-center gap-2">',
  '      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">A</div>',
  '      <span className="text-sm font-semibold">AppName</span>',
  '    </div>',
  '  </SidebarHeader>',
  '  <SidebarContent>',
  '    <SidebarGroup>',
  '      <SidebarItem active>',
  '        <HomeIcon /> <span>Dashboard</span>',
  '      </SidebarItem>',
  '      <SidebarItem>',
  '        <FolderIcon /> <span>Projects</span>',
  '      </SidebarItem>',
  '    </SidebarGroup>',
  '  </SidebarContent>',
  '  <SidebarFooter>',
  '    <span className="text-xs text-muted-foreground">v1.0.0</span>',
  '  </SidebarFooter>',
  '</Sidebar>',
].join('\n');

const COLLAPSIBLE_CODE = [
  'const [collapsed, setCollapsed] = useState(false);',
  '',
  '<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} width={220}>',
  '  <SidebarHeader>',
  '    <div className="flex items-center gap-2">',
  '      <div className="h-7 w-7 shrink-0 rounded-lg bg-primary text-xs font-bold ...">A</div>',
  '      {!collapsed && <span className="text-sm font-semibold">AppName</span>}',
  '    </div>',
  '  </SidebarHeader>',
  '  <SidebarContent>',
  '    <SidebarGroup>',
  '      <SidebarItem active>',
  '        <HomeIcon /> {!collapsed && <span>Dashboard</span>}',
  '      </SidebarItem>',
  '    </SidebarGroup>',
  '  </SidebarContent>',
  '</Sidebar>',
].join('\n');

const GROUP_CODE = [
  '<SidebarGroup label="Main">',
  '  <SidebarItem active><HomeIcon /> <span>Dashboard</span></SidebarItem>',
  '  <SidebarItem><FolderIcon /> <span>Projects</span></SidebarItem>',
  '</SidebarGroup>',
  '<SidebarGroup label="Settings">',
  '  <SidebarItem><SettingsIcon /> <span>Profile</span></SidebarItem>',
  '  <SidebarItem><ShieldIcon /> <span>Security</span></SidebarItem>',
  '</SidebarGroup>',
].join('\n');

const WIDTH_CODE = [
  '<Sidebar width={192}>...</Sidebar>  {/* Compact */}',
  '<Sidebar width={256}>...</Sidebar>  {/* Default */}',
  '<Sidebar width={320}>...</Sidebar>  {/* Wide */}',
].join('\n');

const RIGHT_CODE = [
  '<Sidebar side="right" width={220}>',
  '  <SidebarHeader>',
  '    <span className="text-sm font-semibold">Related</span>',
  '  </SidebarHeader>',
  '  <SidebarContent>',
  '    <SidebarGroup label="Details">',
  '      <SidebarItem>Overview</SidebarItem>',
  '      <SidebarItem>History</SidebarItem>',
  '    </SidebarGroup>',
  '  </SidebarContent>',
  '  <SidebarFooter>',
  '    <span className="text-xs text-muted-foreground">v1.0.0</span>',
  '  </SidebarFooter>',
  '</Sidebar>',
].join('\n');

const HEADER_FOOTER_CODE = [
  '<Sidebar width={220}>',
  '  <SidebarHeader>',
  '    <div className="flex items-center gap-2">',
  '      <div className="h-7 w-7 rounded-lg bg-primary text-xs font-bold ...">A</div>',
  '      <span className="text-sm font-semibold">AppName</span>',
  '    </div>',
  '  </SidebarHeader>',
  '  <SidebarContent>...</SidebarContent>',
  '  <SidebarFooter>',
  '    <div className="flex items-center gap-2">',
  '      <div className="h-6 w-6 rounded-full bg-primary/10" />',
  '      <div className="flex flex-col">',
  '        <span className="text-xs font-medium">John Doe</span>',
  '        <span className="text-[10px] text-muted-foreground">john@example.com</span>',
  '      </div>',
  '    </div>',
  '  </SidebarFooter>',
  '</Sidebar>',
].join('\n');

const RICH_CONTENT_CODE = [
  '<Sidebar width={240}>',
  '  <SidebarContent>',
  '    <div className="mb-3 rounded-lg border bg-muted/30 p-3">',
  '      <span className="text-xs font-medium">Active Filters</span>',
  '      <div className="mt-2 flex flex-wrap gap-1">',
  '        <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] ...">Status: Active</span>',
  '      </div>',
  '    </div>',
  '    <SidebarGroup label="Quick Actions">',
  '      <SidebarItem>Export Data</SidebarItem>',
  '      <SidebarItem>Generate Report</SidebarItem>',
  '    </SidebarGroup>',
  '  </SidebarContent>',
  '</Sidebar>',
].join('\n');

export default function SidebarLayoutPage() {
  return (
    <ComponentDocPage
      name="Sidebar Layout"
      category="Layout"
      description="Classic sidebar-content layout with support for left/right positioning, collapsible states, grouped navigation, and rich content patterns."
    >
      <PreviewPanel filename="sidebar-layout.tsx">
        <LeftSidebarDemo />
      </PreviewPanel>

      <SourceCodeViewer source={SIDEBAR_SOURCE} filename="components/ui/Sidebar/Sidebar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Left Sidebar" description="Sidebar positioned on the left side with brand header and navigation." code={DEMO_CODE}>
          <LeftSidebarDemo />
        </ExampleBlock>

        <ExampleBlock title="Right Sidebar" description="Sidebar positioned on the right side with grouped sections." code={RIGHT_CODE}>
          <RightSidebarDemo />
        </ExampleBlock>

        <ExampleBlock title="Collapsible Sidebar" description="Icon-only collapsed sidebar that expands on interaction with smooth animation." code={COLLAPSIBLE_CODE}>
          <CollapsibleSidebarDemo />
        </ExampleBlock>

        <ExampleBlock title="With Header & Footer" description="Sidebar with branded header and user profile footer." code={HEADER_FOOTER_CODE}>
          <HeaderFooterSidebarDemo />
        </ExampleBlock>

        <ExampleBlock title="Nested Navigation" description="Sidebar with grouped and sectioned navigation using SidebarGroup." code={GROUP_CODE}>
          <NestedNavSidebarDemo />
        </ExampleBlock>

        <ExampleBlock title="Rich Content" description="Sidebar with filters, actions, and dynamic content." code={RICH_CONTENT_CODE}>
          <RichContentSidebarDemo />
        </ExampleBlock>

        <ExampleBlock title="Width Variants" description="Different sidebar widths for various use cases." code={WIDTH_CODE}>
          <WidthVariantsSidebarDemo />
        </ExampleBlock>
      </div>


    </ComponentDocPage>
  );
}
