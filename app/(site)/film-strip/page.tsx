"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add film-strip`;
const usageCode = `import { FilmStrip } from "@/components/ui/film-strip";

<FilmStrip frames={frames} />`;

export default function FilmStripPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Film Strip</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A film strip component for displaying video frame sequences, storyboards, and media timelines with sprocket holes.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Classic Strip</h2><p className="mt-1 text-sm text-muted-foreground">A film strip with sprocket holes and frames.</p></div>
        <ComponentPreview id="film-strip-classic">
          <div className="w-full p-4 overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="bg-gray-900 rounded-lg p-2 flex items-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="h-2 w-3 rounded-sm bg-gray-700" />
                    <div className="h-16 w-20 rounded bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                      <span className="text-xs text-gray-400">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="h-2 w-3 rounded-sm bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Timeline Strip</h2><p className="mt-1 text-sm text-muted-foreground">A horizontal timeline with frame markers.</p></div>
        <ComponentPreview id="film-strip-timeline">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="h-1 bg-muted rounded-full">
                  <div className="absolute h-1 bg-primary rounded-full" style={{ width: "60%" }} />
                  <div className="absolute h-3 w-3 rounded-full bg-primary border-2 border-card top-1/2 -translate-y-1/2" style={{ left: "60%" }} />
                </div>
                <div className="flex justify-between mt-3">
                  {["00:00", "01:30", "03:00", "04:30", "06:00"].map((t) => (
                    <span key={t} className="text-[10px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Storyboard View</h2><p className="mt-1 text-sm text-muted-foreground">Film frames in a storyboard layout.</p></div>
        <ComponentPreview id="film-strip-storyboard">
          <div className="w-full p-4">
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded border border-border bg-card overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">Frame {i + 1}</span>
                  </div>
                  <div className="px-1.5 py-1 border-t border-border">
                    <span className="text-[9px] text-muted-foreground font-mono">{String(i * 2).padStart(2, "0")}:{String(i * 15).padStart(2, "0")}</span>
                  </div>
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
