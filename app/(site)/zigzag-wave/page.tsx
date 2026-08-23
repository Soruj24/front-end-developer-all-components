"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIGZAG_WAVE_SOURCE } from "./zigzag-wave-source";
import {
  BASIC_WAVE_EXAMPLE,
  WAVE_COLORS_EXAMPLE,
  WAVE_SPEEDS_EXAMPLE,
  WAVE_AMPLITUDE_EXAMPLE,
  WAVE_FILLED_EXAMPLE,
  WAVE_WITH_CONTENT_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zigzag-wave-examples";
import {
  BasicWave,
  WaveColors,
  WaveSpeeds,
  WaveAmplitude,
  WaveFilled,
  WaveWithContent,
  PlaygroundDemo,
} from "./demos";

export default function ZigzagWavePage() {
  return (
    <ComponentDocPage
      name="Zigzag Wave"
      category="Animation"
      description="A zigzag wave animation component that combines zigzag patterns with wave motion for dynamic visual effects."
    >
      <PreviewPanel filename="basic-wave.tsx">
        <BasicWave />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIGZAG_WAVE_SOURCE}
        filename="components/ui/ZigzagWave/BasicWave.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zigzag wave variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Wave" description="Default 3-layer staggered wave animation." code={BASIC_WAVE_EXAMPLE}>
          <BasicWave />
        </ExampleBlock>
        <ExampleBlock title="Wave Colors" description="Zinc, blue, violet, emerald, and amber wave colors." code={WAVE_COLORS_EXAMPLE}>
          <WaveColors />
        </ExampleBlock>
        <ExampleBlock title="Wave Speeds" description="Slow (4s), normal (2s), and fast (1s) wave speeds." code={WAVE_SPEEDS_EXAMPLE}>
          <WaveSpeeds />
        </ExampleBlock>
        <ExampleBlock title="Wave Amplitude" description="Adjustable wave height from 4px to 24px." code={WAVE_AMPLITUDE_EXAMPLE}>
          <WaveAmplitude />
        </ExampleBlock>
        <ExampleBlock title="Filled Waves" description="Solid filled wave layers with gradient opacity." code={WAVE_FILLED_EXAMPLE}>
          <WaveFilled />
        </ExampleBlock>
        <ExampleBlock title="Wave with Content" description="Zigzag wave separator between header and content." code={WAVE_WITH_CONTENT_EXAMPLE}>
          <WaveWithContent />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
