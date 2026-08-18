"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Headphones } from "lucide-react";

const installCommand = `npx component-library@latest add podcast-audio`;
const usageCode = `import { PodcastAudio } from "@/components/podcast-audio";

<PodcastAudio
  title="Tech Talk Episode 1"
  duration={1800}
  onPlay={() => handlePlay()}
/>`;

export default function PodcastAudioPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Podcast Audio</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An audio player component designed for podcast episodes with playback controls, progress tracking, and episode information.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Player</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tech Talk Episode 1</p>
                <div className="mt-1 h-1 w-full rounded-full bg-muted">
                  <div className="h-1 w-1/3 rounded-full bg-primary" />
                </div>
              </div>
              <button className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <div className="h-0 w-0 border-y-4 border-y-transparent border-l-6 border-l-current ml-0.5" />
              </button>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Episode List</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {[
              { title: "Getting Started", duration: "12:30" },
              { title: "Advanced Patterns", duration: "24:15" },
              { title: "Best Practices", duration: "18:45" },
            ].map((ep) => (
              <div key={ep.title} className="flex items-center gap-3 rounded-lg border p-3">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-0 w-0 border-y-3 border-y-transparent border-l-4 border-l-primary ml-0.5" />
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium">{ep.title}</p>
                  <p className="text-xs text-muted-foreground">{ep.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Controls</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <p className="text-sm font-medium">Now Playing</p>
            <p className="text-xs text-muted-foreground">Episode 5: Deep Dive</p>
            <div className="mt-3 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-1/2 rounded-full bg-primary" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>15:00</span>
              <span>30:00</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4">
              <button className="text-muted-foreground">Prev</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">Play</button>
              <button className="text-muted-foreground">Next</button>
            </div>
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onPlay</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
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
