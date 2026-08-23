"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { VIDEO_PLAYER_SOURCE } from "./video-player-source";
import {
  VIDEO_PLAYER_EXAMPLE,
  BASIC_VIDEO_EXAMPLE,
  POSTER_VIDEO_EXAMPLE,
  MUTED_LOOP_EXAMPLE,
  CAPTIONS_VIDEO_EXAMPLE,
  PLAYLIST_VIDEO_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./video-player-examples";
import {
  VideoPlayerDemo,
  BasicVideo,
  PosterVideo,
  MutedLoop,
  CaptionsVideo,
  PlaylistVideo,
  PlaygroundDemo,
} from "./demos";

export default function VideoPlayerPage() {
  return (
    <ComponentDocPage
      name="Video Player"
      category="Media"
      description="A styled HTML5 video player with custom controls, poster, looping, muted autoplay, captions, and playlist support."
    >
      <PreviewPanel filename="video-player-demo.tsx">
        <VideoPlayerDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={VIDEO_PLAYER_SOURCE}
        filename="components/ui/VideoPlayer/VideoPlayerDemo.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all video player variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Custom Controls" description="Full-featured player with play/pause, seek, volume, fullscreen, and settings." code={VIDEO_PLAYER_EXAMPLE}>
          <VideoPlayerDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Video" description="Native browser controls enabled by default." code={BASIC_VIDEO_EXAMPLE}>
          <BasicVideo />
        </ExampleBlock>
        <ExampleBlock title="With Poster" description="Poster image shown before playback starts." code={POSTER_VIDEO_EXAMPLE}>
          <PosterVideo />
        </ExampleBlock>
        <ExampleBlock title="Muted & Loop" description="Background video with live indicator badge." code={MUTED_LOOP_EXAMPLE}>
          <MutedLoop />
        </ExampleBlock>
        <ExampleBlock title="Captions" description="Subtitle track overlay with caption controls." code={CAPTIONS_VIDEO_EXAMPLE}>
          <CaptionsVideo />
        </ExampleBlock>
        <ExampleBlock title="Playlist" description="Video with sidebar playlist and track switching." code={PLAYLIST_VIDEO_EXAMPLE}>
          <PlaylistVideo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
