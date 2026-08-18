"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tv } from "lucide-react";

const installCommand = `npx component-library@latest add tv-screen`;
const usageCode = `import { TvScreen } from "@/components/_tv-screen";

<TvScreen title="Dashboard" />`;

function ScreenFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-xl border-2 border-foreground/10 bg-foreground/5 p-1 ${className}`}>
      <div className="rounded-lg bg-background p-4">{children}</div>
      <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-foreground/10" />
    </div>
  );
}

function ChannelCard({ name, active }: { name: string; active: boolean }) {
  return (
    <div className={`rounded-lg border p-3 text-center text-xs font-medium ${active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
      {name}
    </div>
  );
}

export default function TvScreenPage() {
  const channels = ["Home", "Movies", "Sports", "News", "Music"];
  const resolutions = ["720p", "1080p", "4K", "8K"];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">TV Screen</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          TV-optimized screen layouts with channel grids, resolution indicators, and media frames.
        </p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Screen</h2>
        <ScreenFrame>
          <div className="flex h-40 items-center justify-center">
            <Tv className="h-12 w-12 text-muted-foreground" />
          </div>
        </ScreenFrame>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Channel Grid</h2>
        <div className="grid grid-cols-5 gap-2">
          {channels.map((ch, i) => (
            <ChannelCard key={ch} name={ch} active={i === 0} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Resolution Selector</h2>
        <div className="flex gap-3">
          {resolutions.map((r, i) => (
            <div key={r} className={`rounded-lg border px-4 py-2 text-sm font-medium ${i === 2 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
              {r}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">resolution</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;720p&quot; | &quot;1080p&quot; | &quot;4K&quot; | &quot;8K&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;1080p&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
