"use client";

import { Accordion, AccordionItem } from "./accordion";
import { Inbox, Bell, Star, Flag } from "lucide-react";

export function BadgesDemo() {
  const items: AccordionItem[] = [
    { title: "Inbox", icon: <Inbox className="h-4 w-4" />, badge: "12", content: <p className="text-sm">View your recent messages and notifications.</p> },
    { title: "Notifications", icon: <Bell className="h-4 w-4" />, badge: "3 new", content: <p className="text-sm">Check your latest alerts and updates.</p> },
    { title: "Favorites", icon: <Star className="h-4 w-4" />, badge: "5", content: <p className="text-sm">Access your saved and favorited items.</p> },
    { title: "Flagged", icon: <Flag className="h-4 w-4" />, content: <p className="text-sm">Review items marked for follow-up.</p> },
  ];

  return (
    <div className="w-full max-w-sm">
      <Accordion items={items} defaultOpen={[0]} />
    </div>
  );
}

export function DescriptionDemo() {
  const items: AccordionItem[] = [
    { title: "General Settings", description: "Language, theme, and display options", content: <p className="text-sm">Configure your general application preferences.</p> },
    { title: "Account Settings", description: "Email, password, and profile", content: <p className="text-sm">Manage your account security and personal info.</p> },
    { title: "Privacy Settings", description: "Data sharing and visibility", content: <p className="text-sm">Control who can see your profile and activity.</p> },
  ];

  return (
    <div className="w-full max-w-sm">
      <Accordion items={items} defaultOpen={[0]} />
    </div>
  );
}
