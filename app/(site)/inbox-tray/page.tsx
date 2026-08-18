"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Inbox,
  Mail,
  MailOpen,
  Star,
  Trash2,
  Archive,
  Clock,
  User,
  Bell,
  CheckCircle,
  Search,
} from "lucide-react";

const installCommand = `npx component-library@latest add inbox-tray`;

const usageCode = `import { Inbox } from "lucide-react";

export default function InboxTrayPage() {
  return (
    <div>
      <InboxOverviewDemo />
      <EmailListDemo />
      <NotificationCenterDemo />
      <UnreadCounterDemo />
      <PriorityInboxDemo />
      <ArchiveTrayDemo />
      <EmptyStateDemo />
    </div>
  );
}`;

const messages = [
  { id: 1, from: "Alice Chen", subject: "Q4 Report Ready", preview: "The Q4 financial report is finalized...", time: "2m ago", read: false, starred: true, priority: "high" as const },
  { id: 2, from: "Bob Smith", subject: "Re: Design Review", preview: "Updated the mockups based on feedback...", time: "15m ago", read: false, starred: false, priority: "normal" as const },
  { id: 3, from: "Carol Davis", subject: "Sprint Planning Notes", preview: "Here are the notes from today's sprint...", time: "1h ago", read: true, starred: false, priority: "normal" as const },
  { id: 4, from: "Dan Wilson", subject: "Server Migration", preview: "The server migration is scheduled for...", time: "3h ago", read: true, starred: true, priority: "high" as const },
  { id: 5, from: "Eve Brown", subject: "New Feature Request", preview: "I'd like to propose a new feature for...", time: "5h ago", read: false, starred: false, priority: "low" as const },
  { id: 6, from: "Frank Miller", subject: "Bug Fix Deployed", preview: "The critical bug fix has been deployed...", time: "1d ago", read: true, starred: false, priority: "normal" as const },
];

const notifications = [
  { id: 1, icon: "bell", title: "New comment on your PR", time: "5m ago", read: false },
  { id: 2, icon: "check", title: "Build passed successfully", time: "20m ago", read: false },
  { id: 3, icon: "user", title: "New team member joined", time: "1h ago", read: true },
  { id: 4, icon: "mail", title: "3 unread messages", time: "2h ago", read: true },
];

function InboxOverviewDemo() {
  const [localMessages, setLocalMessages] = useState(messages.slice(0, 4));
  const [searchQuery, setSearchQuery] = useState("");

  const toggleRead = (id: number) => {
    setLocalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  const toggleStar = (id: number) => {
    setLocalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  };

  const filtered = localMessages.filter(
    (m) =>
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = localMessages.filter((m) => !m.read).length;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Inbox</span>
          <Badge variant="primary">{unreadCount} unread</Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-md border border-border bg-background pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        {filtered.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex items-center gap-3 px-4 py-3 ${i < filtered.length - 1 ? "border-b border-border" : ""} ${!msg.read ? "bg-muted/50" : ""}`}
          >
            <button
              onClick={() => toggleStar(msg.id)}
              className="text-muted-foreground hover:text-yellow-500"
            >
              <Star className={`h-4 w-4 ${msg.starred ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </button>
            <button onClick={() => toggleRead(msg.id)} className="text-muted-foreground hover:text-foreground">
              {msg.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${!msg.read ? "font-semibold" : ""}`}>{msg.from}</span>
                {msg.priority === "high" && <Badge variant="error" className="text-[10px] px-1.5 py-0">High</Badge>}
              </div>
              <p className={`text-sm ${!msg.read ? "font-medium" : "text-muted-foreground"}`}>{msg.subject}</p>
              <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailListDemo() {
  const [localMessages, setLocalMessages] = useState(messages.slice(0, 5));

  const toggleRead = (id: number) => {
    setLocalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-lg border border-border overflow-hidden">
        {localMessages.map((msg, i) => (
          <div
            key={msg.id}
            onClick={() => toggleRead(msg.id)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 ${i < localMessages.length - 1 ? "border-b border-border" : ""} ${!msg.read ? "bg-primary/5" : ""}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {msg.from.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${!msg.read ? "font-semibold" : ""}`}>{msg.from}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className={`text-sm ${!msg.read ? "font-medium" : "text-muted-foreground"} truncate`}>{msg.subject}</p>
              <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
            </div>
            {!msg.read && (
              <div className="flex-shrink-0">
                <Badge variant="primary" className="text-[10px] px-1.5 py-0">New</Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationCenterDemo() {
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const markAsRead = (id: number) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const getIcon = (icon: string) => {
    switch (icon) {
      case "bell": return <Bell className="h-4 w-4" />;
      case "check": return <CheckCircle className="h-4 w-4" />;
      case "user": return <User className="h-4 w-4" />;
      case "mail": return <Mail className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Notifications</span>
          {unreadCount > 0 && <Badge variant="error">{unreadCount}</Badge>}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="text-xs text-primary hover:underline">
            Mark all as read
          </button>
        )}
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        {localNotifications.map((notif, i) => (
          <div
            key={notif.id}
            className={`flex items-start gap-3 px-4 py-3 ${i < localNotifications.length - 1 ? "border-b border-border" : ""} ${!notif.read ? "bg-primary/5" : ""}`}
          >
            <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${!notif.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {getIcon(notif.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!notif.read ? "font-medium" : ""}`}>{notif.title}</p>
              <p className="text-xs text-muted-foreground">{notif.time}</p>
            </div>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="mt-0.5 flex-shrink-0 text-xs text-primary hover:underline"
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function UnreadCounterDemo() {
  const folders = [
    { name: "Inbox", icon: <Inbox className="h-4 w-4" />, count: 12, active: true },
    { name: "Drafts", icon: <Mail className="h-4 w-4" />, count: 3, active: false },
    { name: "Sent", icon: <MailOpen className="h-4 w-4" />, count: 0, active: false },
    { name: "Starred", icon: <Star className="h-4 w-4" />, count: 5, active: false },
    { name: "Archive", icon: <Archive className="h-4 w-4" />, count: 0, active: false },
    { name: "Trash", icon: <Trash2 className="h-4 w-4" />, count: 2, active: false },
  ];

  const [activeFolder, setActiveFolder] = useState("Inbox");

  return (
    <div className="w-full max-w-xs">
      <div className="rounded-lg border border-border overflow-hidden">
        {folders.map((folder, i) => (
          <button
            key={folder.name}
            onClick={() => setActiveFolder(folder.name)}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${i < folders.length - 1 ? "border-b border-border" : ""} ${activeFolder === folder.name ? "bg-primary/5 text-primary" : "hover:bg-muted text-foreground"}`}
          >
            {folder.icon}
            <span className="flex-1 text-sm">{folder.name}</span>
            {folder.count > 0 && (
              <Badge variant={activeFolder === folder.name ? "primary" : "default"} className="text-xs">
                {folder.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function PriorityInboxDemo() {
  const [localMessages, setLocalMessages] = useState(messages.slice(0, 5));
  const [activeFilter, setActiveFilter] = useState<"all" | "high" | "normal" | "low">("all");

  const filtered = activeFilter === "all" ? localMessages : localMessages.filter((m) => m.priority === activeFilter);

  const toggleStar = (id: number) => {
    setLocalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  };

  const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    normal: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 mb-3">
        {(["all", "high", "normal", "low"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${activeFilter === filter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        {filtered.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex items-center gap-3 px-4 py-3 ${i < filtered.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${priorityColors[msg.priority]}`}>
              {msg.priority}
            </span>
            <button onClick={() => toggleStar(msg.id)} className="text-muted-foreground hover:text-yellow-500">
              <Star className={`h-4 w-4 ${msg.starred ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </button>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">{msg.from}</span>
              <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
            </div>
            <span className="text-xs text-muted-foreground">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchiveTrayDemo() {
  const [archivedMessages, setArchivedMessages] = useState([
    { id: 101, from: "Grace Lee", subject: "Project Archive Q3", time: "1w ago", selected: false },
    { id: 102, from: "Henry Kim", subject: "Old Design Files", time: "2w ago", selected: false },
    { id: 103, from: "Ivy Wang", subject: "Completed Sprint Notes", time: "1m ago", selected: false },
    { id: 104, from: "Jack Brown", subject: "Deprecated Components", time: "3w ago", selected: false },
  ]);

  const toggleSelect = (id: number) => {
    setArchivedMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  const selectAll = () => {
    setArchivedMessages((prev) => prev.map((m) => ({ ...m, selected: true })));
  };

  const deselectAll = () => {
    setArchivedMessages((prev) => prev.map((m) => ({ ...m, selected: false })));
  };

  const deleteSelected = () => {
    setArchivedMessages((prev) => prev.filter((m) => !m.selected));
  };

  const selectedCount = archivedMessages.filter((m) => m.selected).length;

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Archive className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Archive</span>
          <Badge variant="default">{archivedMessages.length} items</Badge>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <button onClick={deleteSelected} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
              <Trash2 className="h-3 w-3" /> Delete ({selectedCount})
            </button>
          )}
          <button onClick={selectedCount === archivedMessages.length ? deselectAll : selectAll} className="text-xs text-primary hover:underline">
            {selectedCount === archivedMessages.length ? "Deselect all" : "Select all"}
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        {archivedMessages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex items-center gap-3 px-4 py-3 ${i < archivedMessages.length - 1 ? "border-b border-border" : ""} ${msg.selected ? "bg-primary/5" : ""}`}
          >
            <input
              type="checkbox"
              checked={msg.selected}
              onChange={() => toggleSelect(msg.id)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{msg.from}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-border p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-1 text-lg font-medium">Your inbox is empty</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          No new messages. When you receive emails, they will appear here.
        </p>
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Compose new
        </button>
      </div>
    </div>
  );
}

export default function InboxTrayPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Inbox Tray</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Message inbox with read/unread states, starring, priority filtering, archive multi-select, and empty state handling.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Inbox Overview</h3>
          <ComponentPreview id="inbox-overview">
            <InboxOverviewDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Email List</h3>
          <ComponentPreview id="email-list">
            <EmailListDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Notification Center</h3>
          <ComponentPreview id="notification-center">
            <NotificationCenterDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Unread Counter</h3>
          <ComponentPreview id="unread-counter">
            <UnreadCounterDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Priority Inbox</h3>
          <ComponentPreview id="priority-inbox">
            <PriorityInboxDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Archive Tray</h3>
          <ComponentPreview id="archive-tray">
            <ArchiveTrayDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Empty State</h3>
          <ComponentPreview id="empty-state">
            <EmptyStateDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">messages</td>
                <td className="px-4 py-3 text-muted-foreground">Message[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{'"overview" | "list" | "archive"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"overview"'}</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">showPriority</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
