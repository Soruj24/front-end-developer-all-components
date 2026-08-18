"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Clock } from "lucide-react";

const installCommand = `npx component-library@latest add realtime-clock`;
const usageCode = `// usage`;

export default function RealtimeClockPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Realtime Clock</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A live-updating clock component that displays the current time with customizable format and timezone.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Real-time clock with date and time display.</p></div>
        <ComponentPreview id="realtime-clock"><div className="w-full p-4"><div className="flex flex-col items-center gap-4 py-4"><div className="relative w-40 h-40 rounded-full border-4 border-foreground/10 flex items-center justify-center"><div className="absolute inset-2">{Array.from({length:12},(_,i)=>{const angle=(i*30-90)*(Math.PI/180);const x=Math.cos(angle)*52+50;const y=Math.sin(angle)*52+50;return<div key={i} className="absolute w-1 h-1 rounded-full bg-foreground/30" style={{left:`${x}%`,top:`${y}%`,transform:"translate(-50%,-50%)"}}></div>})}</div><div className="absolute w-0.5 h-10 bg-foreground/70 origin-bottom rounded-full" style={{transformOrigin:"bottom center",transform:"rotate(0deg)"}}></div><div className="absolute w-0.5 h-14 bg-foreground origin-bottom rounded-full" style={{transformOrigin:"bottom center",transform:"rotate(90deg)"}}></div><div className="w-3 h-3 rounded-full bg-primary"></div></div><div className="text-center"><p className="text-2xl font-mono font-bold text-foreground">12:30:45</p><p className="text-sm text-muted-foreground">Monday, August 18, 2026</p></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">format</td><td className="px-4 py-3 text-muted-foreground">{"12h"} | {"24h"}</td><td className="px-4 py-3 text-muted-foreground">{"24h"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showDate</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">timezone</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{"local"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
