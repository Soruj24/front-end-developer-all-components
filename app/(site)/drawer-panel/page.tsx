"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const usageCode = `import { DrawerPanel } from "@/components/ui/drawer-panel";

<DrawerPanel open={isOpen} onClose={close}>
  <div>Panel content</div>
</DrawerPanel>`;

const RightDrawerDemo = () => (
  <div className="w-full p-4">
    <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-72 bg-card border-l border-border shadow-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-sm">Settings</h3>
          <button className="text-muted-foreground text-xs">✕</button>
        </div>
        <div className="space-y-3">
          {["Profile", "Notifications", "Security", "Appearance"].map((item) => (
            <div key={item} className="px-3 py-2 rounded-md hover:bg-muted text-sm cursor-pointer">{item}</div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  </div>
);

const LeftDrawerDemo = () => (
  <div className="w-full p-4">
    <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border shadow-xl p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10" />
            <span className="font-semibold text-sm">App Name</span>
          </div>
        </div>
        <nav className="space-y-1">
          {["Dashboard", "Projects", "Team", "Reports", "Settings"].map((item, i) => (
            <div key={item} className={`px-3 py-2 rounded-md text-sm cursor-pointer ${i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}>{item}</div>
          ))}
        </nav>
      </div>
      <div className="absolute inset-0 bg-black/20 ml-64" />
    </div>
  </div>
);

const BottomDrawerDemo = () => (
  <div className="w-full p-4">
    <div className="relative h-64 bg-muted/30 rounded-lg overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl shadow-xl p-4">
        <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-4" />
        <h3 className="font-medium text-sm mb-3">Share</h3>
        <div className="flex gap-3">
          {["Copy Link", "Email", "Twitter", "Slack"].map((opt) => (
            <button key={opt} className="flex-1 py-2 rounded-lg bg-muted text-xs font-medium">{opt}</button>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </div>
  </div>
);

export default function DrawerPanelPage() {
  return (
    <ComponentDocPage name="Drawer Panel" category="Layout" description="A sliding drawer panel component for side navigation, detail views, and modal-like overlays with smooth transitions">
      <PreviewPanel filename="drawer-panel-preview.tsx">
        <RightDrawerDemo />
      </PreviewPanel>

      <SourceCodeViewer source={usageCode} filename="drawer-panel.tsx" defaultExpanded />

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Left Drawer</h3>
          <p className="text-sm text-muted-foreground">A navigation drawer from the left side.</p>
          <ExampleBlock code={usageCode}>
            <LeftDrawerDemo />
          </ExampleBlock>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Bottom Drawer</h3>
          <p className="text-sm text-muted-foreground">A drawer that slides up from the bottom.</p>
          <ExampleBlock code={usageCode}>
            <BottomDrawerDemo />
          </ExampleBlock>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </ComponentDocPage>
  );
}