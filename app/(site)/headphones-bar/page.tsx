"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HEADPHONES_BAR_SOURCE } from "./headphones-bar-source";
import {
  VOLUME_CONTROL_EXAMPLE,
  MUSIC_PLAYER_EXAMPLE,
  AUDIO_VISUALIZER_EXAMPLE,
  EQUALIZER_EXAMPLE,
  PODCAST_PLAYER_EXAMPLE,
  SOUND_SETTINGS_EXAMPLE,
  HEADPHONE_SELECTOR_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./headphones-bar-examples";
import {
  VolumeControlDemo,
  MusicPlayerDemo,
  AudioVisualizerDemo,
  EqualizerDemo,
  PodcastPlayerDemo,
  SoundSettingsDemo,
  HeadphoneSelectorDemo,
  PlaygroundDemo,
} from "./demos";

export default function HeadphonesBarPage() {
  return (
    <ComponentDocPage
      name="Headphones Bar"
      category="Media"
      description="A headphones audio bar component for media playback controls, volume visualization, and audio settings."
    >
      <PreviewPanel filename="headphones-bar.tsx">
        <VolumeControlDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HEADPHONES_BAR_SOURCE}
        filename="components/ui/HeadphonesBar/HeadphonesBar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Adjust volume, toggle playback, and configure sound settings." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Volume Control" description="Interactive volume slider with mute toggle and presets." code={VOLUME_CONTROL_EXAMPLE}>
          <VolumeControlDemo />
        </ExampleBlock>
        <ExampleBlock title="Music Player" description="Audio player with playback controls, progress bar, and track info." code={MUSIC_PLAYER_EXAMPLE}>
          <MusicPlayerDemo />
        </ExampleBlock>
        <ExampleBlock title="Audio Visualizer" description="Sound wave frequency visualization with animated bars." code={AUDIO_VISUALIZER_EXAMPLE}>
          <AudioVisualizerDemo />
        </ExampleBlock>
        <ExampleBlock title="Equalizer" description="Audio frequency band adjustment with vertical sliders." code={EQUALIZER_EXAMPLE}>
          <EqualizerDemo />
        </ExampleBlock>
        <ExampleBlock title="Podcast Player" description="Podcast episode list with currently playing indicator." code={PODCAST_PLAYER_EXAMPLE}>
          <PodcastPlayerDemo />
        </ExampleBlock>
        <ExampleBlock title="Sound Settings" description="Audio preference toggles for spatial audio, noise cancellation, and auto volume." code={SOUND_SETTINGS_EXAMPLE}>
          <SoundSettingsDemo />
        </ExampleBlock>
        <ExampleBlock title="Headphone Selector" description="Audio output device selection with battery level indicators." code={HEADPHONE_SELECTOR_EXAMPLE}>
          <HeadphoneSelectorDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}