"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Accordion } from "./Accordion";
import { faqItems } from "./data";
import {
  ACCORDION_SOURCE,
  VARIANTS_EXAMPLE,
  OPEN_MODE_EXAMPLE,
  DISABLED_EXAMPLE,
  ICONS_EXAMPLE,
} from "./accordion-source";
import {
  VariantsSection,
  OpenModeSection,
  DisabledSection,
} from "./Sections";
import { FaqSection } from "./Patterns";

export default function AccordionPage() {
  return (
    <ComponentDocPage
      name="Accordion"
      category="Layout"
      description="Expandable accordion with 5 variants, single/multi open modes, and smooth CSS-grid animations."
    >
      <PreviewPanel filename="accordion.tsx">
        <div className="w-full max-w-md">
          <Accordion items={faqItems.slice(0, 4)} startOpen={-1} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_SOURCE}
        filename="components/ui/Accordion.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Variants"
          description="Bordered, ghost, boxed, separated, and minimal styles."
          code={VARIANTS_EXAMPLE}
        >
          <div className="w-full max-w-xl">
            <VariantsSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Single vs Multi Open"
          description="Open one item at a time or allow multiple expanded sections."
          code={OPEN_MODE_EXAMPLE}
        >
          <div className="w-full max-w-xl">
            <OpenModeSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Items"
          description="Lock certain items so they cannot be expanded."
          code={DISABLED_EXAMPLE}
        >
          <div className="w-full max-w-xl">
            <DisabledSection />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="FAQ"
          description="AccordionItem as a standalone building block for FAQ pages."
          code={ICONS_EXAMPLE }
        >
          <div className="w-full max-w-xl">
            <FaqSection />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
