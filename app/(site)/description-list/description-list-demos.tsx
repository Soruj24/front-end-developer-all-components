"use client";

import { DescriptionList } from "@/components/ui/DescriptionList";
import type { DescriptionListItem } from "@/components/ui/DescriptionList";
import { Shield, Users, Mail, CreditCard, Settings, CheckCircle } from "lucide-react";

const items: DescriptionListItem[] = [
  { term: "Authentication", description: "AuthN/AuthZ with JWT and sessions", icon: Shield },
  { term: "User Management", description: "Role-based access control and permissions", icon: Users },
  { term: "Payment Processing", description: "Stripe integration with webhooks", icon: CreditCard },
  { term: "Email Service", description: "SMTP and transactional email support", icon: Mail },
  { term: "Configuration", description: "Environment-based config with validation", icon: Settings },
];

export function DefaultListDemo() {
  return (
    <div className="w-full max-w-md">
      <DescriptionList items={items} />
    </div>
  );
}

export function CardListDemo() {
  return (
    <div className="w-full max-w-md">
      <DescriptionList variant="card" items={items} />
    </div>
  );
}

export function InlineListDemo() {
  return (
    <div className="w-full max-w-md">
      <DescriptionList variant="inline" items={items} />
    </div>
  );
}

export function StackedListDemo() {
  return (
    <div className="w-full max-w-md">
      <DescriptionList variant="stacked" items={items} />
    </div>
  );
}

export function HighlightedListDemo() {
  return (
    <div className="w-full max-w-md">
      <DescriptionList
        items={[
          { term: "Status", description: "Active", highlighted: true, icon: CheckCircle },
          { term: "Role", description: "Administrator" },
          { term: "Department", description: "Engineering" },
        ]}
      />
    </div>
  );
}

export function HeaderFooterDemo() {
  return (
    <div className="w-full max-w-md">
      <DescriptionList
        variant="card"
        items={items.slice(0, 3)}
        header={<p className="text-sm font-semibold text-foreground">System Info</p>}
        footer={<p className="text-xs text-muted-foreground">Last updated 2 hours ago</p>}
      />
    </div>
  );
}
