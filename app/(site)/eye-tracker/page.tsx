"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Eye } from "lucide-react";

const installCommand = `npx component-library@latest add eye-tracker`;
const usageCode = `import { EyeTracker } from "@/components/ui/eye-tracker";

<EyeTracker onGaze={handleGaze} />`;

export default function EyeTrackerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Eye Tracker</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An eye tracker visualization component for displaying gaze position, pupil tracking, and attention heatmaps.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Eye Display</h2><p className="mt-1 text-sm text-muted-foreground">A stylized eye visualization with iris tracking.</p></div>
        <ComponentPreview id="eye-tracker-display">
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              {["left", "right"].map((eye) => (
                <div key={eye} className="relative">
                  <div className="h-20 w-28 rounded-[50%] bg-white dark:bg-gray-200 border-2 border-foreground/20 flex items-center justify-center overflow-hidden">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                      <div className="h-5 w-5 rounded-full bg-black" />
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground absolute -bottom-4 left-1/2 -translate-x-1/2 capitalize">{eye} eye</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Gaze Cursor</h2><p className="mt-1 text-sm text-muted-foreground">A cursor that follows eye position.</p></div>
        <ComponentPreview id="eye-tracker-gaze">
          <div className="w-full p-4">
            <div className="relative h-48 rounded-xl border border-border bg-muted/30 max-w-md mx-auto">
              <div className="absolute top-12 left-16 h-8 w-8 rounded-full border-2 border-primary/50 bg-primary/10" />
              <div className="absolute top-16 left-20 h-2 w-2 rounded-full bg-primary" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Gaze position: (160, 48)</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Attention Heatmap</h2><p className="mt-1 text-sm text-muted-foreground">Heatmap overlay showing attention areas.</p></div>
        <ComponentPreview id="eye-tracker-heatmap">
          <div className="w-full p-4">
            <div className="relative h-40 rounded-xl border border-border overflow-hidden max-w-md mx-auto bg-white dark:bg-gray-900">
              <div className="absolute top-4 left-8 h-16 w-20 rounded-full bg-red-500/30 blur-xl" />
              <div className="absolute top-8 left-12 h-12 w-16 rounded-full bg-orange-500/20 blur-lg" />
              <div className="absolute bottom-6 right-12 h-10 w-14 rounded-full bg-yellow-500/20 blur-md" />
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">Content area</div>
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
