"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CONTACT_CARD_SOURCE } from "./contact-card-source";
import { ContactCard } from "./contact-card";

export default function ContactCardPage() {
  return (
    <ComponentDocPage
      name="Contact Card"
      category="Data Display"
      description="A contact card component for displaying user profiles, team members, and contact information with action buttons."
    >
      <PreviewPanel filename="contact-card.tsx">
        <ContactCard name="Jane Doe" role="Senior Engineer" email="jane@example.com" />
      </PreviewPanel>

      <SourceCodeViewer
        source={CONTACT_CARD_SOURCE}
        filename="components/ui/ContactCard/ContactCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Card" description="A simple contact card with avatar and info." code={<ContactCard name="Jane Doe" role="Senior Engineer" email="jane@example.com" />}>
          <ContactCard name="Jane Doe" role="Senior Engineer" email="jane@example.com" />
        </ExampleBlock>

        <ExampleBlock title="Detailed Card" description="Contact card with email, phone, and social links." code={<ContactCard name="Alex Brown" role="Product Designer" email="alex@company.com" />}>
          <ContactCard name="Alex Brown" role="Product Designer" email="alex@company.com" />
        </ExampleBlock>

        <ExampleBlock title="Compact List" description="Compact contact cards for list views." code={<ContactCard name="Sarah Chen" role="Frontend Dev" />}>
          <ContactCard name="Sarah Chen" role="Frontend Dev" />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}