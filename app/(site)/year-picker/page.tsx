"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Calendar } from "lucide-react";

const installCommand = `npx component-library@latest add year-picker`;
const usageCode = `// usage`;

export default function YearPickerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Year Picker</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A year picker component for selecting years with decade navigation and keyboard accessibility.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Year Picker Demo</h2><p className="mt-1 text-sm text-muted-foreground">Select a year from a grid with decade navigation.</p></div>
        <ComponentPreview id="year-picker-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button className="rounded-md px-2 py-1 text-sm hover:bg-muted">&larr;</button>
              <span className="text-sm font-medium">2020 - 2029</span>
              <button className="rounded-md px-2 py-1 text-sm hover:bg-muted">&rarr;</button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029].map((y) => (
                <button key={y} className={`rounded-md px-3 py-2 text-sm ${y === 2026 ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{y}</button>
              ))}
            </div>
          </div>
        </div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
