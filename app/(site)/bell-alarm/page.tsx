"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Bell, BellRing } from "lucide-react";

const installCommand = `npx component-library@latest add bell-alarm`;
const usageCode = `import { BellAlarm } from "@/components/ui/bell-alarm";

<BellAlarm label="3 new notifications" />`;

export default function BellAlarmPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bell Alarm</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A notification bell component with alarm indicators, badge counts, and animated ringing states.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Bell States</h2><p className="mt-1 text-sm text-muted-foreground">Different states of the bell notification indicator.</p></div>
        <ComponentPreview id="bell-alarm-states">
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              {[
                { icon: Bell, label: "No alerts", badge: null },
                { icon: Bell, label: "Unread", badge: "3" },
                { icon: BellRing, label: "Active alarm", badge: "5" },
              ].map(({ icon: Icon, label, badge }, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    {badge && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">{badge}</span>}
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Ringing</h2><p className="mt-1 text-sm text-muted-foreground">Bell with a shaking animation for active alarms.</p></div>
        <ComponentPreview id="bell-alarm-animated">
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="relative h-12 w-12 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center animate-pulse">
                <BellRing className="h-6 w-6 text-red-500 animate-bounce" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">!</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Notification List</h2><p className="mt-1 text-sm text-muted-foreground">Bell combined with a dropdown notification list.</p></div>
        <ComponentPreview id="bell-alarm-list">
          <div className="w-full p-4">
            <div className="relative inline-block">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">3</span>
              </div>
              <div className="absolute top-12 right-0 w-64 rounded-lg border border-border bg-card shadow-lg z-10">
                <div className="p-3 border-b border-border"><p className="text-sm font-medium">Notifications</p></div>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-3 border-b border-border last:border-0 hover:bg-muted/50">
                    <p className="text-sm">New message received {n}</p>
                    <p className="text-xs text-muted-foreground">{n}m ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
