"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Mail, Users, Settings, Filter, Search, Loader2, Shield, CheckCircle, XCircle, Info, AlertCircle, Link, Clock, MailWarning, MailCheck, MailX } from "lucide-react";

const DESCRIPTION_LIST_SOURCE = "use client";

function DescriptionListDemo() {
  const [items, setItems] = useState([
    { term: "Authentication", description: "AuthN/AuthZ with JWT and sessions", icon: Shield },
    { term: "User Management", description: "Role-based access control and permissions", icon: Users },
    { term: "Payment Processing", description: "Stripe integration with webhooks", icon: Mail },
  ]);

  return (
    <dl className="space-y-4">
      {items.map((item) => (
        <div key={item.term} className="flex items-start gap-3">
          <dt className="font-medium text-foreground flex-shrink-0">
            {item.icon && <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
            {item.term}
          </dt>
          <dd className="ml-3 text-sm text-muted-foreground">
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function DescriptionListPage() {
  return (
    <ComponentDocPage
      name="Description List"
      category="Data Display"
      description="A semantic description list component for defining terms and their descriptions with optional icons."
    >
      <PreviewPanel filename="description-list.tsx">
        <DescriptionListDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DESCRIPTION_LIST_SOURCE}
        filename="components/ui/DescriptionList/DescriptionList.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Default" description="Standard description list with icons." code={DESCRIPTION_LIST_SOURCE}>
          <DescriptionListDemo />
        </ExampleBlock>

        <ExampleBlock title="With Actions" description="Description list with action icons on each term." code={DESCRIPTION_LIST_SOURCE}>
          <DescriptionListDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}