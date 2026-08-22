"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MUSIC_NOTE_SOURCE } from "./music-note-source";
import {
  NOW_PLAYING_EXAMPLE,
  PLAYLIST_ITEM_EXAMPLE,
  AUDIO_PLAYER_EXAMPLE,
  WAVEFORM_EXAMPLE,
  MUSIC_CARD_EXAMPLE,
  EQUALIZER_EXAMPLE,
  SONG_QUEUE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./music-note-examples";
import {
  NowPlayingDemo,
  PlaylistItemDemo,
  AudioPlayerDemo,
  WaveformVisualizerDemo,
  MusicCardDemo,
  EqualizerDemo,
  SongQueueDemo,
  PlaygroundDemo,
} from "./demos";

export default function MusicNotePage() {
  return (
    <ComponentDocPage
      name="Music Note"
      category="Media"
      description="Audio players, playlist items, waveform visualizers, and equalizer controls for music and media applications."
    >
      <PreviewPanel filename="music-note.tsx">
        <NowPlayingDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={MUSIC_NOTE_SOURCE}
        filename="components/ui/MusicNote/NowPlayingDemo.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all music note variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Now Playing" description="Album art card with play/pause and track info." code={NOW_PLAYING_EXAMPLE}>
          <NowPlayingDemo />
        </ExampleBlock>
        <ExampleBlock title="Playlist Items" description="Selectable playlist with active track highlighting." code={PLAYLIST_ITEM_EXAMPLE}>
          <PlaylistItemDemo />
        </ExampleBlock>
        <ExampleBlock title="Audio Player" description="Full audio player with seek, volume, and transport controls." code={AUDIO_PLAYER_EXAMPLE}>
          <AudioPlayerDemo />
        </ExampleBlock>
        <ExampleBlock title="Waveform Visualizer" description="Interactive waveform with clickable progress." code={WAVEFORM_EXAMPLE}>
          <WaveformVisualizerDemo />
        </ExampleBlock>
        <ExampleBlock title="Music Card" description="Gradient music card with like, play, and progress bar." code={MUSIC_CARD_EXAMPLE}>
          <MusicCardDemo />
        </ExampleBlock>
        <ExampleBlock title="Equalizer" description="8-band equalizer with vertical sliders." code={EQUALIZER_EXAMPLE}>
          <EqualizerDemo />
        </ExampleBlock>
        <ExampleBlock title="Song Queue" description="Removable queue list with track count." code={SONG_QUEUE_EXAMPLE}>
          <SongQueueDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
