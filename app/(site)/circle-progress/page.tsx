"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add circle-progress`;
const usageCode = `import { CircleProgress } from "@/components/ui/circle-progress";

<CircleProgress value={75} size="lg" />`;

export default function CircleProgressPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Circle Progress</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A circular progress indicator for showing completion status, loading states, and metric visualizations.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Progress</h2><p className="mt-1 text-sm text-muted-foreground">Simple circular progress with percentage display.</p></div>
        <ComponentPreview id="circle-progress-basic">
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              {[25, 50, 75, 100].map((value) => (
                <div key={value} className="flex flex-col items-center gap-2">
                  <div className="relative h-16 w-16">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                      <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray={`${value} 100`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2><p className="mt-1 text-sm text-muted-foreground">Different sizes of circular progress indicators.</p></div>
        <ComponentPreview id="circle-progress-sizes">
          <div className="w-full p-4">
            <div className="flex items-end gap-6 justify-center">
              {["sm", "md", "lg", "xl"].map((size) => {
                const s = size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 80;
                return (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <div className="relative" style={{ width: s, height: s }}>
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray="75 100" strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">75%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Multi-Ring</h2><p className="mt-1 text-sm text-muted-foreground">Nested progress rings for multiple metrics.</p></div>
        <ComponentPreview id="circle-progress-multi">
          <div className="w-full p-4">
            <div className="relative h-24 w-24 mx-auto">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" strokeDasharray="85 100" strokeLinecap="round" />
                <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
                <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" strokeDasharray="65 100" strokeLinecap="round" />
                <circle cx="18" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
                <circle cx="18" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-500" strokeDasharray="45 100" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex justify-center gap-4 mt-3">
              {[{ label: "Health", color: "bg-primary" }, { label: "Memory", color: "bg-emerald-500" }, { label: "CPU", color: "bg-amber-500" }].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${m.color}`} />
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                </div>
              ))}
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
