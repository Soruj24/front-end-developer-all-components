"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ChevronRight, Mail, Bell, Settings, User, Shield, CreditCard, HelpCircle, LogOut } from "lucide-react";

const installCommand = `npx component-library@latest add list-group`;

const usageCode = `import { ListGroup, ListItem } from "@/components/list-group";

<ListGroup>
  <ListItem icon={Mail} label="Inbox" badge={3} />
  <ListItem icon={Bell} label="Notifications" badge={12} />
  <ListItem icon={Settings} label="Settings" />
</ListGroup>`;

const notifications = [
  { id: 1, title: "New comment on your post", time: "2 min ago", read: false, type: "comment" },
  { id: 2, title: "Sarah mentioned you", time: "15 min ago", read: false, type: "mention" },
  { id: 3, title: "Your export is ready", time: "1 hour ago", read: true, type: "export" },
  { id: 4, title: "System update completed", time: "3 hours ago", read: true, type: "system" },
  { id: 5, title: "New team member joined", time: "Yesterday", read: true, type: "team" },
];

const menuItems = [
  { icon: User, label: "Profile", description: "Manage your account" },
  { icon: CreditCard, label: "Billing", description: "Payment & subscriptions" },
  { icon: Shield, label: "Security", description: "Password & 2FA" },
  { icon: Bell, label: "Notifications", description: "Email & push alerts" },
  { icon: Settings, label: "Settings", description: "App preferences" },
  { icon: HelpCircle, label: "Help", description: "Documentation & support" },
];

const typeColors: Record<string, string> = {
  comment: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  mention: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  export: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  system: "bg-gray-400/10 text-gray-600 dark:text-gray-400",
  team: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function ListGroupPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [items, setItems] = useState(notifications);

  const markRead = (id: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">List Group</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Grouped list items with icons, badges, and interactive states. Perfect for navigation menus, notification feeds, and settings panels.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="list-group-basic">
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-border">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-muted/50 ${
                  selected === i ? "bg-muted/50" : ""
                }`}
                onClick={() => setSelected(i)}
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            );
          })}
        </div>
      </ComponentPreview>

      <ComponentPreview id="list-group-notifications">
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            <button
              onClick={() => setItems((prev) => prev.map((item) => ({ ...item, read: true })))}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-muted/30 ${
                !item.read ? "bg-primary/5" : ""
              }`}
              onClick={() => markRead(item.id)}
            >
              {!item.read && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
              <div className={`flex-1 ${item.read ? "ml-5" : ""}`}>
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${!item.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{item.title}</p>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${typeColors[item.type]}`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground/60">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="list-group-badges">
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-border">
          {[
            { icon: Mail, label: "Inbox", badge: 3, color: "bg-blue-500 text-white" },
            { icon: Bell, label: "Notifications", badge: 12, color: "bg-red-500 text-white" },
            { icon: CreditCard, label: "Payments", badge: 0, color: "" },
            { icon: Shield, label: "Security", badge: 0, color: "" },
            { icon: Settings, label: "Settings", badge: 0, color: "" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-muted/50">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                {item.badge > 0 && (
                  <span className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${item.color}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </ComponentPreview>

      <ComponentPreview id="list-group-horizontal">
        <div className="flex w-full flex-wrap gap-2">
          {["All", "Active", "Pending", "Closed"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              {filter}
            </button>
          ))}
        </div>
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">ListItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(index: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">flush</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
