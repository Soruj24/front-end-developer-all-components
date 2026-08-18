"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add clapper-board`;
const usageCode = `import { ClapperBoard } from "@/components/ui/clapper-board";

<ClapperBoard scene={1} take={3} />`;

export default function ClapperBoardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Clapper Board</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A movie clapper board component for video editing, film production interfaces, and media project displays.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Clapper Board</h2><p className="mt-1 text-sm text-muted-foreground">A classic movie clapper board design.</p></div>
        <ComponentPreview id="clapper-board-basic">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto">
              <div className="bg-gray-900 rounded-t-lg relative overflow-hidden">
                <div className="h-16 flex">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-white" : "bg-gray-900"}`} style={{ transform: `skewX(-12deg)` }} />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pt-12">
                  <div className="h-1 w-full bg-gray-900 rotate-0" />
                </div>
              </div>
              <div className="bg-gray-900 rounded-b-lg p-4 text-white">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400">SCENE</span><p className="font-mono text-lg">01</p></div>
                  <div><span className="text-gray-400">TAKE</span><p className="font-mono text-lg">03</p></div>
                  <div><span className="text-gray-400">ROLL</span><p className="font-mono">A-001</p></div>
                  <div><span className="text-gray-400">DATE</span><p className="font-mono">2024-01-15</p></div>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Production Info</h2><p className="mt-1 text-sm text-muted-foreground">Clapper board with full production details.</p></div>
        <ComponentPreview id="clapper-board-production">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto bg-gray-900 rounded-xl p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <p className="text-lg font-bold tracking-tight">Sunset Boulevard</p>
                  <p className="text-xs text-gray-400 mt-1">Director: John Smith</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">SB</div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[{ label: "SCENE", val: "12" }, { label: "TAKE", val: "05" }, { label: "Slate", val: "034" }].map((d) => (
                  <div key={d.label} className="rounded-lg bg-white/10 p-2">
                    <p className="text-[10px] text-gray-400 uppercase">{d.label}</p>
                    <p className="font-mono text-lg">{d.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Minimal Style</h2><p className="mt-1 text-sm text-muted-foreground">A simplified, modern clapper board design.</p></div>
        <ComponentPreview id="clapper-board-minimal">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto rounded-lg border border-border bg-card overflow-hidden">
              <div className="h-8 bg-foreground flex">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-background" : "bg-foreground"}`} style={{ transform: "skewX(-15deg)" }} />
                ))}
              </div>
              <div className="p-4">
                <div className="flex justify-between text-sm">
                  <div><span className="text-muted-foreground text-xs">Scene</span><p className="font-medium">04</p></div>
                  <div><span className="text-muted-foreground text-xs">Take</span><p className="font-medium">01</p></div>
                  <div><span className="text-muted-foreground text-xs">Roll</span><p className="font-medium">B-002</p></div>
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
