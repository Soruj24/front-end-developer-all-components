"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Voicemail, Bell, Phone, Clock } from "lucide-react";

const installCommand = `npx component-library@latest add voicemail-alert`;
const usageCode = `import { VoicemailAlert } from "@/components/_voicemail-alert";

<VoicemailAlert count={3} />`;

function AlertItem({ caller, time, duration, unread }: { caller: string; time: string; duration: string; unread: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border p-3 ${unread ? "border-primary/20 bg-primary/5" : "border-border"}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${unread ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
        <Voicemail className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{caller}</p>
          {unread && <span className="h-2 w-2 rounded-full bg-primary" />}
        </div>
        <p className="text-xs text-muted-foreground">{time} · {duration}</p>
      </div>
      <button className="rounded-md p-1.5 hover:bg-muted">
        <Phone className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}

export default function VoicemailAlertPage() {
  const [count, setCount] = useState(3);
  const messages = [
    { caller: "Alice Johnson", time: "2 min ago", duration: "0:45", unread: true },
    { caller: "Bob Smith", time: "15 min ago", duration: "1:20", unread: true },
    { caller: "Carol White", time: "1 hour ago", duration: "0:30", unread: false },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Voicemail Alert</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Voicemail notification badges with message lists and playback controls.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Alert Badge</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-muted-foreground" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{count}</span>
          </div>
          <button onClick={() => setCount(Math.max(0, count - 1))} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted">Clear one</button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Messages</h2>
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <AlertItem key={m.caller} {...m} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Empty State</h2>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border p-8 text-center">
          <Voicemail className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">No voicemails</p>
          <p className="text-xs text-muted-foreground">You&apos;re all caught up!</p>
        </div>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">count</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">messages</td>
                <td className="px-4 py-3 text-muted-foreground">VoicemailMessage[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
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
