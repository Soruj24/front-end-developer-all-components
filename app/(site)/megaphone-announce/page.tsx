"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Megaphone,
  Volume2,
  Bell,
  Send,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";

const installCommand = "npx shadcn@latest add megaphone-announce";
const usageCode = `import { AnnouncementBanner } from "@/components/megaphone-announce";

export function AnnouncementExample() {
  return (
    <AnnouncementBanner
      title="New Feature Released!"
      description="Check out our latest update."
    />
  );
}`;

function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Announcement Banner</h3>
        </div>
        <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
          <button
            onClick={() => setDismissed(false)}
            className="text-sm text-primary hover:underline"
          >
            Show banner again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Announcement Banner</h3>
      </div>
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mt-0.5">
              <Megaphone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold">New Feature Released!</p>
              <p className="text-sm text-muted-foreground mt-1">
                We just launched dark mode. Try it out in settings.
              </p>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="flex gap-2 mt-3 ml-13">
          <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium">
            Learn More
          </button>
          <button className="px-4 py-1.5 border rounded-md text-sm hover:bg-muted">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

function AlertNotification() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "warning" as const, message: "Your storage is 80% full", active: true },
    { id: 2, type: "info" as const, message: "Scheduled maintenance tonight", active: true },
    { id: 3, type: "success" as const, message: "Payment received successfully", active: true },
  ]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, active: false } : a)));
  };

  const alertStyles = {
    warning: "border-yellow-500/50 bg-yellow-500/10",
    info: "border-blue-500/50 bg-blue-500/10",
    success: "border-green-500/50 bg-green-500/10",
  };

  const alertIcons = {
    warning: AlertCircle,
    info: Info,
    success: CheckCircle,
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Alert Notification</h3>
      </div>
      <div className="space-y-2">
        {alerts.filter((a) => a.active).map((alert) => {
          const Icon = alertIcons[alert.type];
          return (
            <div
              key={alert.id}
              className={`flex items-center gap-3 p-3 border rounded-lg ${alertStyles[alert.type]}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-sm">{alert.message}</span>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          );
        })}
        {alerts.every((a) => !a.active) && (
          <p className="text-sm text-muted-foreground text-center py-4">No active alerts</p>
        )}
      </div>
    </div>
  );
}

function BroadcastMessage() {
  const [channel, setChannel] = useState<"all" | "email" | "sms" | "push">("all");
  const [sent, setSent] = useState(false);

  const handleBroadcast = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Broadcast Message</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Channel</label>
          <div className="grid grid-cols-4 gap-2">
            {(["all", "email", "sms", "push"] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannel(ch)}
                className={`py-2 text-xs rounded-md border capitalize transition-colors ${
                  channel === ch
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Message</label>
          <textarea
            className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[80px]"
            placeholder="Enter your broadcast message..."
            defaultValue="System maintenance scheduled for tonight at 11 PM UTC."
          />
        </div>
        <button
          onClick={handleBroadcast}
          disabled={sent}
          className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
            sent
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {sent ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Broadcast Sent!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="h-4 w-4" />
              Broadcast Now
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function PromotionCard() {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [copied, setCopied] = useState(false);

  const applyPromo = () => {
    if (promoCode === "SAVE20") {
      setDiscount(20);
    } else if (promoCode === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText("SAVE20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Promotion Card</h3>
      </div>
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-purple-600">LIMITED OFFER</Badge>
        </div>
        <p className="font-bold text-lg">Get 20% OFF!</p>
        <p className="text-sm text-muted-foreground mt-1">
          Use code at checkout. Valid until end of month.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 bg-background rounded-md px-3 py-2 font-mono text-sm border">
            SAVE20
          </div>
          <button
            onClick={copyCode}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {discount > 0 && (
          <p className="text-sm text-green-600 mt-2">
            {discount}% discount applied!
          </p>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Enter promo code"
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          onClick={applyPromo}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function NewsFlash() {
  const [breaking, setBreaking] = useState(true);
  const news = [
    { id: 1, title: "Global Summit Reaches Climate Agreement", time: "2 min ago", category: "World" },
    { id: 2, title: "Tech Stocks Rally on Strong Earnings", time: "15 min ago", category: "Business" },
    { id: 3, title: "New Space Mission Launches Successfully", time: "1 hour ago", category: "Science" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">News Flash</h3>
      </div>
      {breaking && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-sm font-semibold text-red-600">BREAKING</span>
          </div>
          <p className="text-sm mt-1">Major tech company announces revolutionary AI product</p>
        </div>
      )}
      <div className="space-y-2">
        {news.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusUpdate() {
  const [status, setStatus] = useState<"online" | "away" | "busy" | "offline">("online");
  const statuses = [
    { value: "online" as const, label: "Online", color: "bg-green-500" },
    { value: "away" as const, label: "Away", color: "bg-yellow-500" },
    { value: "busy" as const, label: "Busy", color: "bg-red-500" },
    { value: "offline" as const, label: "Offline", color: "bg-gray-500" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Status Update</h3>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">JD</span>
          </div>
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
            statuses.find((s) => s.value === status)?.color
          }`} />
        </div>
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground capitalize flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${statuses.find((s) => s.value === status)?.color}`} />
            {status}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`p-2 rounded-lg border text-xs capitalize transition-colors ${
              status === s.value
                ? "border-primary bg-primary/10"
                : "hover:bg-muted"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${s.color} mx-auto mb-1`} />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EventAlert() {
  const [events, setEvents] = useState([
    { id: 1, title: "Team Standup", time: "9:00 AM", reminder: true },
    { id: 2, title: "Client Demo", time: "2:00 PM", reminder: true },
    { id: 3, title: "Sprint Review", time: "4:30 PM", reminder: false },
  ]);

  const toggleReminder = (id: number) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, reminder: !e.reminder } : e)));
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Event Alert</h3>
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="w-12 text-center">
              <p className="text-lg font-bold">{event.time.split(":")[0]}</p>
              <p className="text-xs text-muted-foreground">{event.time.split(" ")[1]}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{event.title}</p>
            </div>
            <button
              onClick={() => toggleReminder(event.id)}
              className={`p-2 rounded-lg transition-colors ${
                event.reminder
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MegaphoneAnnouncePage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Megaphone Announce</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-muted-foreground">
          Announcement and notification components including banners, alerts, broadcasts,
          promotions, and event alerts for effective communication.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid gap-6">
          <ComponentPreview name="AnnouncementBanner">
            <AnnouncementBanner />
          </ComponentPreview>
          <ComponentPreview name="AlertNotification">
            <AlertNotification />
          </ComponentPreview>
          <ComponentPreview name="BroadcastMessage">
            <BroadcastMessage />
          </ComponentPreview>
          <ComponentPreview name="PromotionCard">
            <PromotionCard />
          </ComponentPreview>
          <ComponentPreview name="NewsFlash">
            <NewsFlash />
          </ComponentPreview>
          <ComponentPreview name="StatusUpdate">
            <StatusUpdate />
          </ComponentPreview>
          <ComponentPreview name="EventAlert">
            <EventAlert />
          </ComponentPreview>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Prop</th>
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Default</th>
                <th className="p-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">title</td>
                <td className="p-2 font-mono text-xs">string</td>
                <td className="p-2 font-mono text-xs">required</td>
                <td className="p-2">Announcement title</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">description</td>
                <td className="p-2 font-mono text-xs">string</td>
                <td className="p-2 font-mono text-xs">required</td>
                <td className="p-2">Announcement description</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">variant</td>
                <td className="p-2 font-mono text-xs">"info" | "warning" | "error" | "success"</td>
                <td className="p-2 font-mono text-xs">"info"</td>
                <td className="p-2">Visual style variant</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">dismissible</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Allow dismissing the announcement</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">onDismiss</td>
                <td className="p-2 font-mono text-xs">() =&gt; void</td>
                <td className="p-2 font-mono text-xs">undefined</td>
                <td className="p-2">Callback when dismissed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
