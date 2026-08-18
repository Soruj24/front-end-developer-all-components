"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Bell, BellOff, Check, CheckCheck, Trash2, Settings, Filter } from "lucide-react";

const installCommand = "npx component-library@latest add notification-bell";

const usageCode = `import { useState } from "react";
import { Bell } from "lucide-react";

export function NotificationBell({ notifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-full hover:bg-muted">
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-background shadow-lg">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 hover:bg-muted">{n.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}`;

const notifications = [
  { id: 1, title: "New comment on your post", time: "2m ago", read: false, type: "comment" },
  { id: 2, title: "Your export is ready", time: "1h ago", read: false, type: "export" },
  { id: 3, title: "New user signed up", time: "3h ago", read: true, type: "user" },
  { id: 4, title: "Payment received", time: "5h ago", read: true, type: "payment" },
  { id: 5, title: "System update complete", time: "1d ago", read: true, type: "system" },
];

function BellWithBadge() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-8">
      <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
        <Bell className="h-5 w-5 text-foreground" />
        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      </button>
      <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
        <Bell className="h-5 w-5 text-foreground" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
      </button>
      <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
        <BellOff className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
}

function NotificationList() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-background shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-sm font-semibold text-foreground">Notifications</span>
        <Badge variant="secondary">5 new</Badge>
      </div>
      <div className="divide-y">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-muted cursor-pointer transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
              <Bell className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!n.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
            {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkRead() {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));
  const markOneRead = (id: number) => setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{unreadCount} unread</span>
        <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
          <CheckCheck className="h-3.5 w-3.5" /> Mark all read
        </button>
      </div>
      <div className="rounded-xl border divide-y overflow-hidden">
        {items.slice(0, 4).map((n) => (
          <div key={n.id} className={`flex items-center gap-3 px-4 py-3 ${!n.read ? "bg-primary/5" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
              <Bell className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${!n.read ? "font-medium" : "text-muted-foreground"}`}>{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </div>
            {!n.read && (
              <button onClick={() => markOneRead(n.id)} className="p-1 rounded hover:bg-muted">
                <Check className="h-4 w-4 text-primary" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClearAll() {
  const [items, setItems] = useState(notifications);
  const clearAll = () => setItems([]);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{items.length} notifications</span>
        <button onClick={clearAll} className="text-xs text-destructive hover:underline flex items-center gap-1">
          <Trash2 className="h-3.5 w-3.5" /> Clear all
        </button>
      </div>
      <div className="rounded-xl border divide-y overflow-hidden">
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <BellOff className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          items.slice(0, 4).map((n) => (
            <div key={n.id} className="flex items-center gap-3 px-4 py-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function NotificationGroups() {
  const [activeGroup, setActiveGroup] = useState("all");
  const groups = [
    { id: "all", label: "All" },
    { id: "mentions", label: "Mentions" },
    { id: "updates", label: "Updates" },
  ];
  const grouped = {
    all: notifications,
    mentions: notifications.filter((n) => n.type === "comment"),
    updates: notifications.filter((n) => n.type === "export" || n.type === "system"),
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-1 rounded-lg bg-muted p-1 mb-3">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeGroup === g.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border divide-y overflow-hidden">
        {(grouped[activeGroup as keyof typeof grouped] || []).slice(0, 4).map((n) => (
          <div key={n.id} className="flex items-center gap-3 px-4 py-3">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoundToggle() {
  const [soundOn, setSoundOn] = useState(true);
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-foreground" />
        <span className="text-sm font-medium text-foreground">Notification sound</span>
      </div>
      <button
        onClick={() => setSoundOn(!soundOn)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${soundOn ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundOn ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

function PriorityFilter() {
  const [selected, setSelected] = useState("all");
  const priorities = [
    { id: "all", label: "All", color: "text-muted-foreground" },
    { id: "high", label: "High", color: "text-red-500" },
    { id: "medium", label: "Medium", color: "text-amber-500" },
    { id: "low", label: "Low", color: "text-green-500" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      {priorities.map((p) => (
        <button
          key={p.id}
          onClick={() => setSelected(p.id)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selected === p.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export default function NotificationBellPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Notification Bell</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A notification bell with unread count badge, dropdown panel, mark-as-read, clear-all, grouped notifications, sound toggle, and priority filtering.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Bell with Badge</h3>
          <ComponentPreview id="notification-bell-badge">
            <BellWithBadge />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Notification List</h3>
          <ComponentPreview id="notification-bell-list">
            <NotificationList />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Mark as Read</h3>
          <ComponentPreview id="notification-bell-mark-read">
            <MarkRead />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Clear All</h3>
          <ComponentPreview id="notification-bell-clear">
            <ClearAll />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Notification Groups</h3>
          <ComponentPreview id="notification-bell-groups">
            <NotificationGroups />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Sound Toggle</h3>
          <ComponentPreview id="notification-bell-sound">
            <SoundToggle />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Priority Filter</h3>
          <ComponentPreview id="notification-bell-priority">
            <PriorityFilter />
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">notifications</td>
                <td className="px-4 py-3 text-muted-foreground">{"Notification[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onMarkRead</td>
                <td className="px-4 py-3 text-muted-foreground">{"(id: number) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClearAll</td>
                <td className="px-4 py-3 text-muted-foreground">{"() => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showBadge</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
