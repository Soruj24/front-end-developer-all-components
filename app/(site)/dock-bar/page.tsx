"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add dock-bar`;
const usageCode = `import { DockBar } from "@/components/ui/dock-bar";

<DockBar items={navItems} />`;

export default function DockBarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dock Bar</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A macOS-style dock navigation bar with hover magnification effects and icon tooltips for app launchers.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Dock</h2><p className="mt-1 text-sm text-muted-foreground">A simple dock bar with icon items.</p></div>
        <ComponentPreview id="dock-bar-basic">
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="flex items-end gap-1 px-4 py-2 rounded-2xl bg-muted/50 border border-border backdrop-blur">
                {["🏠", "📁", "🌐", "✉️", "⚙️", "🎵"].map((icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer">
                    <span className="text-2xl hover:scale-125 transition-transform duration-200 origin-bottom">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Tooltips</h2><p className="mt-1 text-sm text-muted-foreground">Dock items with hover tooltips.</p></div>
        <ComponentPreview id="dock-bar-tooltips">
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="flex items-end gap-2 px-5 py-3 rounded-2xl bg-card border border-border shadow-lg">
                {[{ icon: "🏠", label: "Home" }, { icon: "📊", label: "Analytics" }, { icon: "💬", label: "Messages" }, { icon: "👤", label: "Profile" }, { icon: "⚙️", label: "Settings" }].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 group cursor-pointer relative">
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-[10px] px-2 py-1 rounded whitespace-nowrap">{item.label}</div>
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-xl hover:scale-110 transition-transform">{item.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Indicator Dock</h2><p className="mt-1 text-sm text-muted-foreground">Dock items with active/indicator dots.</p></div>
        <ComponentPreview id="dock-bar-indicator">
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-muted/50 border border-border">
                {[{ icon: "📱", active: true }, { icon: "💻", active: false }, { icon: "🖥️", active: true }, { icon: "🎮", active: false }].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 cursor-pointer">
                    <span className="text-xl hover:scale-125 transition-transform">{item.icon}</span>
                    {item.active && <div className="h-1 w-1 rounded-full bg-foreground" />}
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
