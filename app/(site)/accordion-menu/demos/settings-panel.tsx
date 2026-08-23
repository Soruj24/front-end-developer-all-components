"use client";

import { Accordion, AccordionItem } from "./accordion";
import { User, Bell, Shield, CreditCard, Palette, Globe } from "lucide-react";

const items: AccordionItem[] = [
  {
    title: "Profile",
    icon: <User className="h-4 w-4" />,
    description: "Personal information and avatar",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage your personal information, avatar, and public profile.</p>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">Edit profile →</a>
      </div>
    ),
  },
  {
    title: "Notifications",
    icon: <Bell className="h-4 w-4" />,
    description: "Email, push, and in-app alerts",
    badge: "3 new",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Configure email, push, and in-app notification preferences.</p>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">Manage notifications →</a>
      </div>
    ),
  },
  {
    title: "Security",
    icon: <Shield className="h-4 w-4" />,
    description: "Password, 2FA, and sessions",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Update password, enable 2FA, and review active sessions.</p>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">Security settings →</a>
      </div>
    ),
  },
  {
    title: "Billing",
    icon: <CreditCard className="h-4 w-4" />,
    description: "Plans, invoices, and payments",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">View invoices, manage payment methods, and update your plan.</p>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">Billing portal →</a>
      </div>
    ),
  },
];

export function SettingsPanelDemo() {
  return (
    <div className="w-full max-w-sm">
      <Accordion items={items} multiple defaultOpen={[0]} />
    </div>
  );
}
