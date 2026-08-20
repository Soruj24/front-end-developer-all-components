"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import type { Track } from "@/components/ui/AudioPlayer";
import { cn } from "@/lib/cn";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

const AUDIOPRO_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { AudioPlayerProps, Track } from "./AudioPlayer.types";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

function parseDuration(dur: string): number {
  const parts = dur.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return \`\${m}:\${s.toString().padStart(2, "0")}\`;
}

export function AudioPlayer({ tracks, className }: AudioPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [muted, setMuted] = useState(false);
  const track: Track = tracks[current];
  const totalSeconds = parseDuration(track.duration);
  const currentSeconds = (progress / 100) * totalSeconds;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length);
    setProgress(0);
  }, [tracks.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % tracks.length);
    setProgress(0);
  }, [tracks.length]);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
      role="region"
      aria-label="Audio player"
    >
      {/* Now Playing */}
      <div className="flex items-center gap-3.5 px-4 pt-4 pb-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
          {track.artwork ? (
            <img src={track.artwork} alt={\`\${track.title} artwork\`} className="h-full w-full object-cover" />
          ) : (
            <Music className="h-5 w-5 text-primary" />
          )}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
              <div className="flex items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-[3px] rounded-full bg-primary animate-pulse"
                    style={{ height: \`\${8 + (i % 3) * 4}px\`, animationDelay: \`\${i * 150}ms\` }} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{track.title}</p>
          <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{track.duration}</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 px-4 pb-2">
        <span className="w-10 text-right text-[11px] tabular-nums text-muted-foreground">{formatTime(currentSeconds)}</span>
        <input type="range" min={0} max={100} value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-primary/20
            [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
          aria-label="Seek" />
        <span className="w-10 text-[11px] tabular-nums text-muted-foreground">{track.duration}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 pb-4 pt-1">
        <div className="flex items-center gap-1">
          <button onClick={prev} className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground", "hover:bg-accent hover:text-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")} aria-label="Previous track">
            <SkipBack className="h-4 w-4" />
          </button>
          <button onClick={togglePlay} className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25", "hover:bg-primary/90 active:scale-95", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4 ml-0.5" fill="currentColor" />}
          </button>
          <button onClick={next} className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground", "hover:bg-accent hover:text-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")} aria-label="Next track">
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className={cn("inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground", "hover:bg-accent hover:text-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input type="range" min={0} max={100} value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); if (muted) setMuted(false); }}
            className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-primary/20
              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground
              [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground"
            aria-label="Volume" />
        </div>
      </div>

      {/* Track list */}
      <div className="border-t border-border">
        <p className="px-4 pt-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Playlist</p>
        <div className="flex flex-col pb-2">
          {tracks.map((t, i) => (
            <button key={i} onClick={() => { setCurrent(i); setProgress(0); setPlaying(true); }}
              className={cn("flex items-center gap-3 px-4 py-2 text-left transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring", i === current ? "bg-primary/5 text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground")}
              aria-label={\`Play \${t.title} by \${t.artist}\`}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-medium tabular-nums">
                {i === current && playing ? (
                  <span className="flex items-end gap-[2px]">
                    {[0, 1, 2].map((j) => (<span key={j} className="w-[2px] rounded-full bg-primary animate-pulse" style={{ height: \`\${4 + (j % 3) * 2}px\`, animationDelay: \`\${j * 120}ms\` }} />))}
                  </span>
                ) : (<span className={cn(i === current ? "text-primary" : "text-muted-foreground")}>{i + 1}</span>)}
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-sm", i === current ? "font-medium text-foreground" : "font-normal")}>{t.title}</p>
                <p className="truncate text-xs text-muted-foreground">{t.artist}</p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const PLAYLIST_DATA: Track[] = [
  { title: "Ambient Waves", artist: "Nature Sounds", duration: "3:42" },
  { title: "Lo-fi Beats", artist: "Chill Hop", duration: "4:15" },
  { title: "Jazz Piano", artist: "Classic Trio", duration: "5:01" },
];

const LOFI_DATA: Track[] = [
  { title: "Midnight Rain", artist: "Lofi Studio", duration: "2:58" },
  { title: "Cafe Afternoon", artist: "Chill Beats", duration: "3:33" },
  { title: "Soft Focus", artist: "Study Vibes", duration: "4:07" },
  { title: "Pastel Skies", artist: "Dreamy Sound", duration: "3:15" },
];

const PODCAST_DATA: Track[] = [
  { title: "Introduction to AI", artist: "Tech Talk Daily", duration: "12:30" },
  { title: "Building Components", artist: "Dev Podcast", duration: "18:45" },
];

const BASIC_EXAMPLE = `<AudioPlayer tracks={[
  { title: "Ambient Waves", artist: "Nature Sounds", duration: "3:42" },
  { title: "Lo-fi Beats", artist: "Chill Hop", duration: "4:15" },
]} />`;

const LONG_LIST_EXAMPLE = `<AudioPlayer tracks={lofiTracks} />`;

const PODCAST_EXAMPLE = `<AudioPlayer tracks={podcastTracks} />`;

function MiniPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(42);

  return (
    <div className="flex w-full max-w-sm flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-violet-500/5">
          <Music className="h-4 w-4 text-violet-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">Ambient Waves</p>
          <p className="truncate text-xs text-muted-foreground">Nature Sounds</p>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25",
            "transition-all duration-150 hover:bg-primary/90 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>
      <div className="px-3 pb-3">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-primary/20
            [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
            [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
          aria-label="Seek"
        />
      </div>
    </div>
  );
}

function NowPlayingCardDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-card/80 shadow-sm">
      <div className="flex items-center justify-center p-8">
        <div className={cn(
          "flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg",
          playing && "animate-pulse",
        )}>
          <Music className="h-12 w-12 text-primary/60" />
        </div>
      </div>
      <div className="px-5 pb-5">
        <p className="text-center text-lg font-bold text-foreground">Ambient Waves</p>
        <p className="text-center text-sm text-muted-foreground">Nature Sounds</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-150 hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label="Previous"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25",
              "transition-all duration-150 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-5 w-5" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
            )}
          </button>
          <button
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground",
              "transition-colors duration-150 hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label="Next"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function VolumeStatesDemo() {
  const [vol, setVol] = useState(75);
  const [muted, setMuted] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <button
          onClick={() => setMuted(!muted)}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground",
            "transition-colors duration-150 hover:bg-accent hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : vol}
          onChange={(e) => {
            setVol(Number(e.target.value));
            if (muted) setMuted(false);
          }}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-primary/20
            [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
            [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
          aria-label="Volume"
        />
        <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
          {muted ? "0" : vol}%
        </span>
      </div>
      <div className="flex gap-2">
        {[0, 25, 50, 75, 100].map((v) => (
          <button
            key={v}
            onClick={() => { setVol(v); setMuted(false); }}
            className={cn(
              "flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              vol === v && !muted
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:bg-muted",
            )}
          >
            {v}%
          </button>
        ))}
      </div>
    </div>
  );
}

function PlaylistDemo() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="px-4 pt-3 pb-1.5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Now Playing
        </p>
      </div>
      <div className="flex items-center gap-3 px-4 pb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5">
          <Music className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {PLAYLIST_DATA[current].title}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {PLAYLIST_DATA[current].artist}
          </p>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25",
            "transition-all duration-150 hover:bg-primary/90 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>
      <div className="border-t border-border">
        <p className="px-4 pt-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Up Next
        </p>
        <div className="flex flex-col pb-2">
          {PLAYLIST_DATA.map((t, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPlaying(true); }}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-left transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                i === current
                  ? "bg-primary/5 text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-medium tabular-nums">
                {i === current && playing ? (
                  <span className="flex items-end gap-[2px]">
                    {[0, 1, 2].map((j) => (
                      <span
                        key={j}
                        className="w-[2px] rounded-full bg-primary animate-pulse"
                        style={{ height: `${4 + (j % 3) * 2}px`, animationDelay: `${j * 120}ms` }}
                      />
                    ))}
                  </span>
                ) : (
                  <span className={cn(i === current ? "text-primary" : "text-muted-foreground")}>
                    {i + 1}
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-sm", i === current ? "font-medium text-foreground" : "font-normal")}>
                  {t.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">{t.artist}</p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AudioPlayerPage() {
  return (
    <ComponentDocPage
      name="Audio Player"
      category="Data Display"
      description="Audio player with playback controls, volume adjustment, seek bar, playlist, and mute toggle. Supports keyboard navigation and screen readers."
    >
      <PreviewPanel filename="audio-player.tsx">
        <div className="flex w-full items-center justify-center py-6">
          <AudioPlayer tracks={PLAYLIST_DATA} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={AUDIOPRO_SOURCE}
        filename="components/ui/AudioPlayer/AudioPlayer.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Basic"
          description="Simple audio player with playback controls and playlist."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <AudioPlayer
              tracks={[
                { title: "Ambient Waves", artist: "Nature Sounds", duration: "3:42" },
                { title: "Lo-fi Beats", artist: "Chill Hop", duration: "4:15" },
              ]}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Long Playlist"
          description="Player with multiple tracks and full playlist navigation."
          code={LONG_LIST_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <AudioPlayer tracks={LOFI_DATA} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Mini Player"
          description="Compact player with essential controls only."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <MiniPlayerDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Now Playing Card"
          description="Large album art card layout for prominent display."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <NowPlayingCardDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Podcast"
          description="Podcast episodes with longer track names."
          code={PODCAST_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <AudioPlayer tracks={PODCAST_DATA} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Volume States"
          description="Standalone volume control with mute toggle and preset buttons."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <VolumeStatesDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playlist View"
          description="Now Playing header with track list below."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full items-center justify-center py-6">
            <PlaylistDemo />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
