"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Play, Pause, SkipForward, Volume2, Maximize, Settings } from "lucide-react";

const installCommand = `npx component-library@latest add video-player`;
const usageCode = `import { VideoPlayer } from "@/components/_video-player";

<VideoPlayer src="/video.mp4" title="Demo Video" />`;

function PlayerControls({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onToggle} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted">
        <SkipForward className="h-4 w-4" />
      </button>
      <div className="h-1 flex-1 rounded-full bg-muted">
        <div className="h-full w-[35%] rounded-full bg-primary" />
      </div>
      <span className="text-xs text-muted-foreground">1:23 / 4:00</span>
      <Volume2 className="h-4 w-4 text-muted-foreground" />
      <Settings className="h-4 w-4 text-muted-foreground" />
      <Maximize className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function PlaylistItem({ title, duration, active }: { title: string; duration: string; active: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
      <span className="truncate">{title}</span>
      <span className="ml-2 text-xs">{duration}</span>
    </div>
  );
}

export default function VideoPlayerPage() {
  const [playing, setPlaying] = useState(false);
  const playlist = [
    { title: "Introduction to Design Systems", duration: "4:00", active: true },
    { title: "Component Architecture", duration: "6:30", active: false },
    { title: "Token System Deep Dive", duration: "5:15", active: false },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Video Player</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Custom video player with controls, playlist, and playback management.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Video Player</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex h-64 items-center justify-center bg-foreground/5">
            <button onClick={() => setPlaying(!playing)} className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground hover:bg-primary">
              {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
            </button>
          </div>
          <div className="p-3">
            <p className="mb-2 text-sm font-medium">Introduction to Design Systems</p>
            <PlayerControls playing={playing} onToggle={() => setPlaying(!playing)} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Playlist</h2>
        <div className="w-full max-w-sm rounded-lg border border-border p-2">
          {playlist.map((p) => (
            <PlaylistItem key={p.title} {...p} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Speed Controls</h2>
        <div className="flex gap-2">
          {["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"].map((s, i) => (
            <button key={s} className={`rounded-md px-3 py-1.5 text-xs font-medium ${i === 2 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}>
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">src</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">autoPlay</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
