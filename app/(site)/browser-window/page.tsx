"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add browser-window`;
const usageCode = `import { BrowserWindow } from "@/components/ui/browser-window";

<BrowserWindow url="https://example.com">
  <div>Page content here</div>
</BrowserWindow>`;

export default function BrowserWindowPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Browser Window</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A decorative browser window frame for showcasing web content, screenshots, and application previews.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Window</h2><p className="mt-1 text-sm text-muted-foreground">A simple browser window with traffic lights and address bar.</p></div>
        <ComponentPreview id="browser-window-basic">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
                <div className="flex-1 mx-4"><div className="h-6 rounded-md bg-background border border-border flex items-center px-3 text-xs text-muted-foreground">https://example.com</div></div>
              </div>
              <div className="h-40 bg-background flex items-center justify-center text-sm text-muted-foreground">Page content renders here</div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Tabs</h2><p className="mt-1 text-sm text-muted-foreground">Browser window with multiple tabs in the title bar.</p></div>
        <ComponentPreview id="browser-window-tabs">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="bg-muted/50 border-b border-border">
                <div className="flex items-center px-2 pt-2 gap-1">
                  {["Home", "Dashboard", "Settings"].map((tab, i) => (
                    <div key={tab} className={`px-3 py-1.5 text-xs rounded-t-md ${i === 0 ? "bg-background border border-border border-b-0" : "text-muted-foreground hover:text-foreground"}`}>{tab}</div>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500" /><div className="h-3 w-3 rounded-full bg-yellow-500" /><div className="h-3 w-3 rounded-full bg-green-500" /></div>
                  <div className="flex-1 mx-4"><div className="h-6 rounded-md bg-background border border-border flex items-center px-3 text-xs text-muted-foreground">https://app.example.com/dashboard</div></div>
                </div>
              </div>
              <div className="h-32 bg-background flex items-center justify-center text-sm text-muted-foreground">Dashboard content</div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Minimal Frame</h2><p className="mt-1 text-sm text-muted-foreground">A stripped-down browser frame for minimal presentations.</p></div>
        <ComponentPreview id="browser-window-minimal">
          <div className="w-full p-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-b border-border">
                <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /></div>
              </div>
              <div className="h-28 bg-background flex items-center justify-center text-xs text-muted-foreground">Content</div>
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
