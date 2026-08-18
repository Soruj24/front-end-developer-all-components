"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add date-range`;
const usageCode = `import { DateRange } from "@/components/ui/date-range";

<DateRange startDate={start} endDate={end} onChange={setRange} />`;

export default function DateRangePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Date Range</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A date range picker component for selecting start and end dates with calendar visualization and quick presets.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Date Range Input</h2><p className="mt-1 text-sm text-muted-foreground">Two input fields for start and end dates.</p></div>
        <ComponentPreview id="date-range-input">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                <input type="text" value="2024-01-15" readOnly className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>
              <span className="mt-5 text-muted-foreground">→</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                <input type="text" value="2024-02-15" readOnly className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Presets</h2><p className="mt-1 text-sm text-muted-foreground">Quick select buttons for common date ranges.</p></div>
        <ComponentPreview id="date-range-presets">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto space-y-3">
              <div className="flex gap-1.5">
                {["Today", "7 days", "30 days", "90 days"].map((preset, i) => (
                  <button key={preset} className={`px-3 py-1.5 rounded-md text-xs font-medium ${i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{preset}</button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background text-sm">
                <span>Jan 15, 2024</span>
                <span className="text-muted-foreground mx-1">—</span>
                <span>Feb 15, 2024</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Compact Range</h2><p className="mt-1 text-sm text-muted-foreground">A single-line date range display.</p></div>
        <ComponentPreview id="date-range-compact">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto">
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Range</p>
                    <p className="text-sm font-medium mt-0.5">Jan 1 — Dec 31, 2024</p>
                  </div>
                  <span className="text-xs text-muted-foreground">365 days</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
                </div>
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
