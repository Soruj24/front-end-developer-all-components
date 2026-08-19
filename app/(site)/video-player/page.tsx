"use client";

import { Video, VideoCaption } from "@/components/ui/Video";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const VIDEO_SOURCE = `import { cn } from "@/lib/cn";
import type { VideoProps, VideoCaptionProps } from "./Video.types";

export function Video({ src, poster, controls = true, autoPlay = false, loop = false, muted = false, className }: VideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={cn("w-full rounded-lg", className)}
    />
  );
}

export function VideoCaption({ src, label, className }: VideoCaptionProps) {
  return (
    <track src={src} kind="subtitles" label={label} className={cn("hidden", className)} />
  );
}`;

const BASIC_CODE = `import { Video } from "@/components/ui/Video";

<Video src="/video.mp4" />`;

const POSTER_CODE = `import { Video } from "@/components/ui/Video";

<Video src="/video.mp4" poster="/poster.jpg" />`;

const MUTED_LOOP_CODE = `import { Video } from "@/components/ui/Video";

<Video src="/video.mp4" muted loop autoPlay />`;

const CAPTIONS_CODE = `import { Video, VideoCaption } from "@/components/ui/Video";

<Video src="/video.mp4" poster="/poster.jpg" controls>
  <VideoCaption src="/captions.vtt" label="English" />
</Video>`;

const playlist = [
  { title: "Introduction to Design Systems", duration: "4:00", active: true },
  { title: "Component Architecture", duration: "6:30", active: false },
  { title: "Token System Deep Dive", duration: "5:15", active: false },
];

export default function VideoPlayerPage() {
  return (
    <ComponentDocPage
      name="Video Player"
      category="Media"
      description="A styled HTML5 video player with controls, poster, looping, muted autoplay, and subtitle track support."
    >
      <PreviewPanel filename="video-player-demo.tsx">
        <div className="flex items-start gap-4">
          <Video src="/video.mp4" poster="/poster.jpg" className="max-w-sm" />
          <div className="w-48 space-y-1">
            <p className="text-sm font-medium">Introduction to Design Systems</p>
            <p className="text-xs text-muted-foreground">4:00</p>
            <div className="mt-3 space-y-1">
              {playlist.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-md px-2 py-1.5 text-xs ${
                    p.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p.title}
                  <span className="ml-1 opacity-60">— {p.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={VIDEO_SOURCE} filename="Video.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Video" description="Native controls enabled by default." code={BASIC_CODE}>
          <Video src="/video.mp4" className="max-w-md" />
        </ExampleBlock>

        <ExampleBlock title="With Poster" description="Poster image shown before playback." code={POSTER_CODE}>
          <Video src="/video.mp4" poster="/poster.jpg" className="max-w-md" />
        </ExampleBlock>

        <ExampleBlock title="Muted & AutoPlay" description="Muted looping video for background playback." code={MUTED_LOOP_CODE}>
          <Video src="/video.mp4" muted loop autoPlay className="max-w-md" />
        </ExampleBlock>

        <ExampleBlock title="Captions" description="Subtitle tracks via the VideoCaption component." code={CAPTIONS_CODE}>
          <Video src="/video.mp4" poster="/poster.jpg" controls className="max-w-md">
            <VideoCaption src="/captions.vtt" label="English" />
          </Video>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
