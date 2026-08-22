"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HIP_HOP_MOVE_SOURCE } from "./hip-hop-move-source";
import {
  DANCE_MOVE_SELECTOR_EXAMPLE,
  MUSIC_VISUALIZER_EXAMPLE,
  DANCE_BATTLE_EXAMPLE,
  STEP_SEQUENCER_EXAMPLE,
  CLUB_NIGHT_EXAMPLE,
  DJ_BOOTH_EXAMPLE,
  DANCE_TUTORIAL_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./hip-hop-move-examples";
import {
  DanceMoveSelectorDemo,
  MusicVisualizerDemo,
  DanceBattleDemo,
  StepSequencerDemo,
  ClubNightDemo,
  DjBoothDemo,
  DanceTutorialDemo,
  PlaygroundDemo,
} from "./demos";

export default function HipHopMovePage() {
  return (
    <ComponentDocPage
      name="Hip Hop Move"
      category="Animation"
      description="An animated hip hop dance move component with rhythmic motion effects."
    >
      <PreviewPanel filename="hip-hop-move.tsx">
        <DanceMoveSelectorDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HIP_HOP_MOVE_SOURCE}
        filename="components/ui/HipHopMove/HipHopMove.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Select dance moves, toggle playback, and adjust visualizer." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Dance Move Selector" description="Choose from bounce, wave, pop, and lock animations." code={DANCE_MOVE_SELECTOR_EXAMPLE}>
          <DanceMoveSelectorDemo />
        </ExampleBlock>
        <ExampleBlock title="Music Visualizer" description="Beat visualization bars with color gradient." code={MUSIC_VISUALIZER_EXAMPLE}>
          <MusicVisualizerDemo />
        </ExampleBlock>
        <ExampleBlock title="Dance Battle" description="Player vs player comparison with random judging." code={DANCE_BATTLE_EXAMPLE}>
          <DanceBattleDemo />
        </ExampleBlock>
        <ExampleBlock title="Step Sequencer" description="Dance routine builder grid with playback." code={STEP_SEQUENCER_EXAMPLE}>
          <StepSequencerDemo />
        </ExampleBlock>
        <ExampleBlock title="Club Night" description="Event promotion card with RSVP counter." code={CLUB_NIGHT_EXAMPLE}>
          <ClubNightDemo />
        </ExampleBlock>
        <ExampleBlock title="DJ Booth" description="Music controller with BPM, volume, and time signature." code={DJ_BOOTH_EXAMPLE}>
          <DjBoothDemo />
        </ExampleBlock>
        <ExampleBlock title="Dance Tutorial" description="Step-by-step learning guide with progress indicator." code={DANCE_TUTORIAL_EXAMPLE}>
          <DanceTutorialDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
