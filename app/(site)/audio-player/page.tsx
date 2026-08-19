"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Card, CardContent, Button, Slider } from "@/components/ui";
import { AUDIOPLAYER_SOURCE, PLAYLIST_EXAMPLE, INTERACTIVE_EXAMPLE } from "./audio-player-source";

const tracks = [
  { title: "Ambient Waves", artist: "Nature Sounds", duration: "3:42" },
  { title: "Lo-fi Beats", artist: "Chill Hop", duration: "4:15" },
  { title: "Jazz Piano", artist: "Classic Trio", duration: "5:01" },
];

function AudioPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{tracks[current].title}</p>
            <p className="text-xs text-muted-foreground">{tracks[current].artist}</p>
          </div>
          <span className="text-xs text-muted-foreground">{tracks[current].duration}</span>
        </div>
        <Slider value={progress} onChange={(e) => setProgress(Number(e.target.value))} max={100} className="mb-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setCurrent((c) => (c - 1 + tracks.length) % tracks.length)}>⏮</Button>
            <Button variant="default" size="sm" className="h-8 w-8 rounded-full p-0" onClick={() => setPlaying(!playing)}>
              {playing ? "⏸" : "▶"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setCurrent((c) => (c + 1) % tracks.length)}>⏭</Button>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            <Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} max={100} className="w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AudioPlayerPage() {
  return (
    <ComponentDocPage
      name="Audio Player"
      category="Data Display"
      description="Audio player with playback controls, volume adjustment, seek bar, and playlist support for rich media experiences."
    >
      <PreviewPanel filename="audio-player.tsx">
        <div className="flex w-full items-center justify-center py-10">
          <AudioPlayerDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={AUDIOPLAYER_SOURCE} filename="components/ui/AudioPlayer/AudioPlayer.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playlist" description="Browse and pick tracks from a playlist list." code={PLAYLIST_EXAMPLE}>
          <div className="flex w-full items-center justify-center py-10">
            <Card className="w-full max-w-sm">
              <CardContent className="p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Playlist</p>
                {tracks.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-xs text-primary">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.artist}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.duration}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Interactive" description="Playback controls with seek and volume sliders." code={INTERACTIVE_EXAMPLE}>
          <div className="flex w-full items-center justify-center py-10">
            <AudioPlayerDemo />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}