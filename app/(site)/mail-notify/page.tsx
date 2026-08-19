"use client";

import { useState, type FormEvent } from "react";
import { Mail, Bell, Send, Inbox, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MAIL_NOTIFY_SOURCE } from "./mail-notify-source";

function EmailCard() {
  const [read, setRead] = useState(false);
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><Mail className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Email Card</h3></div>
      <div onClick={() => setRead(!read)} className={`p-4 border rounded-lg cursor-pointer transition-colors ${read ? "bg-muted/50" : "bg-background border-primary/50"}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">{!read && <div className="w-2 h-2 bg-primary rounded-full" />}<p className="font-medium text-sm">New project assignment</p></div>
            <p className="text-xs text-muted-foreground mt-1">You have been assigned to the new dashboard project. Please review...</p>
          </div>
          <span className="text-xs text-muted-foreground">2m</span>
        </div>
      </div>
    </div>
  );
}

function NotificationBadge() {
  const [count, setCount] = useState(5);
  const [muted, setMuted] = useState(false);
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><Bell className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Notification Badge</h3></div>
      <div className="flex items-center justify-center h-32 bg-muted rounded-lg gap-8">
        <div className="relative"><Bell className="h-8 w-8 text-muted-foreground" />{count > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">{count}</span>}</div>
        <div className="flex gap-2">
          <button onClick={() => setCount(Math.max(0, count - 1))} className="px-3 py-1 text-xs bg-background border rounded-md hover:bg-muted">Dismiss</button>
          <button onClick={() => setMuted(!muted)} className={`px-3 py-1 text-xs border rounded-md ${muted ? "bg-destructive/10 text-destructive" : "bg-background hover:bg-muted"}`}>{muted ? "Muted" : "Mute"}</button>
        </div>
      </div>
    </div>
  );
}

function MailList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const emails = [
    { id: 1, from: "Alice Johnson", subject: "Project Update", time: "10:30 AM", unread: true },
    { id: 2, from: "Bob Smith", subject: "Meeting Tomorrow", time: "9:15 AM", unread: true },
    { id: 3, from: "Carol White", subject: "Design Review", time: "Yesterday", unread: false },
    { id: 4, from: "David Brown", subject: "Sprint Planning", time: "Yesterday", unread: false },
  ];
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><Inbox className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Mail List</h3></div>
      <div className="border rounded-lg divide-y">
        {emails.map((email) => (
          <div key={email.id} onClick={() => setSelectedId(email.id)} className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${selectedId === email.id ? "bg-muted" : "hover:bg-muted/50"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${email.unread ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{email.from.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><span className={`text-sm ${email.unread ? "font-semibold" : ""}`}>{email.from}</span></div>
              <p className="text-xs text-muted-foreground truncate">{email.subject}</p>
            </div>
            <span className="text-xs text-muted-foreground">{email.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SendButton() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const handleSend = () => { setStatus("sending"); setTimeout(() => setStatus("sent"), 1500); setTimeout(() => setStatus("idle"), 3000); };
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><Send className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Send Button</h3></div>
      <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
        <button onClick={handleSend} disabled={status !== "idle"} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${status === "sent" ? "bg-green-500 text-white" : status === "sending" ? "bg-primary/70 text-primary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
          {status === "sending" ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>) : status === "sent" ? (<><CheckCircle className="h-4 w-4" />Sent!</>) : (<><Send className="h-4 w-4" />Send Email</>)}
        </button>
      </div>
    </div>
  );
}

function UnreadCount() {
  const [emails, setEmails] = useState([{ id: 1, read: false }, { id: 2, read: false }, { id: 3, read: true }, { id: 4, read: false }, { id: 5, read: true }]);
  const unreadCount = emails.filter((e) => !e.read).length;
  const toggleRead = (id: number) => setEmails(emails.map((e) => (e.id === id ? { ...e, read: !e.read } : e)));
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><AlertCircle className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Unread Count</h3></div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg"><span className="text-sm font-medium">Unread Messages</span><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">{unreadCount}</span></div>
        <div className="space-y-2">{emails.map((email) => (
          <button key={email.id} onClick={() => toggleRead(email.id)} className={`w-full flex items-center gap-2 p-2 text-sm text-left rounded-md transition-colors ${email.read ? "bg-muted/50" : "bg-primary/10 border border-primary/30"}`}>
            <div className={`w-2 h-2 rounded-full ${email.read ? "bg-muted-foreground" : "bg-primary"}`} />
            <span className={email.read ? "" : "font-medium"}>Email {email.id}</span>
            <span className="ml-auto text-xs text-muted-foreground">{email.read ? "Read" : "Unread"}</span>
          </button>
        ))}</div>
      </div>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (e: FormEvent) => { e.preventDefault(); if (email) setSubscribed(true); };
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><Mail className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Newsletter</h3></div>
      {subscribed ? (
        <div className="text-center py-8"><CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" /><p className="font-medium">You&apos;re subscribed!</p><p className="text-sm text-muted-foreground mt-1">Check your inbox for confirmation</p></div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <p className="text-sm text-muted-foreground">Get the latest updates delivered to your inbox.</p>
          <div className="flex gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" required />
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">Subscribe</button>
          </div>
        </form>
      )}
    </div>
  );
}

function MailFilter() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const emails = [
    { id: 1, subject: "Welcome email", read: false, category: "primary" },
    { id: 2, subject: "Weekly digest", read: true, category: "promotions" },
    { id: 3, subject: "Password reset", read: false, category: "primary" },
    { id: 4, subject: "New comment", read: true, category: "social" },
  ];
  const filtered = emails.filter((e) => (filter === "unread" ? !e.read : filter === "read" ? e.read : true));
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4"><Clock className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">Mail Filter</h3></div>
      <div className="flex gap-2 mb-4">{(["all", "unread", "read"] as const).map((f) => (
        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>{f}</button>
      ))}</div>
      <div className="space-y-2">{filtered.map((email) => (
        <div key={email.id} className="flex items-center gap-3 p-3 border rounded-lg">
          <div className={`w-2 h-2 rounded-full ${email.read ? "bg-muted-foreground" : "bg-primary"}`} />
          <div className="flex-1"><p className="text-sm">{email.subject}</p><p className="text-xs text-muted-foreground capitalize">{email.category}</p></div>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-border text-foreground">{email.read ? "Read" : "New"}</span>
        </div>
      ))}</div>
    </div>
  );
}

export default function MailNotifyPage() {
  return (
    <ComponentDocPage name="Mail Notify" category="Feedback" description="Email and notification components including email cards, notification badges, mail lists, send buttons, unread counts, and newsletter subscriptions.">
      <PreviewPanel filename="mail-notify.tsx"><EmailCard /></PreviewPanel>

      <SourceCodeViewer source={MAIL_NOTIFY_SOURCE} filename="components/ui/MailCard/MailCard.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Email Card" description="Email item with unread indicator." code={`<MailCard subject="New project assignment" preview="You have been assigned..." time="2m" />`}><EmailCard /></ExampleBlock>
        <ExampleBlock title="Notification Badge" description="Bell with unread count badge and mute toggle." code={`<div className="relative"><Bell className="h-8 w-8" /><span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-xs rounded-full">{count}</span></div>`}><NotificationBadge /></ExampleBlock>
        <ExampleBlock title="Mail List" description="Selectable list of emails with avatars." code={`<div className="divide-y">{emails.map((e) => <div onClick={() => setSelectedId(e.id)}>{e.from}</div>)}</div>`}><MailList /></ExampleBlock>
        <ExampleBlock title="Send Button" description="Send action with loading and success states." code={`<button disabled={status !== "idle"}>{status === "sent" ? "Sent!" : "Send Email"}</button>`}><SendButton /></ExampleBlock>
        <ExampleBlock title="Unread Count" description="Track and toggle unread messages." code={`<span className="rounded-full bg-primary/10 text-primary">{unreadCount}</span>`}><UnreadCount /></ExampleBlock>
        <ExampleBlock title="Newsletter" description="Email subscription form with success state." code={`<input type="email" placeholder="you@example.com" /><button>Subscribe</button>`}><Newsletter /></ExampleBlock>
        <ExampleBlock title="Mail Filter" description="Filter emails by read status." code={`<button onClick={() => setFilter("unread")}>Unread</button>`}><MailFilter /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}