"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CloudSun, Droplets, Wind } from "lucide-react";

const installCommand = `npx component-library@latest add weather-card`;
const usageCode = `// usage`;

export default function WeatherCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Weather Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A weather information card showing current conditions and forecast.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Weather Card Demo</h2><p className="mt-1 text-sm text-muted-foreground">Current weather conditions display.</p></div>
        <ComponentPreview id="weather-card-demo"><div className="w-full p-4"><div className="max-w-xs overflow-hidden rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-muted-foreground">San Francisco</p><p className="mt-1 text-4xl font-bold">72°</p><p className="text-sm text-muted-foreground">Partly Cloudy</p></div>
            <CloudSun className="h-12 w-12 text-amber-500" />
          </div>
          <div className="mt-4 flex gap-4 border-t pt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Droplets className="h-4 w-4" /> 65%</div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Wind className="h-4 w-4" /> 12 mph</div>
          </div>
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
