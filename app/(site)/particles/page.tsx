"use client";

import { Particles } from "@/components/ui/Particles";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { PARTICLES_SOURCE, BASIC_EXAMPLE, CONSTELLATION_EXAMPLE } from "./particles-source";
import { InteractiveDemo, PresetsDemo } from "./particles-demos";

export default function ParticlesPage() {
  return (
    <ComponentDocPage
      name="Particles"
      category="Feedback"
      description="Animated particle background with connecting lines, mouse interaction, and customizable density and color."
    >
      <PreviewPanel filename="particles.tsx">
        <div className="w-full">
          <Particles count={80} speed={0.5} color="#6366f1" connectDistance={100} mouseInteract />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={PARTICLES_SOURCE}
        filename="components/ui/Particles/Particles.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Interactive Playground"
          description="Adjust particle count, speed, connection distance, and color in real time. Move your mouse to interact."
          code={BASIC_EXAMPLE}
          filename="interactive.tsx"
        >
          <InteractiveDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Presets"
          description="Pre-configured particle effects for different visual styles."
          code={CONSTELLATION_EXAMPLE}
          filename="presets.tsx"
        >
          <PresetsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
