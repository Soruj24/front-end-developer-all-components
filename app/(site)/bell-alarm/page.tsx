"use client";

import { Bell, BellRing } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const SOURCE = `"use client";

import { Bell, BellRing } from "lucide-react";

export interface BellAlarmProps {
  count?: number;
  active?: boolean;
  className?: string;
}

export function BellAlarm({ count = 0, active = false, className = "" }: BellAlarmProps) {
  const Icon = active ? BellRing : Bell;
  return (
    <div className={\`relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted \${className}\`}>
      <Icon className="h-5 w-5 text-muted-foreground" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          {active ? "!" : count}
        </span>
      )}
    </div>
  );
}`;

export default function BellAlarmPage() {
  return (
    <ComponentDocPage name="Bell Alarm" category="Feedback" description="A notification bell component with alarm indicators, badge counts, and animated ringing states.">
      <PreviewPanel filename="bell-alarm.tsx">
        <div className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">3</span>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={SOURCE} filename="components/ui/BellAlarm/BellAlarm.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Bell States" description="Different states of the bell notification indicator." code={`<BellAlarm count={3} />`}>
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              {[
                { Icon: Bell, label: "No alerts", badge: null as string | null },
                { Icon: Bell, label: "Unread", badge: "3" },
                { Icon: BellRing, label: "Active alarm", badge: "5" },
              ].map(({ Icon, label, badge }, i) => (
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
        </ExampleBlock>

        <ExampleBlock title="Animated Ringing" description="Bell with a shaking animation for active alarms." code={`<BellAlarm active count={5} />`}>
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="relative h-12 w-12 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center animate-pulse">
                <BellRing className="h-6 w-6 text-red-500 animate-bounce" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center">!</span>
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Notification List" description="Bell combined with a dropdown notification list." code={`<BellAlarm count={3} />`}>
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
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}