"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add counter-badge`;
const usageCode = `import { CounterBadge } from "@/components/ui/counter-badge";

<CounterBadge count={5} />`;

export default function CounterBadgePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Counter Badge</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A counter badge component for displaying notification counts, unread messages, and numeric indicators on UI elements.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Badge Variants</h2><p className="mt-1 text-sm text-muted-foreground">Different badge styles and colors.</p></div>
        <ComponentPreview id="counter-badge-variants">
          <div className="w-full p-4">
            <div className="flex items-center gap-6 justify-center">
              {[
                { label: "Default", color: "bg-primary text-primary-foreground" },
                { label: "Success", color: "bg-green-500 text-white" },
                { label: "Warning", color: "bg-yellow-500 text-white" },
                { label: "Danger", color: "bg-red-500 text-white" },
              ].map((variant) => (
                <div key={variant.label} className="flex flex-col items-center gap-2">
                  <span className={`${variant.color} h-6 min-w-[24px] rounded-full px-1.5 flex items-center justify-center text-xs font-medium`}>3</span>
                  <span className="text-xs text-muted-foreground">{variant.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Dot Badges</h2><p className="mt-1 text-sm text-muted-foreground">Simple dot indicators without numbers.</p></div>
        <ComponentPreview id="counter-badge-dot">
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              {["red", "green", "blue", "yellow"].map((color) => (
                <div key={color} className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs">🔔</span>
                  <span className={`absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-${color}-500`} />
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">On Elements</h2><p className="mt-1 text-sm text-muted-foreground">Badges positioned on icons and buttons.</p></div>
        <ComponentPreview id="counter-badge-on-elements">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
