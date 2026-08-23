"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COUNTER_BADGE_SOURCE, VARIANTS_EXAMPLE, DOT_EXAMPLE, ON_ELEMENTS_EXAMPLE } from "./counter-badge-source";

export default function CounterBadgePage() {
  return (
    <ComponentDocPage
      name="Counter Badge"
      category="Feedback"
      description="A counter badge component for displaying notification counts, unread messages, and numeric indicators on UI elements."
    >
      <PreviewPanel filename="counter-badge.tsx">
        <div className="flex items-center gap-6">
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-medium">3</span>
          <span className="text-xs text-muted-foreground">Notifications</span>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COUNTER_BADGE_SOURCE}
        filename="components/ui/CounterBadge/CounterBadge.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Badge Variants" description="Different badge styles and colors." code={VARIANTS_EXAMPLE}>
          <div className="flex items-center gap-6 justify-center">
            {["default", "success", "warning", "danger"].map((variant) => (
              <div key={variant} className="flex flex-col items-center gap-2">
                <span className={`relative inline-flex h-6 min-w-[24px] rounded-full px-1.5 items-center justify-center text-xs font-medium ${variant === "default" ? "bg-primary text-primary-foreground" : variant === "success" ? "bg-green-500 text-white" : variant === "warning" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>3</span>
                <span className="text-xs text-muted-foreground">{variant}</span>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Dot Badges" description="Simple dot indicators without numbers." code={DOT_EXAMPLE}>
          <div className="flex items-center gap-8 justify-center">
            {["red", "green", "blue", "yellow"].map((color) => (
              <div key={color} className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs">🔔</span>
                <span className={`absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-${color}-500`} />
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="On Elements" description="Badges positioned on icons and buttons." code={ON_ELEMENTS_EXAMPLE}>
          <div className="w-full p-4">
            <div className="flex items-center gap-6 justify-center">
              <div className="relative">
                <button className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">📧</button>
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center px-1">12</span>
              </div>
              <div className="relative">
                <button className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">🛒</button>
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center px-1">3</span>
              </div>
              <div className="relative">
                <button className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">💬</button>
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] rounded-full bg-green-500 text-white text-[10px] font-medium flex items-center justify-center px-1">99+</span>
              </div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}