"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Clock } from "lucide-react";

const installCommand = `npx component-library@latest add timeline-card`;
const usageCode = `// usage`;

export default function TimelineCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Timeline Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A timeline visualization showing events in chronological order.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Timeline Card Demo</h2><p className="mt-1 text-sm text-muted-foreground">Chronological event timeline.</p></div>
        <ComponentPreview id="timeline-card-demo"><div className="w-full p-4"><div className="relative max-w-md space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
          {[{t:"Project Started",d:"Jan 15, 2024",desc:"Initial planning and setup"},{t:"Design Phase",d:"Feb 1, 2024",desc:"UI/UX design completed"},{t:"Development",d:"Mar 10, 2024",desc:"Core features implemented"},{t:"Launch",d:"Apr 20, 2024",desc:"v1.0 released to production"}].map((e,i) => (
            <div key={i} className="relative"><div className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" /><div className="rounded-lg border bg-card p-4"><p className="text-sm font-medium">{e.t}</p><p className="text-xs text-muted-foreground">{e.d}</p><p className="mt-1 text-sm text-muted-foreground">{e.desc}</p></div></div>
          ))}
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
