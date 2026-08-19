"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { BROWSER_WINDOW_SOURCE, BASIC_EXAMPLE, TABS_EXAMPLE, MINIMAL_EXAMPLE } from "./browser-window-source";

export default function BrowserWindowPage() {
  return (
    <ComponentDocPage
      name="Browser Window"
      category="Layout"
      description="A decorative browser window frame for showcasing web content, screenshots, and application previews."
    >
      <PreviewPanel filename="browser-window.tsx">
        <div className="w-full p-4">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
              <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
              <div className="mx-4 flex-1"><div className="flex h-6 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground">https://example.com</div></div>
            </div>
            <div className="flex h-40 items-center justify-center bg-background text-sm text-muted-foreground">Page content renders here</div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={BROWSER_WINDOW_SOURCE} filename="components/ui/BrowserWindow/BrowserWindow.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="With Tabs" description="Browser window with multiple tabs in the title bar." code={TABS_EXAMPLE} filename="browser-window-tabs.tsx">
          <div className="w-full p-4">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="border-b border-border bg-muted/50">
                <div className="flex items-center gap-1 px-2 pt-2">
                  {["Home", "Dashboard", "Settings"].map((tab, i) => (
                    <div key={tab} className={`px-3 py-1.5 text-xs rounded-t-md ${i === 0 ? "bg-background border border-border border-b-0" : "text-muted-foreground hover:text-foreground"}`}>{tab}</div>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
                  <div className="mx-4 flex-1"><div className="flex h-6 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground">https://app.example.com/dashboard</div></div>
                </div>
              </div>
              <div className="flex h-32 items-center justify-center bg-background text-sm text-muted-foreground">Dashboard content</div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Minimal Frame" description="A stripped-down browser frame for minimal presentations." code={MINIMAL_EXAMPLE} filename="browser-window-minimal.tsx">
          <div className="w-full p-4">
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-2">
                <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /></div>
              </div>
              <div className="flex h-28 items-center justify-center bg-background text-xs text-muted-foreground">Content</div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}