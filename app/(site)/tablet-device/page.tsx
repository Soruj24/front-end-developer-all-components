"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tablet, Monitor, Smartphone, Laptop, Maximize2, RotateCcw, Settings } from "lucide-react";

const installCommand = `npx component-library@latest add tablet-device`;
const usageCode = `<TabletDevice orientation="landscape" />`;

function TabletFrame() {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Tablet className="h-5 w-5 text-gray-600" />
        <h3 className="font-medium">Tablet Frame</h3>
      </div>
      <div className="flex justify-center">
        <div className={`rounded-3xl border-4 border-gray-800 bg-white p-4 shadow-xl transition-all ${
          orientation === "portrait" ? "w-48 h-64" : "w-64 h-48"
        }`}>
          <div className="h-full w-full rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Tablet className="h-12 w-12 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setOrientation("portrait")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            orientation === "portrait" ? "bg-gray-800 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          Portrait
        </button>
        <button
          onClick={() => setOrientation("landscape")}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            orientation === "landscape" ? "bg-gray-800 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          Landscape
        </button>
      </div>
    </div>
  );
}

function DeviceMockup() {
  const [device, setDevice] = useState<"tablet" | "laptop" | "phone">("tablet");

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Monitor className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Device Mockup</h3>
      </div>
      <div className="flex justify-center py-4">
        {device === "tablet" && (
          <div className="w-48 h-64 rounded-2xl border-4 border-gray-800 bg-white flex items-center justify-center">
            <Tablet className="h-10 w-10 text-gray-400" />
          </div>
        )}
        {device === "laptop" && (
          <div className="w-56">
            <div className="h-36 rounded-t-lg border-4 border-b-0 border-gray-800 bg-white flex items-center justify-center">
              <Laptop className="h-10 w-10 text-gray-400" />
            </div>
            <div className="h-3 rounded-b-lg bg-gray-700" />
          </div>
        )}
        {device === "phone" && (
          <div className="w-24 h-40 rounded-2xl border-4 border-gray-800 bg-white flex items-center justify-center">
            <Smartphone className="h-8 w-8 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex justify-center gap-2">
        {(["tablet", "laptop", "phone"] as const).map(d => (
          <button
            key={d}
            onClick={() => setDevice(d)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              device === d ? "bg-blue-500 text-white" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResponsiveView() {
  const [width, setWidth] = useState<"sm" | "md" | "lg">("md");

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Maximize2 className="h-5 w-5 text-green-500" />
        <h3 className="font-medium">Responsive View</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          {(["sm", "md", "lg"] as const).map(s => (
            <button
              key={s}
              onClick={() => setWidth(s)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                width === s ? "bg-green-500 text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={`mx-auto rounded-lg border bg-muted/50 p-4 transition-all ${
          width === "sm" ? "w-24" : width === "md" ? "w-48" : "w-full"
        }`}>
          <div className="space-y-2">
            <div className="h-4 rounded bg-green-200 dark:bg-green-800" />
            <div className="h-4 rounded bg-green-200 dark:bg-green-800 w-3/4" />
            <div className="h-4 rounded bg-green-200 dark:bg-green-800 w-1/2" />
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Width: {width === "sm" ? "320px" : width === "md" ? "768px" : "1024px+"}
        </p>
      </div>
    </div>
  );
}

function ScreenRotation() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <RotateCcw className="h-5 w-5 text-purple-500" />
        <h3 className="font-medium">Screen Rotation</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center">
          <div
            className="w-40 h-56 rounded-2xl border-4 border-gray-800 bg-white flex items-center justify-center transition-transform"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <RotateCcw className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {[0, 90, 180, 270].map(deg => (
            <button
              key={deg}
              onClick={() => setRotation(deg)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                rotation === deg ? "bg-purple-500 text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabletMode() {
  const [mode, setMode] = useState<"reading" | "drawing" | "gaming">("reading");

  const modes = [
    { label: "Reading", icon: Tablet, bg: "bg-blue-100 dark:bg-blue-900" },
    { label: "Drawing", icon: Settings, bg: "bg-purple-100 dark:bg-purple-900" },
    { label: "Gaming", icon: Monitor, bg: "bg-green-100 dark:bg-green-900" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="h-5 w-5 text-gray-600" />
        <h3 className="font-medium">Tablet Mode</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {modes.map(m => (
            <button
              key={m.label}
              onClick={() => setMode(m.label.toLowerCase() as typeof mode)}
              className={`rounded-lg p-4 text-center transition-all ${
                mode === m.label.toLowerCase() ? `${m.bg} ring-2 ring-offset-2 ring-gray-800` : "bg-muted hover:bg-muted/80"
              }`}
            >
              <m.icon className="mx-auto h-6 w-6 mb-2" />
              <span className="text-sm font-medium">{m.label}</span>
            </button>
          ))}
        </div>
        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="font-medium capitalize">{mode} Mode Active</p>
          <p className="text-sm text-muted-foreground">
            {mode === "reading" && "Optimized for text and e-books"}
            {mode === "drawing" && "Stylus input enabled"}
            {mode === "gaming" && "Performance mode activated"}
          </p>
        </div>
      </div>
    </div>
  );
}

function TouchInterface() {
  const [taps, setTaps] = useState(0);
  const [lastTap, setLastTap] = useState<string | null>(null);

  const handleTap = (area: string) => {
    setTaps(taps + 1);
    setLastTap(area);
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Smartphone className="h-5 w-5 text-orange-500" />
        <h3 className="font-medium">Touch Interface</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {["Top Left", "Top Center", "Top Right", "Mid Left", "Center", "Mid Right", "Bottom Left", "Bottom Center", "Bottom Right"].map(area => (
            <button
              key={area}
              onClick={() => handleTap(area)}
              className="h-16 rounded-lg bg-muted hover:bg-muted/80 text-xs font-medium transition-colors"
            >
              {area}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total taps: {taps}</span>
          <span className="font-medium">{lastTap || "None"}</span>
        </div>
      </div>
    </div>
  );
}

function AppGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  const apps = [
    { name: "Browser", color: "bg-blue-500" },
    { name: "Camera", color: "bg-gray-700" },
    { name: "Calendar", color: "bg-red-500" },
    { name: "Notes", color: "bg-yellow-500" },
    { name: "Settings", color: "bg-gray-500" },
    { name: "Music", color: "bg-purple-500" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Monitor className="h-5 w-5 text-indigo-500" />
        <h3 className="font-medium">App Grid</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {apps.map(app => (
          <button
            key={app.name}
            onClick={() => setSelected(app.name)}
            className={`rounded-xl p-4 text-center transition-all ${
              selected === app.name ? "ring-2 ring-offset-2 ring-indigo-500" : ""
            }`}
          >
            <div className={`mx-auto h-12 w-12 rounded-xl ${app.color} mb-2`} />
            <span className="text-xs font-medium">{app.name}</span>
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Selected: {selected}
        </p>
      )}
    </div>
  );
}

export default function TabletDevicePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tablet Device</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A layout component for displaying tablet device frames with screen content, orientation options, and realistic bezels.
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
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="TabletDeviceFrame" />
          <ComponentPreview component="TabletDeviceMockup" />
          <ComponentPreview component="TabletDeviceResponsive" />
          <ComponentPreview component="TabletDeviceRotation" />
        </div>
        <ComponentPreview component="TabletDeviceMode" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="TabletDeviceTouch" />
          <ComponentPreview component="TabletDeviceAppGrid" />
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
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">{'"portrait" | "landscape"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"portrait"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showBezel</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">{'"black" | "white" | "silver"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"black"'}</td>
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
