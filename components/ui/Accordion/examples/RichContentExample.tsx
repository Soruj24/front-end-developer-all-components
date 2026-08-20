"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "Performance Metrics",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground">98.5%</div>
          <div className="text-xs text-muted-foreground">Uptime</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground">42ms</div>
          <div className="text-xs text-muted-foreground">Avg Response</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground">1.2M</div>
          <div className="text-xs text-muted-foreground">Requests/day</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-foreground">0.3%</div>
          <div className="text-xs text-muted-foreground">Error Rate</div>
        </div>
      </div>
    ),
  },
  {
    title: "Recent Activity",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-2">
        {[
          { time: "2 min ago", event: "Deploy to production" },
          { time: "15 min ago", event: "Updated API keys" },
          { time: "1 hour ago", event: "New team member added" },
          { time: "3 hours ago", event: "Database migration completed" },
        ].map((item) => (
          <div key={item.time} className="flex items-center justify-between text-sm">
            <span className="text-foreground">{item.event}</span>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function RichContentExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={items} />
    </div>
  );
}
