"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Speaker, Volume2, VolumeX, Volume1, Music, Play, Pause } from "lucide-react";

const installCommand = `npx component-library@latest add speaker-audio`;
const usageCode = `<SpeakerAudio volume={75} onVolumeChange={handleVolume} />`;

function VolumeControl() {
  const [volume, setVolume] = useState(75);
  const [muted, setMuted] = useState(false);

  const getVolumeIcon = () => {
    if (muted || volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 50) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Volume Control</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMuted(!muted)}
          className="rounded-md p-2 hover:bg-muted"
        >
          {getVolumeIcon()}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setMuted(false);
          }}
          className="flex-1 accent-primary"
        />
        <span className="w-10 text-right text-sm text-muted-foreground">
          {muted ? 0 : volume}%
        </span>
      </div>
    </div>
  );
}

function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Music className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Audio Player</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Music className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Summer Breeze</p>
            <p className="text-xs text-muted-foreground">Chill Vibes</p>
          </div>
          <button
            onClick={() => setPlaying(!playing)}
            className="rounded-full bg-primary p-2 text-primary-foreground"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoundMixer() {
  const [channels, setChannels] = useState([
    { id: 1, name: "Music", volume: 80, muted: false },
    { id: 2, name: "Voice", volume: 60, muted: false },
    { id: 3, name: "Effects", volume: 45, muted: true },
  ]);

  const updateVolume = (id: number, volume: number) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, volume, muted: false } : ch))
    );
  };

  const toggleMute = (id: number) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, muted: !ch.muted } : ch))
    );
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Volume1 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Sound Mixer</span>
      </div>
      <div className="space-y-3">
        {channels.map((ch) => (
          <div key={ch.id} className="flex items-center gap-3">
            <span className="w-16 text-xs text-muted-foreground">{ch.name}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={ch.muted ? 0 : ch.volume}
              onChange={(e) => updateVolume(ch.id, Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <button
              onClick={() => toggleMute(ch.id)}
              className="rounded p-1 hover:bg-muted"
            >
              {ch.muted ? (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <span className="w-8 text-right text-xs text-muted-foreground">
              {ch.muted ? 0 : ch.volume}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeakerSystem() {
  const [speakers, setSpeakers] = useState([
    { id: 1, name: "Front Left", active: true },
    { id: 2, name: "Front Right", active: true },
    { id: 3, name: "Rear Left", active: false },
    { id: 4, name: "Rear Right", active: false },
    { id: 5, name: "Subwoofer", active: true },
  ]);

  const toggleSpeaker = (id: number) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const activeCount = speakers.filter((s) => s.active).length;

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Speaker className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Speaker System</span>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{activeCount} of {speakers.length} speakers active</p>
      <div className="grid grid-cols-3 gap-2">
        {speakers.map((speaker) => (
          <button
            key={speaker.id}
            onClick={() => toggleSpeaker(speaker.id)}
            className={`flex flex-col items-center gap-1 rounded-md border p-3 transition-colors ${
              speaker.active
                ? "border-primary bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Speaker className="h-5 w-5" />
            <span className="text-[10px]">{speaker.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AudioLevel() {
  const [level, setLevel] = useState(65);
  const bars = 20;

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Audio Level</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-end gap-1 h-16">
          {Array.from({ length: bars }).map((_, i) => {
            const threshold = (i / bars) * 100;
            const active = level > threshold;
            return (
              <div
                key={i}
                className={`w-2 rounded-sm transition-all ${
                  active
                    ? threshold > 80
                      ? "bg-red-500"
                      : threshold > 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    : "bg-muted"
                }`}
                style={{ height: `${30 + (i / bars) * 40}px` }}
              />
            );
          })}
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <span className="text-sm text-muted-foreground">{level} dB</span>
      </div>
    </div>
  );
}

function MuteButton() {
  const [muted, setMuted] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <VolumeX className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Mute Button</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setMuted(!muted)}
          className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
            muted
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
        <span className="text-sm text-muted-foreground">
          {muted ? "Muted" : "Unmuted"}
        </span>
      </div>
    </div>
  );
}

function PlaybackControl() {
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Play className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Playback Control</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`rounded-md p-2 ${shuffle ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <button
            onClick={() => setRepeat(!repeat)}
            className={`rounded-md p-2 ${repeat ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" />
              <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
          </button>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          {shuffle && <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">Shuffle On</span>}
          {repeat && <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">Repeat On</span>}
        </div>
      </div>
    </div>
  );
}

export default function SpeakerAudioPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Speaker Audio</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A media component for controlling audio playback with volume sliders, mute toggles, and visual audio level indicators.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Volume Control</h2>
        <ComponentPreview component="SpeakerAudioVolumeControl" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Audio Player</h2>
        <ComponentPreview component="SpeakerAudioPlayer" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sound Mixer</h2>
        <ComponentPreview component="SpeakerAudioMixer" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Speaker System</h2>
        <ComponentPreview component="SpeakerAudioSystem" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Audio Level</h2>
        <ComponentPreview component="SpeakerAudioLevel" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Mute Button</h2>
        <ComponentPreview component="SpeakerAudioMuteButton" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Playback Control</h2>
        <ComponentPreview component="SpeakerAudioPlaybackControl" />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onVolumeChange</td>
                <td className="px-4 py-3 text-muted-foreground">(vol: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onMuteToggle</td>
                <td className="px-4 py-3 text-muted-foreground">(muted: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
