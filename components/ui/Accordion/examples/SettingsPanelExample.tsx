"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "Profile",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description: "Personal information and avatar",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Manage your personal information, avatar, and public profile.</p>
        <a href="#" className="text-sm text-primary hover:underline">Edit profile →</a>
      </div>
    ),
  },
  {
    title: "Notifications",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    description: "Email and push preferences",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Configure email, push, and in-app notification preferences.</p>
        <a href="#" className="text-sm text-primary hover:underline">Manage notifications →</a>
      </div>
    ),
  },
  {
    title: "Security",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description: "Password, 2FA, sessions",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Update password, enable 2FA, and review active sessions.</p>
        <a href="#" className="text-sm text-primary hover:underline">Security settings →</a>
      </div>
    ),
  },
  {
    title: "Billing",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    description: "Invoices and payment methods",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">View invoices, manage payment methods, and update your plan.</p>
        <a href="#" className="text-sm text-primary hover:underline">Billing portal →</a>
      </div>
    ),
  },
];

export function SettingsPanelExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={items} />
    </div>
  );
}
