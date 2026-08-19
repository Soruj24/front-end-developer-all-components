"use client";

import { PartyPopper, Sparkles, Download } from "lucide-react";
import { ConfettiCanvas, ConfettiDemo, ConfettiPresets } from "./confetti-demos";
import { CONFETTI_SOURCE } from "./confetti-source";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const paletteCode = `<div className="flex flex-wrap gap-3">
  {[
    { name: "Warm", colors: ["#f94144", "#f3722c", "#f8961e", "#f9c74f"] },
    { name: "Cool", colors: ["#577590", "#43aa8b", "#90be6d", "#277da1"] },
    { name: "Neon", colors: ["#ff006e", "#8338ec", "#3a86ff", "#06d6a0"] },
    { name: "Pastel", colors: ["#ffc8dd", "#bde0fe", "#a2d2ff", "#cdb4db"] },
  ].map((p) => (
    <div key={p.name} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 dark:border-border">
      <div className="flex gap-1">
        {p.colors.map((c) => (
          <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <span className="text-xs font-medium">{p.name}</span>
    </div>
  ))}
</div>`;

export default function ConfettiPage() {
  return (
    <ComponentDocPage
      name="Confetti"
      category="Animation"
      description="Celebration confetti animation with customizable particles, colors, spread, and gravity for festive UI feedback."
    >
      <PreviewPanel filename="confetti.tsx">
        <ConfettiDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CONFETTI_SOURCE}
        filename="components/ui/Confetti/Confetti.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Interactive Demo" description="Adjust parameters and fire confetti to see the effect." code={<ConfettiDemo />}>
          <ConfettiDemo />
        </ExampleBlock>

        <ExampleBlock title="Presets" description="Pre-configured confetti styles for common scenarios." code={<ConfettiPresets />}>
          <ConfettiPresets />
        </ExampleBlock>

        <ExampleBlock title="Color Palettes" description="Different color combinations for confetti particles." code={paletteCode}>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Warm", colors: ["#f94144", "#f3722c", "#f8961e", "#f9c74f"] },
              { name: "Cool", colors: ["#577590", "#43aa8b", "#90be6d", "#277da1"] },
              { name: "Neon", colors: ["#ff006e", "#8338ec", "#3a86ff", "#06d6a0"] },
              { name: "Pastel", colors: ["#ffc8dd", "#bde0fe", "#a2d2ff", "#cdb4db"] },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 dark:border-border">
                <div className="flex gap-1">
                  {p.colors.map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-xs font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}