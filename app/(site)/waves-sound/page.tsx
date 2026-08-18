"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Volume2, Music, Waves } from "lucide-react";

const installCommand = `npx component-library@latest add waves-sound`;
const usageCode = `import { WavesSound } from "@/components/_waves-sound";

<WavesSound volume={75} />`;

function SoundWave({ bars }: { bars: number }) {
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-primary animate-[pulse_1s_ease-in-out_infinite]"
          style={{ height: `${Math.random() * 24 + 8}px`, animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function VolumeSlider({ level, label }: { level: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 text-right text-xs text-muted-foreground">{label}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${level}%` }} />
      </div>
      <span className="w-8 text-xs text-muted-foreground">{level}%</span>
    </div>
  );
}

export default function WavesSoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Waves Sound</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Sound visualizations with animated waves, volume controls, and audio level indicators.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sound Waves</h2>
        <div className="flex items-center gap-6">
          <SoundWave bars={12} />
          <SoundWave bars={16} />
          <SoundWave bars={8} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Volume Levels</h2>
        <div className="flex flex-col gap-3">
          <VolumeSlider level={100} label="Max" />
          <VolumeSlider level={75} label="High" />
          <VolumeSlider level={50} label="Mid" />
          <VolumeSlider level={25} label="Low" />
          <VolumeSlider level={0} label="Mute" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Audio Icons</h2>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Volume2 className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Volume</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Music className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Music</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Waves className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Waves</span>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">animated</td>
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
