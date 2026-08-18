"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Headphones } from "lucide-react";

const installCommand = `npx component-library@latest add music-note`;

const usageCode = `import { MusicNote } from "@/components/music-note";

export default function Page() {
  return <MusicNote />;
}`;

function NowPlayingDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Music className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Now Playing</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
          <Music className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">Midnight Dreams</p>
          <p className="truncate text-xs text-muted-foreground">Luna Eclipse · Starlight Sessions</p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function PlaylistItemDemo() {
  const [active, setActive] = useState(0);
  const songs = [
    { title: "Neon Horizons", artist: "Synth Wave", duration: "3:42" },
    { title: "Deep Blue", artist: "Ocean Sounds", duration: "4:15" },
    { title: "Golden Hour", artist: "Sunset Collective", duration: "3:58" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Headphones className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Playlist Items</span>
      </div>
      <div className="flex flex-col gap-1">
        {songs.map((song, i) => (
          <button
            key={song.title}
            onClick={() => setActive(i)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${active === i ? "bg-primary/10" : "hover:bg-muted/50"}`}
          >
            <span className={`w-5 text-center text-xs ${active === i ? "text-primary font-bold" : "text-muted-foreground"}`}>
              {active === i ? "▶" : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`truncate text-xs ${active === i ? "font-medium text-foreground" : "text-muted-foreground"}`}>{song.title}</p>
              <p className="truncate text-[10px] text-muted-foreground">{song.artist}</p>
            </div>
            <span className="text-[10px] text-muted-foreground">{song.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AudioPlayerDemo() {
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Play className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Audio Player</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <button onClick={() => setIsPlaying(false)} className="text-muted-foreground hover:text-foreground"><SkipBack className="h-4 w-4" /></button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
        </button>
        <button onClick={() => setIsPlaying(false)} className="text-muted-foreground hover:text-foreground"><SkipForward className="h-4 w-4" /></button>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">1:24</span>
          <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="flex-1 accent-primary" />
          <span className="text-[10px] text-muted-foreground">4:02</span>
        </div>
        <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
        <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-16 accent-primary" />
      </div>
    </div>
  );
}

function WaveformVisualizerDemo() {
  const [bars] = useState(() => Array.from({ length: 32 }, () => Math.random() * 100));
  const [activeBar, setActiveBar] = useState(8);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Music className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Waveform Visualizer</span>
      </div>
      <div className="flex h-20 items-end gap-px">
        {bars.map((height, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-colors cursor-pointer ${i <= activeBar ? "bg-primary" : "bg-muted"}`}
            style={{ height: `${height}%` }}
            onClick={() => setActiveBar(i)}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        <span className="text-[10px] text-muted-foreground">0:00</span>
        <span className="text-[10px] text-muted-foreground">3:24</span>
      </div>
    </div>
  );
}

function MusicCardDemo() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Headphones className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Music Card</span>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold">Electric Dreams</p>
            <p className="text-sm text-white/70">Neon Pulse · 2024</p>
          </div>
          <button onClick={() => setLiked(!liked)} className="text-white/80 hover:text-white">
            <span className={`text-lg ${liked ? "text-red-300" : ""}`}>{liked ? "♥" : "♡"}</span>
          </button>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="ml-0.5 h-4 w-4" />
          </button>
          <div className="flex-1 h-1 rounded-full bg-white/20">
            <div className="h-full w-[45%] rounded-full bg-white" />
          </div>
          <span className="text-xs text-white/70">2:15 / 5:02</span>
        </div>
      </div>
    </div>
  );
}

function EqualizerDemo() {
  const [bands, setBands] = useState([65, 45, 80, 55, 70, 40, 75, 60]);
  const labels = ["32", "64", "125", "250", "500", "1K", "4K", "16K"];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Music className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Equalizer</span>
      </div>
      <div className="flex items-end gap-2 h-32">
        {bands.map((val, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <input
              type="range"
              min={0}
              max={100}
              value={val}
              onChange={(e) => setBands((prev) => prev.map((v, j) => j === i ? Number(e.target.value) : v))}
              className="h-24 w-4 accent-primary"
              style={{ writingMode: "vertical-lr", direction: "rtl" }}
            />
            <span className="text-[9px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SongQueueDemo() {
  const [queue, setQueue] = useState([
    { id: 1, title: "Sunrise Beats", artist: "MorningDJ", duration: "3:42" },
    { id: 2, title: "City Lights", artist: "Urban Flow", duration: "4:10" },
    { id: 3, title: "Chill Vibes", artist: "Lo-Fi Club", duration: "3:55" },
  ]);
  const removeFromQueue = (id: number) => setQueue((prev) => prev.filter((s) => s.id !== id));
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Song Queue</span>
        </div>
        <span className="text-xs text-muted-foreground">{queue.length} tracks</span>
      </div>
      <div className="flex flex-col gap-1">
        {queue.map((song, i) => (
          <div key={song.id} className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2">
            <span className="w-4 text-center text-[10px] text-muted-foreground">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium">{song.title}</p>
              <p className="truncate text-[10px] text-muted-foreground">{song.artist}</p>
            </div>
            <span className="text-[10px] text-muted-foreground">{song.duration}</span>
            <button onClick={() => removeFromQueue(song.id)} className="text-[10px] text-muted-foreground hover:text-destructive">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MusicNotePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Music Note</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Audio players, playlist items, waveform visualizers, and equalizer controls for music and media applications.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">NowPlaying</h2>
        <NowPlayingDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">PlaylistItem</h2>
        <PlaylistItemDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">AudioPlayer</h2>
        <AudioPlayerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">WaveformVisualizer</h2>
        <WaveformVisualizerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">MusicCard</h2>
        <MusicCardDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Equalizer</h2>
        <EqualizerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">SongQueue</h2>
        <SongQueueDemo />
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">artist</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">isPlaying</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">progress</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
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
