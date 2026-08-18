"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Play, Pause, Volume2, Maximize, SkipForward, Cast } from "lucide-react";

const installCommand = `npx component-library@latest add cast-player`;
const usageCode = `import { CastPlayer } from "@/components/cast-player";

<CastPlayer
  src="/video.mp4"
  poster="/poster.jpg"
  onCast={(device) => connect(device)}
/>`;

interface CastDevice {
  id: string;
  name: string;
  type: "tv" | "speaker" | "display";
  connected: boolean;
}

const mockDevices: CastDevice[] = [
  { id: "1", name: "Living Room TV", type: "tv", connected: false },
  { id: "2", name: "Bedroom Speaker", type: "speaker", connected: false },
  { id: "3", name: "Kitchen Display", type: "display", connected: false },
];

function VideoPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <Play className="h-12 w-12" />
            <span className="text-xs">Video Preview</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3">
          <div className="mb-2 h-1 rounded-full bg-white/30">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPlaying(!playing)} className="text-white">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <Volume2 className="h-4 w-4 text-white/70" />
            <span className="ml-auto text-[10px] text-white/70">{Math.floor(progress * 1.8)}s / 180s</span>
            <Maximize className="h-4 w-4 text-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CastDevicePickerDemo() {
  const [devices, setDevices] = useState(mockDevices);
  const [scanning, setScanning] = useState(false);

  const scan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1500);
  };

  const connect = (id: string) => {
    setDevices((prev) => prev.map((d) => ({ ...d, connected: d.id === id })));
  };

  const iconMap = { tv: "📺", speaker: "🔊", display: "🖥️" };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Cast To</span>
        <button onClick={scan} className="text-xs text-primary hover:underline">
          {scanning ? "Scanning..." : "Scan"}
        </button>
      </div>
      <div className="flex flex-col gap-1 rounded-lg border bg-card">
        {devices.map((d) => (
          <button
            key={d.id}
            onClick={() => connect(d.id)}
            className={`flex items-center gap-3 px-3 py-2 text-left transition-colors ${
              d.connected ? "bg-primary/10" : "hover:bg-muted"
            }`}
          >
            <span>{iconMap[d.type]}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{d.name}</p>
              <p className="text-[10px] text-muted-foreground">{d.type}</p>
            </div>
            {d.connected && <Cast className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProgressBarDemo() {
  const [currentTime, setCurrentTime] = useState(0);
  const total = 180;
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono w-10">{Math.floor(currentTime)}s</span>
        <div className="flex-1 h-2 rounded-full bg-muted relative group cursor-pointer">
          <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${(currentTime / total) * 100}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `calc(${(currentTime / total) * 100}% - 6px)` }} />
        </div>
        <span className="text-xs font-mono w-10 text-right">{total}s</span>
      </div>
      <input type="range" min={0} max={total} value={currentTime} onChange={(e) => setCurrentTime(Number(e.target.value))} className="w-full accent-primary" />
    </div>
  );
}

export default function CastPlayerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cast Player</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Media player with Chromecast device discovery, playback controls, and cast connection management.
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
        <ComponentPreview>
          <VideoPlayerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Device Picker</h2>
        <ComponentPreview>
          <CastDevicePickerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Seekable Progress</h2>
        <ComponentPreview>
          <ProgressBarDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">src</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">poster</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onCast</td><td className="px-4 py-3 text-muted-foreground">(device: CastDevice) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
