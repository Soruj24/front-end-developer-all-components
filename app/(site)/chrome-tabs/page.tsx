"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  CHROME_TABS_SOURCE,
  BROWSER_EXAMPLE,
  VERTICAL_EXAMPLE,
  PILL_EXAMPLE,
  EDITOR_EXAMPLE,
  TERMINAL_EXAMPLE,
  UNDERLINE_EXAMPLE,
  SETTINGS_EXAMPLE,
  BrowserTabsDemo,
  VerticalTabsDemo,
  PillTabsDemo,
  EditorTabsDemo,
  TerminalTabsDemo,
  UnderlineTabsDemo,
  SettingsTabsDemo,
} from "./chrome-tabs-source";

export default function ChromeTabsPage() {
  return (
    <ComponentDocPage
      name="Chrome Tabs"
      category="Navigation"
      description="Browser-style tab interface with close buttons, add tab, vertical variant, and pill-style tab navigation."
    >
      <PreviewPanel filename="chrome-tabs.tsx">
        <BrowserTabsDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CHROME_TABS_SOURCE}
        filename="components/ui/ChromeTabs/ChromeTabs.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Browser Tabs" description="Chrome-style tabs with favicons, close buttons, URL bar, and traffic lights." code={BROWSER_EXAMPLE}>
          <BrowserTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Vertical Tabs" description="Sidebar navigation with icons, active indicator, and settings panel." code={VERTICAL_EXAMPLE}>
          <VerticalTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Pill Tabs" description="Rounded pill-style selector with smooth transitions." code={PILL_EXAMPLE}>
          <PillTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Editor Tabs" description="Code editor with file tabs, syntax highlighting, and modified indicators." code={EDITOR_EXAMPLE}>
          <EditorTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Terminal Tabs" description="Multiple terminal sessions with PID labels and command output." code={TERMINAL_EXAMPLE}>
          <TerminalTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Underline Tabs" description="Simple underline indicator with badges and icons." code={UNDERLINE_EXAMPLE}>
          <UnderlineTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Settings Tabs" description="Settings page with horizontal tabs and content panel." code={SETTINGS_EXAMPLE}>
          <SettingsTabsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}