"use client";

import { useState } from "react";
import { Voicemail, Bell, Phone } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const SOURCE = `"use client";

import { Voicemail, Phone } from "lucide-react";

export interface VoicemailMessage {
  caller: string;
  time: string;
  duration: string;
  unread?: boolean;
}

export interface VoicemailAlertProps {
  messages: VoicemailMessage[];
  className?: string;
}

export function VoicemailAlert({ messages, className = "" }: VoicemailAlertProps) {
  return (
    <div className={\`flex flex-col gap-2 \${className}\`}>
      {messages.map((m) => (
        <div key={m.caller} className={\`flex items-center gap-3 rounded-lg border p-3 \${m.unread ? "border-primary/20 bg-primary/5" : "border-border"}\`}>
          <div className={\`flex h-10 w-10 items-center justify-center rounded-full \${m.unread ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}\`}>
            <Voicemail className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{m.caller}</p>
              {m.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
            </div>
            <p className="text-xs text-muted-foreground">{m.time} · {m.duration}</p>
          </div>
          <button className="rounded-md p-1.5 hover:bg-muted">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ))}
    </div>
  );
}`;

const messages = [
  { caller: "Alice Johnson", time: "2 min ago", duration: "0:45", unread: true },
  { caller: "Bob Smith", time: "15 min ago", duration: "1:20", unread: true },
  { caller: "Carol White", time: "1 hour ago", duration: "0:30", unread: false },
];

function AlertBadge() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Bell className="h-6 w-6 text-muted-foreground" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{count}</span>
      </div>
      <button onClick={() => setCount(Math.max(0, count - 1))} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted">Clear one</button>
    </div>
  );
}

function AlertItem({ caller, time, duration, unread }: { caller: string; time: string; duration: string; unread: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border p-3 ${unread ? "border-primary/20 bg-primary/5" : "border-border"}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${unread ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
        <Voicemail className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2"><p className="text-sm font-medium">{caller}</p>{unread && <span className="h-2 w-2 rounded-full bg-primary" />}</div>
        <p className="text-xs text-muted-foreground">{time} · {duration}</p>
      </div>
      <button className="rounded-md p-1.5 hover:bg-muted"><Phone className="h-4 w-4 text-muted-foreground" /></button>
    </div>
  );
}

export default function VoicemailAlertPage() {
  return (
    <ComponentDocPage name="Voicemail Alert" category="Feedback" description="Voicemail notification badges with message lists and playback controls.">
      <PreviewPanel filename="voicemail-alert.tsx">
        <div className="flex flex-col gap-2">{messages.map((m) => <AlertItem key={m.caller} {...m} />)}</div>
      </PreviewPanel>

      <SourceCodeViewer source={SOURCE} filename="components/ui/VoicemailAlert/VoicemailAlert.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Alert Badge" description="Voicemail count badge that can be cleared." code={`<div className="relative"><Bell className="h-6 w-6" /><span className="absolute -right-1 -top-1 bg-primary text-primary-foreground">{count}</span></div>`}>
          <AlertBadge />
        </ExampleBlock>

        <ExampleBlock title="Messages" description="Voicemail message list with playback buttons." code={`<VoicemailAlert messages={messages} />`}>
          <div className="flex flex-col gap-2">{messages.map((m) => <AlertItem key={m.caller} {...m} />)}</div>
        </ExampleBlock>

        <ExampleBlock title="Empty State" description="Shown when there are no voicemails." code={`<div className="text-center"><Voicemail />No voicemails</div>`}>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-border p-8 text-center">
            <Voicemail className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">No voicemails</p>
            <p className="text-xs text-muted-foreground">You&apos;re all caught up!</p>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}