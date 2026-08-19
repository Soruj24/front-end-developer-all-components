"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Accordion } from "./Accordion";
import { faqItems } from "./data";
import {
  ACCORDION_SOURCE,
  VARIANTS_EXAMPLE,
  OPEN_MODE_EXAMPLE,
  CONTROLS_EXAMPLE,
  DISABLED_EXAMPLE,
  LONG_EXAMPLE,
  ICONS_EXAMPLE,
  GROUPED_EXAMPLE,
  USECASES_EXAMPLE,
  NESTED_EXAMPLE,
  FAQ_EXAMPLE,
} from "./accordion-source";
import {
  VariantsSection,
  OpenModeSection,
  ControlsSection,
  DisabledSection,
  LongContentSection,
  IconsSection,
} from "./Sections";
import {
  GroupedSection,
  UseCasesSection,
  NestedSection,
  FaqSection,
} from "./Patterns";

export default function AccordionPage() {
  return (
    <ComponentDocPage
      name="Accordion"
      category="Layout"
      description="Expandable accordion with single/multi open, variants, and practical patterns."
    >
      <PreviewPanel filename="accordion.tsx">
        <div className="w-full max-w-md">
          <Accordion items={faqItems} startOpen={-1} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_SOURCE}
        filename="components/ui/Accordion/Accordion.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Bordered, ghost, boxed, separated, and minimal styles." code={VARIANTS_EXAMPLE}>
          <div className="w-full max-w-xl">
            <VariantsSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Single vs Multi Open" description="Open one item at a time or allow multiple expanded sections." code={OPEN_MODE_EXAMPLE}>
          <div className="w-full max-w-xl">
            <OpenModeSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Expand / Collapse Controls" description="Toggle all sections open or closed with a button." code={CONTROLS_EXAMPLE}>
          <div className="w-full max-w-xl">
            <ControlsSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Disabled Items" description="Lock certain items so they cannot be expanded." code={DISABLED_EXAMPLE}>
          <div className="w-full max-w-xl">
            <DisabledSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Long Content" description="Accordions that handle lengthy bodies comfortably." code={LONG_EXAMPLE}>
          <div className="w-full max-w-xl">
            <LongContentSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Add icons or emoji to accordion titles." code={ICONS_EXAMPLE}>
          <div className="w-full max-w-xl">
            <IconsSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Grouped Sections" description="Organize accordions under labeled categories." code={GROUPED_EXAMPLE}>
          <div className="w-full max-w-xl">
            <GroupedSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Use Cases" description="FAQ, settings, docs, and onboarding patterns." code={USECASES_EXAMPLE}>
          <div className="w-full max-w-xl">
            <UseCasesSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Nested" description="Accordions nested inside other accordions." code={NESTED_EXAMPLE}>
          <div className="w-full max-w-xl">
            <NestedSection />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Full Page FAQ" description="A standalone FAQ built from accordion items." code={FAQ_EXAMPLE}>
          <div className="w-full max-w-xl">
            <FaqSection />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}