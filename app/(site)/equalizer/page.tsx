"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Volume2, SlidersHorizontal, Music, Settings, Play, Pause } from "lucide-react";

import { ComponentDocPage } from "@/components/docs";
import { PreviewPanel } from "@/components/docs";
import { ExampleBlock } from "@/components/docs";
import { SourceCodeViewer } from "@/components/docs";

import { BarEqualizer } from "./BarEqualizer-source";
import { CircleEqualizer } from "./CircleEqualizer-source";
import { FrequencyBands } from "./FrequencyBands-source";
import { PresetEQ } from "./PresetEQ-source";
import { CustomEQ } from "./CustomEQ-source";
import { Visualizer } from "./Visualizer-source";
import { AudioBars } from "./AudioBars-source";

export default function EqualizerPage() {
  return (
    <ComponentDocPage name="Equalizer" category="Media" description="An audio equalizer component with frequency bands, sliders, and visual frequency display for audio applications.">
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Bar Equalizer" description="Vertical frequency band sliders with animation.">
          <PreviewPanel>
            <BarEqualizer />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Circle Equalizer" description="Circular frequency band visualization.">
          <PreviewPanel>
            <CircleEqualizer />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Frequency Bands" description="10-band graphic equalizer with slider controls.">
          <PreviewPanel>
            <FrequencyBands />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Preset EQ" description="Pre-configured EQ presets for different genres.">
          <PreviewPanel>
            <PresetEQ />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Custom EQ" description="Parametric EQ with frequency, gain, and Q controls.">
          <PreviewPanel>
            <CustomEQ />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Visualizer" description="Animated frequency spectrum visualizer.">
          <PreviewPanel>
            <Visualizer />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <section className="flex flex-col gap-4">
        <ExampleBlock title="Audio Bars" description="Stereo channel level meters.">
          <PreviewPanel>
            <AudioBars />
          </PreviewPanel>
        </ExampleBlock>
      </section>
      <SourceCodeViewer
        source={BarEqualizer.toString()}
        filename="BarEqualizer.tsx"
        label="tsx"
        defaultExpanded={false}
      />
    </ComponentDocPage>
  );
}