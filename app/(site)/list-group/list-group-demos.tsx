"use client";

import { useState } from "react";
import { ListGroup } from "@/components/ui/ListGroup";
import type { ListGroupItem } from "@/components/ui/ListGroup";
import { Mail, Bell, Settings, User, Shield, CreditCard, HelpCircle } from "lucide-react";

const menuItems: ListGroupItem[] = [
  { id: "profile", label: "Profile", description: "Manage your account", icon: User },
  { id: "billing", label: "Billing", description: "Payment & subscriptions", icon: CreditCard },
  { id: "security", label: "Security", description: "Password & 2FA", icon: Shield },
  { id: "notifications", label: "Notifications", description: "Email & push alerts", icon: Bell },
  { id: "settings", label: "Settings", description: "App preferences", icon: Settings },
  { id: "help", label: "Help", description: "Documentation & support", icon: HelpCircle },
];

const notifications: ListGroupItem[] = [
  { id: 1, label: "New comment on your post", description: "2 min ago", unread: true, badgeVariant: "primary" },
  { id: 2, label: "Sarah mentioned you", description: "15 min ago", unread: true, badgeVariant: "primary" },
  { id: 3, label: "Your export is ready", description: "1 hour ago" },
  { id: 4, label: "System update completed", description: "3 hours ago" },
  { id: 5, label: "New team member joined", description: "Yesterday" },
];

const badgeItems: ListGroupItem[] = [
  { id: "inbox", label: "Inbox", icon: Mail, badge: 3, badgeVariant: "primary" },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 12, badgeVariant: "danger" },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

const filterItems: ListGroupItem[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "closed", label: "Closed" },
];

export function MenuDemo() {
  const [active, setActive] = useState<string | number>("profile");
  return (
    <div className="w-full max-w-md">
      <ListGroup
        items={menuItems.map((item) => ({ ...item, active: item.id === active }))}
        onSelect={setActive}
      />
    </div>
  );
}

export function NotificationsDemo() {
  const [items, setItems] = useState(notifications);
  const markRead = (id: string | number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };
  return (
    <div className="w-full max-w-md">
      <ListGroup
        items={items}
        onSelect={markRead}
        header={
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            <button
              type="button"
              onClick={() => setItems((prev) => prev.map((item) => ({ ...item, unread: false })))}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          </div>
        }
      />
    </div>
  );
}

export function BadgesDemo() {
  return (
    <div className="w-full max-w-md">
      <ListGroup items={badgeItems} />
    </div>
  );
}

export function HorizontalDemo() {
  const [active, setActive] = useState<string | number>("all");
  return (
    <div className="w-full max-w-md">
      <ListGroup
        horizontal
        items={filterItems.map((item) => ({ ...item, active: item.id === active }))}
        onSelect={setActive}
      />
    </div>
  );
}

export function FooterDemo() {
  return (
    <div className="w-full max-w-md">
      <ListGroup
        items={menuItems.slice(0, 4)}
        footer={
          <p className="text-xs text-muted-foreground">End of list</p>
        }
      />
    </div>
  );
}
