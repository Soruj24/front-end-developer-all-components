"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const installCommand = `npx component-library@latest add dock-bar`;
const usageCode = `import { DockBar } from "@/components/ui/dock-bar";

<DockBar items={navItems} />`;

export default function DockBarPage() {
  return (
    <ComponentDocPage name="Dock Bar" category="Navigation" description="A macOS-style dock navigation bar with hover magnification effects and icon tooltips for app launchers.">
      <PreviewPanel filename="dock-bar-preview.tsx">
        <DockBar items={navItems} />
      </PreviewPanel>

      <SourceCodeViewer source={usageCode} filename="dock-bar.tsx" defaultExpanded />

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Basic Dock" code={usageCode}>
          <div className="w-full p-4">
            <div className="flex justify-center">
              <div className="flex items-end gap-1 px-4 py-2 rounded-2xl bg-muted/50 border border-border backdrop-blur">
                {["🏠", "📁", "🌐", "✉️", "⚙️", "🎵"].map((icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 group cursor-pointer">
                    <span className="text-2xl hover:scale-125 transition-transform origin-bottom">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Tooltips" code={usageCode}>
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
        </ExampleBlock>

        <ExampleBlock title="Indicator Dock" code={usageCode}>
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
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}