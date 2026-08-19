"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Sun } from "lucide-react";
import { BRIGHTNESS_CONTROL_SOURCE, SLIDER_EXAMPLE, PRESETS_EXAMPLE, PREVIEW_EXAMPLE } from "./brightness-control-source";

export default function BrightnessControlPage() {
  return (
    <ComponentDocPage
      name="Brightness Control"
      category="Forms"
      description="A brightness adjustment control with slider, visual preview, and value display for media settings."
    >
      <PreviewPanel filename="brightness-control.tsx">
        <div className="w-full p-4">
          <div className="mx-auto max-w-sm space-y-4">
            <div className="flex items-center gap-4">
              <Sun className="h-5 w-5 text-yellow-500" />
              <div className="relative h-2 flex-1 rounded-full bg-muted">
                <div className="absolute h-full rounded-full bg-yellow-500" style={{ width: "75%" }} />
                <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-yellow-500 bg-white" style={{ left: "calc(75% - 8px)" }} />
              </div>
              <span className="w-10 text-right text-sm font-medium">75%</span>
            </div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={BRIGHTNESS_CONTROL_SOURCE} filename="components/ui/BrightnessControl/BrightnessControl.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Preset Levels" description="Quick preset buttons for common brightness levels." code={PRESETS_EXAMPLE} filename="brightness-presets.tsx">
          <div className="flex w-full justify-center gap-2">
            {[25, 50, 75, 100].map((level) => (
              <button key={level} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                {level === 100 ? "Max" : `${level}%`}
              </button>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Visual Preview" description="Brightness control with a live preview area." code={PREVIEW_EXAMPLE} filename="brightness-preview.tsx">
          <div className="mx-auto max-w-sm space-y-4">
            <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-200 to-orange-300 dark:from-yellow-800 dark:to-orange-700" style={{ opacity: 0.75 }}>
              <Sun className="h-12 w-12 text-white/80" />
            </div>
            <div className="flex items-center gap-3">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <div className="relative h-2 flex-1 rounded-full bg-muted">
                <div className="absolute h-full rounded-full bg-primary" style={{ width: "75%" }} />
              </div>
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
