"use client";

import { useState } from "react";
import { Bell, BellOff, CheckCheck, Filter } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Notification } from "@/components/ui/Notification";

const SOURCE = `import { cn } from "@/lib/cn";
import type { NotificationProps, NotificationTitleProps, NotificationDescriptionProps } from "./Notification.types";

const variantClasses: Record<string, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
  error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
};

export function Notification({ children, variant = "info", title, onClose, className }: NotificationProps) {
  return (
    <div className={cn("relative rounded-lg border p-4", variantClasses[variant], className)}>
      {title && <NotificationTitle>{title}</NotificationTitle>}
      <NotificationDescription>{children}</NotificationDescription>
      {onClose && (
        <button type="button" onClick={onClose} className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function NotificationTitle({ children, className }: NotificationTitleProps) {
  return <h4 className={cn("text-sm font-medium mb-1", className)}>{children}</h4>;
}

export function NotificationDescription({ children, className }: NotificationDescriptionProps) {
  return <div className={cn("text-sm opacity-90", className)}>{children}</div>;
}`;

const notifs = [
  { id: 1, title: "New comment on your post", time: "2m ago", read: false, variant: "info" as const },
  { id: 2, title: "Your export is ready", time: "1h ago", read: false, variant: "success" as const },
  { id: 3, title: "New user signed up", time: "3h ago", read: true, variant: "info" as const },
  { id: 4, title: "Payment received", time: "5h ago", read: true, variant: "success" as const },
];

function BellBadge() {
  const [count] = useState(3);
  return (
    <div className="flex items-center gap-8">
      <button className="relative p-2 rounded-full hover:bg-muted"><Bell className="h-5 w-5" /><span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">{count}</span></button>
      <button className="relative p-2 rounded-full hover:bg-muted"><Bell className="h-5 w-5" /><span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" /></button>
      <button className="relative p-2 rounded-full hover:bg-muted"><BellOff className="h-5 w-5 text-muted-foreground" /></button>
    </div>
  );
}

function MarkRead() {
  const [items, setItems] = useState(notifs);
  const unread = items.filter((n) => !n.read).length;
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">{unread} unread</span>
        <button onClick={() => setItems(items.map((n) => ({ ...n, read: true })))} className="text-xs text-primary hover:underline flex items-center gap-1">
          <CheckCheck className="h-3.5 w-3.5" /> Mark all read
        </button>
      </div>
      <div className="rounded-xl border divide-y overflow-hidden">
        {items.map((n) => (
          <div key={n.id} className={`flex items-center gap-3 px-4 py-3 ${!n.read ? "bg-primary/5" : ""}`}>
            <Notification variant={n.variant} title={n.title} onClose={() => setItems(items.filter((i) => i.id !== n.id))}>{n.time}</Notification>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoundToggle() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3"><Bell className="h-5 w-5" /><span className="text-sm font-medium">Notification sound</span></div>
      <button onClick={() => setOn(!on)} className={`relative inline-flex h-6 w-11 items-center rounded-full ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white ${on ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

function PriorityFilter() {
  const [sel, setSel] = useState("all");
  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      {["all", "high", "medium", "low"].map((p) => (
        <button key={p} onClick={() => setSel(p)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${sel === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default function NotificationBellPage() {
  return (
    <ComponentDocPage
      name="Notification Bell"
      category="Feedback"
      description="A notification bell with unread count badge, dropdown panel, mark-as-read, sound toggle, and priority filtering."
    >
      <PreviewPanel filename="notification-bell-preview.tsx">
        <BellBadge />
      </PreviewPanel>

      <SourceCodeViewer source={SOURCE} filename="components/ui/Notification.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Bell with Badge" description="Bell icons with unread count, dot indicator, and disabled state." code={`<button className="relative p-2 rounded-full"><Bell className="h-5 w-5" /><span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-xs rounded-full">{count}</span></button>`}>
          <BellBadge />
        </ExampleBlock>

        <ExampleBlock title="Notification List" description="Dropdown panel using Notification components for each item." code={`<Notification variant="info" title="New comment">2m ago</Notification>`}>
          <div className="w-full max-w-sm rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="text-sm font-semibold">Notifications</span>
              <span className="text-xs text-muted-foreground">{notifs.filter((n) => !n.read).length} new</span>
            </div>
            <div className="divide-y">
              {notifs.map((n) => (
                <div key={n.id} className="p-3">
                  <Notification variant={n.variant} title={n.title} onClose={() => {}}>{n.time}</Notification>
                </div>
              ))}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Mark as Read" description="Interactive notifications with mark-as-read and dismiss." code={`<Notification variant="info" title="New comment" onClose={remove} />`}><MarkRead /></ExampleBlock>

        <ExampleBlock title="Sound Toggle" description="Toggle notification sound on and off." code={`<Toggle checked={on} onChange={setOn} />`}><SoundToggle /></ExampleBlock>

        <ExampleBlock title="Priority Filter" description="Filter notifications by priority level." code={`<div className="flex gap-2"><Filter className="h-4 w-4" />{["all","high","medium","low"].map((p) => <button onClick={() => setSel(p)}>{p}</button>)}</div>`}>
            <PriorityFilter />
          </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
