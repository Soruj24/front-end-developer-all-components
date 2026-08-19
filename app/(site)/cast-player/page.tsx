"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CASTPLAYER_SOURCE } from "./cast-player-source";
import {
  VideoPlayerDemo,
  CastDevicePickerDemo,
  ProgressBarDemo,
  AudioPlayerDemo,
  CastDemo,
  PlaylistDemo,
  MiniPlayerDemo,
} from "./cast-player-demos";

const VIDEO_CODE = `<CastPlayer
  src="/video.mp4"
  poster="/poster.jpg"
  onCast={() => openDevicePicker()}
/>`;

const PICKER_CODE = `<CastDevicePicker
  devices={devices}
  onConnect={connect}
  onScan={scanForDevices}
/>`;

const PROGRESS_CODE = `<ProgressBar
  current={42}
  total={180}
  onChange={setCurrentTime}
/>`;

const AUDIO_CODE = `<AudioPlayer
  title="Midnight City"
  artist="M83"
  src="/midnight-city.mp3"
/>`;

const CONNECTED_CODE = `<CastPlayer
  connected
  device={device}
  onDisconnect={disconnect}
/>`;

const PLAYLIST_CODE = `<PlaylistQueue
  tracks={tracks}
  currentTrack={currentTrack}
  onSelect={setCurrentTrack}
/>`;

const MINI_CODE = `<MiniPlayer
  title="Design Systems Conference"
  subtitle="Day 1 · Keynote"
  onClose={closeMiniPlayer}
/>`;

export default function CastPlayerPage() {
  return (
    <ComponentDocPage
      name="Cast Player"
      category="Data Display"
      description="Media player with Chromecast device discovery, playback controls, and cast connection management."
    >
      <PreviewPanel filename="cast-player.tsx">
        <VideoPlayerDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CASTPLAYER_SOURCE}
        filename="components/ui/CastPlayer/CastPlayer.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Device Picker" description="Chromecast device discovery with signal strength and connection status." code={PICKER_CODE}>
          <CastDevicePickerDemo />
        </ExampleBlock>
        <ExampleBlock title="Seekable Progress" description="Interactive progress bar with scrubbing handle and time display." code={PROGRESS_CODE}>
          <ProgressBarDemo />
        </ExampleBlock>
        <ExampleBlock title="Audio Player" description="Audio-specific player with album art, track info, and playback controls." code={AUDIO_CODE}>
          <AudioPlayerDemo />
        </ExampleBlock>
        <ExampleBlock title="Cast Connected" description="Active cast session with device info, volume control, and disconnect." code={CONNECTED_CODE}>
          <CastDemo />
        </ExampleBlock>
        <ExampleBlock title="Playlist Queue" description="Track queue with current playing indicator and inline playback controls." code={PLAYLIST_CODE}>
          <PlaylistDemo />
        </ExampleBlock>
        <ExampleBlock title="Mini Player" description="Compact floating player with video preview and basic controls." code={MINI_CODE}>
          <MiniPlayerDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}