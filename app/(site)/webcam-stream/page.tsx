"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Video, VideoOff, Settings, Mic, MicOff } from "lucide-react";

const installCommand = `npx component-library@latest add webcam-stream`;
const usageCode = `import { WebcamStream } from "@/components/_webcam-stream";

<WebcamStream />`;

function StreamPreview({ active, label }: { active: boolean; label: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border ${active ? "border-success" : "border-border"}`}>
      <div className={`flex h-40 items-center justify-center ${active ? "bg-foreground/5" : "bg-muted"}`}>
        {active ? <Video className="h-8 w-8 text-success" /> : <VideoOff className="h-8 w-8 text-muted-foreground" />}
      </div>
      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur">
        <div className={`h-2 w-2 rounded-full ${active ? "bg-success animate-pulse" : "bg-muted"}`} />
        {label}
      </div>
    </div>
  );
}

export default function WebcamStreamPage() {
  const [micOn, setMicOn] = useState(true);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Webcam Stream</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Webcam preview with stream controls, device selection, and recording indicators.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Stream Preview</h2>
        <div className="grid grid-cols-2 gap-3">
          <StreamPreview active={true} label="Camera 1" />
          <StreamPreview active={false} label="Camera 2" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Stream Controls</h2>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Video className="h-5 w-5" />
          </button>
          <button onClick={() => setMicOn(!micOn)} className={`flex h-10 w-10 items-center justify-center rounded-full ${micOn ? "bg-muted text-foreground" : "bg-danger text-white"}`}>
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Recording Indicator</h2>
        <div className="flex items-center gap-2 rounded-lg border border-danger/20 bg-danger/5 px-4 py-2">
          <div className="h-3 w-3 rounded-full bg-danger animate-pulse" />
          <span className="text-sm font-medium text-danger">Recording</span>
          <span className="text-xs text-muted-foreground">00:03:42</span>
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
                <td className="px-4 py-3 font-mono text-xs">autoStart</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showControls</td>
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
