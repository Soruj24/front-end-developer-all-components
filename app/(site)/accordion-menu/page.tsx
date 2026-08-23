"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ACCORDION_SOURCE } from "./accordion-menu-source";
import {
  NAVIGATION_EXAMPLE,
  SETTINGS_EXAMPLE,
  VARIANTS_EXAMPLE,
  FAQ_EXAMPLE,
  EXPAND_COLLAPSE_EXAMPLE,
  DISABLED_EXAMPLE,
  BADGES_EXAMPLE,
  DESCRIPTIONS_EXAMPLE,
  MODES_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./accordion-menu-examples";
import {
  NavigationMenuDemo,
  SettingsPanelDemo,
  VariantsDemo,
  FAQDemo,
  ExpandCollapseDemo,
  DisabledDemo,
  BadgesDemo,
  DescriptionDemo,
  SingleModeDemo,
  PlaygroundDemo,
} from "./demos";

export default function AccordionMenuPage() {
  return (
    <ComponentDocPage
      name="Accordion Menu"
      category="Navigation"
      description="Multi-level accordion navigation with expand/collapse animations, 4 variants, icons, badges, descriptions, and full keyboard navigation."
    >
      <PreviewPanel filename="navigation-menu.tsx">
        <NavigationMenuDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_SOURCE}
        filename="components/ui/Accordion.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all accordion variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Navigation Menu" description="Expandable navigation with icons and child links." code={NAVIGATION_EXAMPLE}>
          <NavigationMenuDemo />
        </ExampleBlock>
        <ExampleBlock title="Settings Panel" description="Settings categories with descriptions and badges." code={SETTINGS_EXAMPLE}>
          <SettingsPanelDemo />
        </ExampleBlock>
        <ExampleBlock title="Variants" description="Bordered, separated, and boxed styles." code={VARIANTS_EXAMPLE}>
          <VariantsDemo />
        </ExampleBlock>
        <ExampleBlock title="Single vs Multi" description="Open one or multiple sections at a time." code={MODES_EXAMPLE}>
          <SingleModeDemo />
        </ExampleBlock>
        <ExampleBlock title="Expand / Collapse" description="Toggle all sections open or closed." code={EXPAND_COLLAPSE_EXAMPLE}>
          <ExpandCollapseDemo />
        </ExampleBlock>
        <ExampleBlock title="Disabled Items" description="Lock items so they cannot be expanded." code={DISABLED_EXAMPLE}>
          <DisabledDemo />
        </ExampleBlock>
        <ExampleBlock title="Badges" description="Notification count badges on items." code={BADGES_EXAMPLE}>
          <BadgesDemo />
        </ExampleBlock>
        <ExampleBlock title="Descriptions" description="Subtitle text under accordion titles." code={DESCRIPTIONS_EXAMPLE}>
          <DescriptionDemo />
        </ExampleBlock>
        <ExampleBlock title="FAQ Section" description="Frequently asked questions with multi-open." code={FAQ_EXAMPLE}>
          <FAQDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
