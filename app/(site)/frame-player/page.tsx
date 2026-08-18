"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const installCommand = `npx component-library@latest add frame-player`;
const usageCode = `import { FramePlayer } from "@/components/ui/frame-player";

<FramePlayer frames={frames} fps={24} />`;

export default function FramePlayerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Frame Player</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A frame-by-frame media player for animation previews, video frame stepping, and sequential image playback.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Player</h2><p className="mt-1 text-sm text-muted-foreground">Simple frame player with play/pause controls.</p></div>
        <ComponentPreview id="frame-player-basic">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto rounded-xl border border-border bg-card overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Frame 12 / 240</span>
              </div>
              <div className="px-4 py-3 border-t border-border">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                  <div className="h-full bg-primary rounded-full" style={{ width: "5%" }} />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <button className="text-muted-foreground hover:text-foreground"><SkipBack className="h-4 w-4" /></button>
                  <button className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Play className="h-4 w-4 ml-0.5" /></button>
                  <button className="text-muted-foreground hover:text-foreground"><SkipForward className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Frame Counter</h2><p className="mt-1 text-sm text-muted-foreground">Player with detailed frame information.</p></div>
        <ComponentPreview id="frame-player-counter">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto rounded-xl border border-border bg-card overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Frame 48</span>
              </div>
              <div className="px-4 py-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Frame: 48 / 240</span>
                  <span>24 FPS</span>
                  <span>00:02.00</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "20%" }} />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button className="text-muted-foreground hover:text-foreground"><SkipBack className="h-3.5 w-3.5" /></button>
                  <button className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Pause className="h-3.5 w-3.5" /></button>
                  <button className="text-muted-foreground hover:text-foreground"><SkipForward className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Frame Scrubber</h2><p className="mt-1 text-sm text-muted-foreground">Player with a frame scrubber timeline.</p></div>
        <ComponentPreview id="frame-player-scrubber">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`flex-1 h-8 rounded ${i < 8 ? "bg-primary/30 border border-primary/50" : "bg-muted border border-border"} ${i === 7 ? "ring-2 ring-primary" : ""}`} />
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
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
