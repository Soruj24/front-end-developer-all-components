"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "User Management",
    badge: "5",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    content: <p>Manage team members, roles, and permissions.</p>,
  },
  {
    title: "API Keys",
    badge: "3",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    content: <p>Create, rotate, and revoke API keys for your applications.</p>,
  },
  {
    title: "Webhooks",
    badge: "2",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    content: <p>Configure webhook endpoints and event subscriptions.</p>,
  },
];

export function GroupedExample() {
  return (
    <div className="w-full max-w-md">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workspace</h4>
      <Accordion items={items} variant="bordered" />
    </div>
  );
}
