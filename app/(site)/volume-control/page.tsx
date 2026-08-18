"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Volume2,
  VolumeX,
  Volume1,
  Music,
  Headphones,
  Speaker,
  Settings,
} from "lucide-react";

const installCommand = `npx component-library@latest add volume-control`;

const usageCode = `import { VolumeControl } from "@/components/volume-control";

<VolumeControl
  value={volume}
  onChange={setVolume}
  muted={muted}
  onMuteToggle={() => setMuted(!muted)}
/>`;

function SliderControl() {
  const [volume, setVolume] = useState(65);
  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <button
          onClick={() => setVolume(volume > 0 ? 0 : 65)}
          className="shrink-0 rounded-md p-2 hover:bg-muted"
        >
          <VolumeIcon className="h-5 w-5 text-muted-foreground" />
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1.5 w-48 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
        <span className="w-8 text-right text-sm tabular-nums text-muted-foreground">{volume}%</span>
      </div>
    </div>
  );
}

function MuteButton() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(72);

  return (
    <div className="flex justify-center py-8">
      <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
        <button
          onClick={() => setMuted(!muted)}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            muted ? "bg-red-100 text-red-600 dark:bg-red-900/30" : "bg-primary/10 text-primary"
          }`}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <div>
          <p className="text-sm font-medium">{muted ? "Muted" : "Playing"}</p>
          <p className="text-xs text-muted-foreground">Volume: {muted ? 0 : volume}%</p>
        </div>
      </div>
    </div>
  );
}

function VolumeMeter() {
  const [volume, setVolume] = useState(55);
  const bars = 12;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex items-end gap-1">
        {Array.from({ length: bars }).map((_, i) => {
          const threshold = (i / bars) * 100;
          const isActive = volume >= threshold;
          const isHigh = i >= bars * 0.8;
          return (
            <div
              key={i}
              className={`h-8 w-3 rounded-sm transition-all ${
                isActive
                  ? isHigh
                    ? "bg-red-500"
                    : i >= bars * 0.5
                    ? "bg-amber-500"
                    : "bg-green-500"
                  : "bg-muted"
              }`}
              style={{ height: `${16 + (i / bars) * 16}px`, opacity: isActive ? 1 : 0.3 }}
            />
          );
        })}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-48"
      />
      <span className="text-sm text-muted-foreground">{volume}%</span>
    </div>
  );
}

function AudioMixer() {
  const [channels, setChannels] = useState({
    master: 75,
    music: 60,
    vocals: 80,
    effects: 45,
  });

  const updateChannel = (key: keyof typeof channels, value: number) => {
    setChannels((prev) => ({ ...prev, [key]: value }));
  };

  const channelConfig = [
    { key: "master" as const, label: "Master", icon: Speaker, color: "bg-primary" },
    { key: "music" as const, label: "Music", icon: Music, color: "bg-blue-500" },
    { key: "vocals" as const, label: "Vocals", icon: Headphones, color: "bg-purple-500" },
    { key: "effects" as const, label: "SFX", icon: Settings, color: "bg-amber-500" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="grid grid-cols-4 gap-4">
        {channelConfig.map((ch) => (
          <div key={ch.key} className="flex flex-col items-center gap-3 rounded-lg border bg-card p-4">
            <ch.icon className="h-5 w-5 text-muted-foreground" />
            <p className="text-xs font-medium">{ch.label}</p>
            <div className="flex h-32 w-4 flex-col-reverse overflow-hidden rounded-full bg-muted">
              <div
                className={`${ch.color} transition-all`}
                style={{ height: `${channels[ch.key]}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">{channels[ch.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoundLevel() {
  const [level, setLevel] = useState(42);

  const getLevelLabel = () => {
    if (level < 25) return "Quiet";
    if (level < 50) return "Moderate";
    if (level < 75) return "Loud";
    return "Very Loud";
  };

  const getLevelColor = () => {
    if (level < 25) return "text-green-600 bg-green-100 dark:bg-green-900/30";
    if (level < 50) return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
    if (level < 75) return "text-amber-600 bg-amber-100 dark:bg-amber-900/30";
    return "text-red-600 bg-red-100 dark:bg-red-900/30";
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative h-48 w-6 overflow-hidden rounded-full bg-muted">
        <div
          className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-green-500 via-amber-500 to-red-500 transition-all"
          style={{ height: `${level}%` }}
        />
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 h-px w-full bg-background/50"
            style={{ bottom: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        className="w-48"
      />
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{level} dB</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getLevelColor()}`}>
          {getLevelLabel()}
        </span>
      </div>
    </div>
  );
}

function PlaybackControl() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(68);

  return (
    <div className="flex justify-center py-8">
      <div className="w-80 rounded-xl border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Ambient Lo-fi Beats</p>
            <p className="text-xs text-muted-foreground">Chillhop Music</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">1:24</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[35%] bg-primary" />
          </div>
          <span className="text-xs text-muted-foreground">4:02</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            {playing ? (
              <div className="flex gap-0.5">
                <div className="h-3 w-0.5 bg-current" />
                <div className="h-3 w-0.5 bg-current" />
              </div>
            ) : (
              <div className="ml-0.5 h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-current" />
            )}
          </button>
          <div className="flex flex-1 items-center gap-2">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EqualizerBar() {
  const [bands, setBands] = useState([30, 55, 70, 45, 80, 60, 25, 50]);
  const labels = ["60", "170", "310", "600", "1K", "3K", "8K", "16K"];

  const updateBand = (index: number, value: number) => {
    setBands((prev) => prev.map((b, i) => (i === index ? value : b)));
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex items-end gap-3">
        {bands.map((band, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-5 flex-col-reverse overflow-hidden rounded-full bg-muted">
              <div
                className="bg-gradient-to-t from-blue-500 to-purple-500 transition-all"
                style={{ height: `${band}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setBands(bands.map(() => 50))}
        className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80"
      >
        Reset
      </button>
    </div>
  );
}

export default function VolumeControlPage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Slider Control", component: SliderControl },
    { name: "Mute Button", component: MuteButton },
    { name: "Volume Meter", component: VolumeMeter },
    { name: "Audio Mixer", component: AudioMixer },
    { name: "Sound Level", component: SoundLevel },
    { name: "Playback Control", component: PlaybackControl },
    { name: "Equalizer Bar", component: EqualizerBar },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Volume Control
          </h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Audio volume sliders, mute toggles, level meters, mixers, and equalizer controls.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive audio control variants.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeDemo === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>
        <ComponentPreview id={`volume-control-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
          <div className="w-full">
            <ActiveComponent />
          </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">muted</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showValue</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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
