"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music,
  Radio,
  Mic,
  Settings,
} from "lucide-react";

const installCommand = `npx component-library@latest add headphones-bar`;
const usageCode = `import { HeadphonesBar } from "@/components/headphones-bar";

<HeadphonesBar volume={50} />`;

function VolumeControlDemo() {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-5 dark:border-white/[.145]">
        <div className="flex items-center gap-4 mb-4">
          <Headphones className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-bold">Volume Control</p>
            <p className="text-[10px] text-muted-foreground">{muted ? "Muted" : `${volume}%`}</p>
          </div>
          <button onClick={() => setMuted(!muted)} className="text-muted-foreground hover:text-foreground">
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <VolumeX className="h-3 w-3 text-muted-foreground" />
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (muted) setMuted(false);
            }}
            className="flex-1 accent-primary"
          />
          <Volume2 className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="mt-3 flex gap-2">
          {[25, 50, 75, 100].map((v) => (
            <button
              key={v}
              onClick={() => { setVolume(v); setMuted(false); }}
              className={`flex-1 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
                volume === v && !muted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MusicPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentTime] = useState("1:23");
  const [duration] = useState("4:02");

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 100);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-12 w-12 text-purple-400" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-center mb-3">
            <p className="text-sm font-bold">Midnight Dreams</p>
            <p className="text-[10px] text-muted-foreground">Luna Wave</p>
          </div>
          <div className="mb-3">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-muted-foreground">{currentTime}</span>
              <span className="text-[9px] text-muted-foreground">{duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="text-muted-foreground hover:text-foreground">
              <SkipBack className="h-5 w-5" />
            </button>
            <button onClick={() => setPlaying(!playing)} className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudioVisualizerDemo() {
  const [bars, setBars] = useState<number[]>(Array(20).fill(5));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 20) + 2));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Audio Visualizer</h3>
        </div>
        <div className="flex items-end justify-center gap-1 h-24">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-2 bg-primary rounded-t transition-all duration-150"
              style={{ height: `${h * 4}px`, opacity: 0.5 + (h / 22) * 0.5 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3 text-[9px] text-muted-foreground">
          <span>60Hz</span>
          <span>250Hz</span>
          <span>1kHz</span>
          <span>4kHz</span>
          <span>16kHz</span>
        </div>
      </div>
    </div>
  );
}

function EqualizerDemo() {
  const [bands, setBands] = useState([60, 70, 50, 80, 65]);
  const labels = ["Bass", "Low Mid", "Mid", "High Mid", "Treble"];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Equalizer</h3>
        </div>
        <div className="flex items-end justify-between gap-3 h-32 mb-2">
          {bands.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[9px] font-mono text-muted-foreground">{val}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={val}
                onChange={(e) => {
                  const newBands = [...bands];
                  newBands[i] = Number(e.target.value);
                  setBands(newBands);
                }}
                className="w-full accent-primary"
                style={{ writingMode: "vertical-lr", direction: "rtl", height: "80px" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {labels.map((l) => (
            <span key={l} className="text-[8px] text-muted-foreground text-center flex-1">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PodcastPlayerDemo() {
  const [playing, setPlaying] = useState(false);
  const episodes = [
    { title: "The Future of AI", duration: "45:20", playing: false },
    { title: "Design Systems", duration: "32:15", playing: true },
    { title: "Web Development", duration: "28:45", playing: false },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Podcast</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold">Design Systems</p>
              <p className="text-[9px] text-muted-foreground">Episode 12 · 32:15</p>
            </div>
            <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
          </div>
          <div className="space-y-1">
            {episodes.map((ep) => (
              <div key={ep.title} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                ep.playing ? "bg-primary/5" : "hover:bg-muted/50"
              }`}>
                {ep.playing ? <Pause className="h-3 w-3 text-primary" /> : <Play className="h-3 w-3 text-muted-foreground" />}
                <div className="flex-1">
                  <p className="text-[10px] font-medium">{ep.title}</p>
                </div>
                <span className="text-[9px] text-muted-foreground">{ep.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SoundSettingsDemo() {
  const [settings, setSettings] = useState({
    spatial: true,
    noiseCancel: false,
    autoVolume: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Sound Settings</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {[
            { key: "spatial" as const, label: "Spatial Audio", desc: "3D surround sound" },
            { key: "noiseCancel" as const, label: "Noise Cancellation", desc: "Block ambient noise" },
            { key: "autoVolume" as const, label: "Auto Volume", desc: "Adjust to environment" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                settings[item.key] ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
              }`}
            >
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                settings[item.key] ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30"
              }`}>
                {settings[item.key] && <span className="text-[10px]">✓</span>}
              </div>
              <div>
                <p className="text-xs font-bold">{item.label}</p>
                <p className="text-[9px] text-muted-foreground">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeadphoneSelectorDemo() {
  const [selected, setSelected] = useState("airpods");
  const devices = [
    { id: "airpods", name: "AirPods Pro", battery: 85, icon: "🎧" },
    { id: "sony", name: "Sony WH-1000", battery: 62, icon: "🎙️" },
    { id: "speaker", name: "HomePod", battery: 100, icon: "🔊" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Audio Output</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {devices.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                selected === d.id
                  ? "border-primary bg-primary/5"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <span className="text-2xl">{d.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold">{d.name}</p>
                <p className="text-[9px] text-muted-foreground">Battery: {d.battery}%</p>
              </div>
              <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${
                  d.battery > 50 ? "bg-emerald-500" : d.battery > 20 ? "bg-yellow-500" : "bg-red-500"
                }`} style={{ width: `${d.battery}%` }} />
              </div>
              {selected === d.id && <span className="text-[10px] font-medium text-primary">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeadphonesBarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Headphones Bar
          </h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A headphones audio bar component for media playback controls and volume visualization.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Volume Control</h3>
          <p className="text-sm text-muted-foreground">
            Interactive volume slider with presets.
          </p>
          <ComponentPreview id="headphones-volume">
            <VolumeControlDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Music Player</h3>
          <p className="text-sm text-muted-foreground">
            Audio player with playback controls.
          </p>
          <ComponentPreview id="headphones-player">
            <MusicPlayerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Audio Visualizer</h3>
          <p className="text-sm text-muted-foreground">
            Sound wave frequency visualization.
          </p>
          <ComponentPreview id="headphones-visualizer">
            <AudioVisualizerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Equalizer</h3>
          <p className="text-sm text-muted-foreground">
            Audio frequency band adjustment.
          </p>
          <ComponentPreview id="headphones-eq">
            <EqualizerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Podcast Player</h3>
          <p className="text-sm text-muted-foreground">
            Podcast episode list with playback.
          </p>
          <ComponentPreview id="headphones-podcast">
            <PodcastPlayerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Sound Settings</h3>
          <p className="text-sm text-muted-foreground">
            Audio preference toggles.
          </p>
          <ComponentPreview id="headphones-settings">
            <SoundSettingsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Headphone Selector</h3>
          <p className="text-sm text-muted-foreground">
            Audio output device selection.
          </p>
          <ComponentPreview id="headphones-selector">
            <HeadphoneSelectorDemo />
          </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">volume</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">muted</td>
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
