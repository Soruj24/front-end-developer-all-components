"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Smartphone, Monitor, Tablet, Laptop, Maximize2, RotateCcw, Settings } from "lucide-react";

const installCommand = `npx component-library@latest add phone-mockup`;

const usageCode = `import { PhoneMockup } from "@/components/ui/phone-mockup";

export default function Demo() {
  return (
    <PhoneMockup>
      <img src="/app-screenshot.png" alt="App" />
    </PhoneMockup>
  );
}`;

function PhoneFrameDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-80 w-44 rounded-[2rem] border-4 border-foreground/20 bg-white shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 rounded-b-xl bg-foreground/20" />
        <div className="mx-2 mt-8 overflow-hidden rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 h-[calc(100%-3.5rem)]">
          <div className="flex flex-col items-center justify-center h-full text-white text-sm font-medium">
            <Smartphone className="h-8 w-8 mb-2" /> App Screen
          </div>
        </div>
      </div>
    </div>
  );
}

function AppPreviewDemo() {
  const [screen, setScreen] = useState<"home" | "profile" | "settings">("home");
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-80 w-44 rounded-[2rem] border-4 border-foreground/20 bg-white shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 rounded-b-xl bg-foreground/20" />
        <div className="mx-2 mt-8 overflow-hidden rounded-xl bg-muted h-[calc(100%-3.5rem)]">
          <div className="p-3 text-xs font-semibold text-foreground border-b bg-background">{screen === "home" ? "Home" : screen === "profile" ? "Profile" : "Settings"}</div>
          <div className="p-3 text-xs text-muted-foreground">Content for {screen}</div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-around">
          {(["home", "profile", "settings"] as const).map((s) => (
            <button key={s} onClick={() => setScreen(s)} className={`text-[9px] px-1 py-0.5 rounded ${screen === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileUIDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-80 w-44 rounded-[2rem] border-4 border-foreground/20 bg-white shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 rounded-b-xl bg-foreground/20" />
        <div className="mx-2 mt-8 overflow-hidden rounded-xl h-[calc(100%-3.5rem)]">
          <div className="bg-gradient-to-b from-primary/10 to-primary/5 p-4 h-full">
            <div className="space-y-3">
              <div className="h-8 rounded-lg bg-primary/20" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 rounded-lg bg-primary/10" />
                <div className="h-16 rounded-lg bg-primary/10" />
                <div className="h-16 rounded-lg bg-primary/10" />
                <div className="h-16 rounded-lg bg-primary/10" />
              </div>
              <div className="h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">Action</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneStandDemo() {
  return (
    <div className="flex items-center justify-center p-8 gap-4">
      <div className="relative h-80 w-44 rounded-[2rem] border-4 border-foreground/20 bg-white shadow-xl rotate-[-5deg]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 rounded-b-xl bg-foreground/20" />
        <div className="mx-2 mt-8 overflow-hidden rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 h-[calc(100%-3.5rem)] flex items-center justify-center text-xs text-muted-foreground">Angled View</div>
      </div>
      <div className="relative h-80 w-44 rounded-[2rem] border-4 border-foreground/20 bg-white shadow-xl rotate-[5deg]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 rounded-b-xl bg-foreground/20" />
        <div className="mx-2 mt-8 overflow-hidden rounded-xl bg-gradient-to-br from-foreground/5 to-foreground/10 h-[calc(100%-3.5rem)] flex items-center justify-center text-xs text-muted-foreground">Front View</div>
      </div>
    </div>
  );
}

function DeviceMockupDemo() {
  const [device, setDevice] = useState<"phone" | "tablet" | "laptop" | "desktop">("phone");
  const sizes: Record<string, { w: string; h: string; border: string }> = {
    phone: { w: "w-44", h: "h-80", border: "border-4 rounded-[2rem]" },
    tablet: { w: "w-56", h: "h-72", border: "border-4 rounded-2xl" },
    laptop: { w: "w-72", h: "h-48", border: "border-2 rounded-lg" },
    desktop: { w: "w-80", h: "h-44", border: "border-2 rounded-lg" },
  };
  const icons = { phone: Smartphone, tablet: Tablet, laptop: Laptop, desktop: Monitor };
  const s = sizes[device];
  const Icon = icons[device];
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex gap-2">
        {(Object.keys(sizes) as Array<keyof typeof sizes>).map((d) => (
          <button key={d} onClick={() => setDevice(d)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${device === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {(() => { const I = icons[d]; return <I className="h-3 w-3" />; })()} {d}
          </button>
        ))}
      </div>
      <div className={`${s.w} ${s.h} ${s.border} border-foreground/20 bg-white shadow-xl flex items-center justify-center`}>
        <div className="text-center text-muted-foreground"><Icon className="mx-auto h-6 w-6 mb-1" /><span className="text-xs">{device}</span></div>
      </div>
    </div>
  );
}

function ResponsiveViewDemo() {
  return (
    <div className="flex items-end justify-center gap-4 p-8">
      <div className="h-40 w-24 rounded-lg border-2 border-foreground/20 bg-gradient-to-b from-primary/10 to-primary/5 flex items-center justify-center text-xs text-muted-foreground">320px</div>
      <div className="h-48 w-40 rounded-lg border-2 border-foreground/20 bg-gradient-to-b from-primary/15 to-primary/5 flex items-center justify-center text-xs text-muted-foreground">768px</div>
      <div className="h-52 w-64 rounded-lg border-2 border-foreground/20 bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center text-xs text-muted-foreground">1024px</div>
    </div>
  );
}

function ScreenCaptureDemo() {
  const [capturing, setCapturing] = useState(false);
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="h-80 w-44 rounded-[2rem] border-4 border-foreground/20 bg-white shadow-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 rounded-b-xl bg-foreground/20" />
          <div className="mx-2 mt-8 overflow-hidden rounded-xl bg-gradient-to-b from-primary/10 to-primary/5 h-[calc(100%-3.5rem)] flex items-center justify-center">
            {capturing ? <div className="text-xs text-primary font-medium animate-pulse">Screenshot...</div> : <div className="text-xs text-muted-foreground">Preview</div>}
          </div>
        </div>
        {capturing && <div className="absolute inset-0 border-4 border-primary rounded-[2rem] animate-pulse" />}
      </div>
      <button onClick={() => { setCapturing(true); setTimeout(() => setCapturing(false), 1500); }} className="ml-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        <RotateCcw className="mr-1 inline h-4 w-4" /> Capture
      </button>
    </div>
  );
}

export default function PhoneMockupPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Phone Mockup</h1>
          <Badge variant="primary">Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A realistic phone mockup component for showcasing mobile app designs and screenshots.
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
          <p className="mt-1 text-sm text-muted-foreground">Various phone mockup demonstrations.</p>
        </div>

        <ComponentPreview id="phone-mockup-frame">
          <PhoneFrameDemo />
        </ComponentPreview>

        <ComponentPreview id="phone-mockup-app">
          <AppPreviewDemo />
        </ComponentPreview>

        <ComponentPreview id="phone-mockup-ui">
          <MobileUIDemo />
        </ComponentPreview>

        <ComponentPreview id="phone-mockup-stand">
          <PhoneStandDemo />
        </ComponentPreview>

        <ComponentPreview id="phone-mockup-device">
          <DeviceMockupDemo />
        </ComponentPreview>

        <ComponentPreview id="phone-mockup-responsive">
          <ResponsiveViewDemo />
        </ComponentPreview>

        <ComponentPreview id="phone-mockup-capture">
          <ScreenCaptureDemo />
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
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">device</td>
                <td className="px-4 py-3 text-muted-foreground">"phone" | "tablet" | "laptop"</td>
                <td className="px-4 py-3 text-muted-foreground">"phone"</td>
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
